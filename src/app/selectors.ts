import { useLiveQuery } from 'dexie-react-hooks';
import { db } from '@/lib/db';
import {
  lessons,
  weeks,
  courses,
  lessonById,
  conceptLessons,
  getWeekTest,
  getCourseOfWeek,
} from '@/content';
import { dueReviews } from '@/features/spaced-repetition/sm2';
import { questForDate, questProgress } from '@/features/gamification/quests';
import { dayKey, emptyStreak, streakMessage } from '@/features/gamification/streak';
import { achievements as achievementCatalog, type AchievementDefinition } from '@/features/gamification/achievements';
import type { Lesson, Week } from '@/types/course';
import type {
  AchievementRow,
  ActivityRow,
  ProgressRow,
  QuizResultRow,
  SessionRow,
  SpacedRepetitionRow,
  StreakRow,
} from '@/types/progress';

/**
 * Read models. Everything is derived from Dexie so the UI reacts to local
 * writes instantly, whether they came from this tab, another tab, or a sync.
 */

export const ALL_LESSON_IDS = new Set(lessons.map((lesson) => lesson.id));

export function useProgressRows(userId: string): ProgressRow[] {
  return useLiveQuery(
    () => db.progress.where('userId').equals(userId).toArray(),
    [userId],
    [] as ProgressRow[],
  );
}

export function useQuizRows(userId: string): QuizResultRow[] {
  return useLiveQuery(
    () => db.quizResults.where('userId').equals(userId).toArray(),
    [userId],
    [] as QuizResultRow[],
  );
}

export function useExplainRows(userId: string) {
  return useLiveQuery(
    () => db.explainResults.where('userId').equals(userId).toArray(),
    [userId],
    [],
  );
}

export function useStreak(userId: string): StreakRow {
  const row = useLiveQuery(() => db.streaks.get(userId), [userId], undefined);
  return (
    row ?? {
      userId,
      ...emptyStreak(),
      updatedAt: 0,
    }
  );
}

export function useActivity(userId: string): ActivityRow[] {
  return useLiveQuery(
    () => db.activity.where('userId').equals(userId).toArray(),
    [userId],
    [] as ActivityRow[],
  );
}

export function useSessions(userId: string): SessionRow[] {
  return useLiveQuery(
    () => db.sessions.where('userId').equals(userId).toArray(),
    [userId],
    [] as SessionRow[],
  );
}

export function useSpacedRows(userId: string): SpacedRepetitionRow[] {
  return useLiveQuery(
    () => db.spaced.where('userId').equals(userId).toArray(),
    [userId],
    [] as SpacedRepetitionRow[],
  );
}

export function useAchievementRows(userId: string): AchievementRow[] {
  return useLiveQuery(
    () => db.achievements.where('userId').equals(userId).toArray(),
    [userId],
    [] as AchievementRow[],
  );
}

export function useSettingsRow(userId: string) {
  return useLiveQuery(() => db.settings.get(`${userId}:settings`), [userId], undefined);
}

export function completedLessonIds(rows: ProgressRow[]): Set<string> {
  return new Set(
    rows
      .filter((row) => row.exerciseId === null && row.status === 'completed' && row.lessonId !== 'week-test')
      .map((row) => row.lessonId),
  );
}

/**
 * Mastery gating: the next lesson opens only when the previous one is finished
 * (all exercises, quizzes and explanations). Week one, lesson one is always open.
 */
export function isLessonUnlocked(lesson: Lesson, completed: Set<string>): boolean {
  const course = getCourseOfWeek(lesson.weekId);
  const sequence = course ? course.weeks.flatMap((week) => week.lessons) : lessons;
  if (lesson.id === sequence[0]?.id) return true;
  const index = sequence.findIndex((item) => item.id === lesson.id);
  if (index <= 0) return true;
  const previous = sequence[index - 1];
  return previous ? completed.has(previous.id) : true;
}

export function lessonExerciseRows(rows: ProgressRow[], lesson: Lesson) {
  return rows.filter((row) => row.lessonId === lesson.id && row.exerciseId !== null);
}

export function isExerciseCompleted(rows: ProgressRow[], exerciseId: string) {
  return rows.some((row) => row.exerciseId === exerciseId && row.status === 'completed');
}

export function exerciseAttempts(rows: ProgressRow[], exerciseId: string) {
  return rows.find((row) => row.exerciseId === exerciseId)?.attempts ?? 0;
}

export function lessonProgress(
  lesson: Lesson,
  rows: ProgressRow[],
  quizRows: QuizResultRow[],
  explainRows: { lessonId: string; completed: boolean }[],
) {
  const exercises = lesson.exercises.filter((exercise) => isExerciseCompleted(rows, exercise.id)).length;
  const quizzes = lesson.quizzes.filter((quiz) =>
    quizRows.some((row) => row.quizId === quiz.id && row.isCorrect),
  ).length;
  const explains = lesson.explains.filter(() =>
    explainRows.some((row) => row.lessonId === lesson.id && row.completed),
  ).length;

  const total = lesson.exercises.length + lesson.quizzes.length + lesson.explains.length;
  const done = exercises + quizzes + explains;

  return {
    exercises,
    quizzes,
    explains,
    done,
    total,
    ratio: total === 0 ? 0 : done / total,
    completed: exercises === lesson.exercises.length && quizzes === lesson.quizzes.length && explains === lesson.explains.length,
    started: exercises > 0 || quizzes > 0 || explains > 0,
  };
}

export interface WeekProgress {
  lessonsCompleted: number;
  total: number;
  ratio: number;
  minutesDone: number;
  minutesTotal: number;
  testPassed: boolean;
  testUnlocked: boolean;
}

export function computeWeekProgress(
  week: Week,
  progress: { lesson: Lesson; completed: boolean; minutes: number }[],
  rows: ProgressRow[],
): WeekProgress {
  const completedCount = progress.filter((item) => item.completed).length;
  const testPassed = rows.some(
    (row) => row.weekId === week.id && row.exerciseId === 'week-test' && row.status === 'completed',
  );
  return {
    lessonsCompleted: completedCount,
    total: week.lessons.length,
    ratio: week.lessons.length === 0 ? 0 : completedCount / week.lessons.length,
    minutesDone: progress.filter((item) => item.completed).reduce((sum, item) => sum + item.minutes, 0),
    minutesTotal: week.lessons.reduce((sum, lesson) => sum + lesson.minutes, 0),
    testPassed,
    testUnlocked: completedCount === week.lessons.length,
  };
}

export function useCourseOverview(userId: string, courseId?: string) {
  const rows = useProgressRows(userId);
  const quizRows = useQuizRows(userId);
  const explainRows = useExplainRows(userId);
  const completed = completedLessonIds(rows);
  const course = courseId ? courses.find((item) => item.id === courseId) : undefined;
  const scopeWeeks = course?.weeks ?? weeks;
  const scopeLessons = scopeWeeks.flatMap((week) => week.lessons);

  const perLesson = scopeLessons.map((lesson) => ({
    lesson,
    completed: completed.has(lesson.id),
    progress: lessonProgress(lesson, rows, quizRows, explainRows),
  }));

  const perWeek = scopeWeeks.map((week) => ({
    week,
    ...computeWeekProgress(
      week,
      week.lessons.map((lesson) => ({
        lesson,
        completed: completed.has(lesson.id),
        minutes: lesson.minutes,
      })),
      rows,
    ),
  }));

  const weeksCompleted = perWeek.filter(
    (item) => item.lessonsCompleted === item.week.lessons.length,
  ).length;

  return {
    rows,
    quizRows,
    explainRows,
    completed,
    perLesson,
    perWeek,
    course,
    lessonsCompleted: perLesson.filter((item) => item.completed).length,
    weeksCompleted,
    ratio: scopeLessons.length === 0 ? 0 : perLesson.filter((item) => item.completed).length / scopeLessons.length,
  };
}

export function useNextLessonToStudy(userId: string) {
  const rows = useProgressRows(userId);
  const completed = completedLessonIds(rows);
  const candidate = lessons.find((lesson) => !completed.has(lesson.id) && isLessonUnlocked(lesson, completed));
  return candidate ?? null;
}

/** "Riprendi dove avevi lasciato": last touched lesson, else next unlocked one. */
export function useResumeTarget(userId: string) {
  const rows = useProgressRows(userId);
  const sessions = useSessions(userId);

  const completed = completedLessonIds(rows);
  const lastSession = [...sessions].sort((a, b) => b.updatedAt - a.updatedAt)[0];
  if (lastSession) {
    const lesson = lessonById.get(lastSession.lessonId);
    if (lesson) {
      return {
        lesson,
        scrollRatio: lastSession.lastScrollRatio,
        reason: completed.has(lesson.id) ? 'last' : 'in-progress',
      } as const;
    }
  }

  const candidate = lessons.find((lesson) => !completed.has(lesson.id) && isLessonUnlocked(lesson, completed));
  return candidate ? ({ lesson: candidate, scrollRatio: 0, reason: 'next' } as const) : null;
}

export function useStats(userId: string) {
  const rows = useProgressRows(userId);
  const quizRows = useQuizRows(userId);
  const explainRows = useExplainRows(userId);
  const activity = useActivity(userId);
  const sessions = useSessions(userId);
  const streak = useStreak(userId);
  const spaced = useSpacedRows(userId);
  const achievementsRows = useAchievementRows(userId);

  const completed = completedLessonIds(rows);
  const exercisesCompleted = rows.filter(
    (row) => row.exerciseId !== null && row.status === 'completed' && row.lessonId !== 'week-test',
  ).length;

  const weeksCompleted = weeks.filter((week) =>
    week.lessons.every((lesson) => completed.has(lesson.id)),
  ).length;

  const totalMinutes = Math.round(sessions.reduce((sum, session) => sum + session.seconds, 0) / 60);

  const today = dayKey(new Date());
  const todayActivity = activity.find((row) => row.date === today);

  const quest = questForDate();
  const questState = questProgress(quest, {
    exercises: todayActivity?.exercisesCompleted ?? 0,
    lessons: todayActivity?.lessonsCompleted ?? 0,
    minutes: todayActivity?.minutes ?? 0,
    // A review is counted as a study minute with no lesson attached.
    reviews: 0,
    explains: explainRows.filter((row) => row.completed).length,
  });

  const wrongByConcept = new Map<string, number>();
  for (const row of quizRows) {
    if (row.isCorrect) continue;
    const lesson = lessonById.get(row.lessonId);
    for (const concept of lesson?.concepts ?? []) {
      wrongByConcept.set(concept, (wrongByConcept.get(concept) ?? 0) + 1);
    }
  }
  const hardestConcepts = [...wrongByConcept.entries()]
    .sort((a, b) => b[1] - a[1])
    .slice(0, 5)
    .map(([concept, wrong]) => ({ concept, wrong, lessons: conceptLessons.get(concept) ?? [] }));

  const due = dueReviews(spaced).slice(0, 12).map((row) => ({
    ...row,
    lessons: conceptLessons.get(row.conceptId) ?? [],
  }));

  const achievementIds = new Set(achievementsRows.map((row) => row.achievementId));
  const earned = achievementCatalog.filter((achievement) => achievementIds.has(achievement.id));
  const nextAchievement: AchievementDefinition | null =
    achievementCatalog.find((achievement) => !achievementIds.has(achievement.id)) ?? null;

  return {
    rows,
    quizRows,
    explainRows,
    activity,
    sessions,
    streak,
    streakMessage: streakMessage(streak),
    completed,
    lessonsCompleted: completed.size,
    weeksCompleted,
    exercisesCompleted,
    totalExercises: lessons.reduce((sum, lesson) => sum + lesson.exercises.length, 0),
    totalMinutes,
    totalQuizzes: lessons.reduce((sum, lesson) => sum + lesson.quizzes.length, 0),
    correctQuizzes: quizRows.filter((row) => row.isCorrect).length,
    explainsCompleted: explainRows.filter((row) => row.completed).length,
    totalExplains: lessons.reduce((sum, lesson) => sum + lesson.explains.length, 0),
    quest,
    questState,
    hardestConcepts,
    due,
    earned,
    nextAchievement,
    todayMinutes: todayActivity?.minutes ?? 0,
    sessionsToday: 0,
  };
}

export function useWeekTestState(userId: string, weekId: string) {
  const rows = useProgressRows(userId);
  const week = weeks.find((item) => item.id === weekId);
  const test = getWeekTest(weekId);
  const completed = completedLessonIds(rows);
  const unlocked = week ? week.lessons.every((lesson) => completed.has(lesson.id)) : false;
  const row = rows.find((r) => r.weekId === weekId && r.exerciseId === 'week-test');
  return {
    week,
    test,
    unlocked,
    attempts: row?.attempts ?? 0,
    passed: row?.status === 'completed',
  };
}
