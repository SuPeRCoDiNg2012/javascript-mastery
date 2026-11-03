import { db } from '@/lib/db';
import { enqueue } from '@/lib/offline-queue';
import { dayKey, emptyStreak, studyToday, type StudyTodayResult } from '@/features/gamification/streak';
import { achievements, type AchievementContext, type AchievementDefinition } from '@/features/gamification/achievements';
import { initialReviewState, scheduleReview, type ReviewQuality } from '@/features/spaced-repetition/sm2';
import {
  achievementKey,
  activityKey,
  conceptKey,
  explainKey,
  progressKey,
  quizKey,
  sessionKey,
  WEEK_TEST_EXERCISE_ID,
} from '@/features/progress/keys';
import type { Exercise, ExplainPrompt, Lesson, Quiz } from '@/types/course';
import type {
  AchievementRow,
  ActivityRow,
  ExplainResultRow,
  ProgressRow,
  QuizResultRow,
  SpacedRepetitionRow,
  StreakRow,
} from '@/types/progress';

/**
 * Progress engine.
 *
 * Every action writes to Dexie first (instant, crash-safe, works offline) and
 * enqueues the same row for Supabase. The UI never waits for the network.
 */

export interface ActionFeedback {
  newAchievements: AchievementDefinition[];
  lessonCompleted: boolean;
  weekCompleted: boolean;
  streak: StudyTodayResult | null;
}

const emptyFeedback = (): ActionFeedback => ({
  newAchievements: [],
  lessonCompleted: false,
  weekCompleted: false,
  streak: null,
});

export function keywordMatches(text: string, keywords: string[]) {
  const normalised = text
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '');
  return keywords.filter((keyword) =>
    normalised.includes(
      keyword
        .toLowerCase()
        .normalize('NFD')
        .replace(/[\u0300-\u036f]/g, ''),
    ),
  );
}

async function readProgress(
  userId: string,
  weekId: string,
  lessonId: string,
  exerciseId: string | null,
): Promise<ProgressRow | undefined> {
  return db.progress.get(progressKey(userId, weekId, lessonId, exerciseId));
}

/** Writes a row locally and schedules the remote upsert. */
async function persistProgress(row: ProgressRow) {
  await db.progress.put(row);
  await enqueue({ type: 'progress', payload: row });
}

export interface ExerciseAttemptResult extends ActionFeedback {
  attempts: number;
  completed: boolean;
}

export async function recordExerciseAttempt(
  userId: string,
  lesson: Lesson,
  exercise: Exercise,
  correct: boolean,
): Promise<ExerciseAttemptResult> {
  const now = Date.now();
  const existing = await readProgress(userId, lesson.weekId, lesson.id, exercise.id);
  const attempts = (existing?.attempts ?? 0) + 1;

  const row: ProgressRow = {
    key: progressKey(userId, lesson.weekId, lesson.id, exercise.id),
    userId,
    weekId: lesson.weekId,
    lessonId: lesson.id,
    exerciseId: exercise.id,
    status: correct || existing?.status === 'completed' ? 'completed' : 'in_progress',
    attempts,
    lastAttemptAt: now,
    completedAt: existing?.completedAt ?? (correct ? now : null),
    updatedAt: now,
  };

  await persistProgress(row);

  const feedback = emptyFeedback();
  if (correct && existing?.status !== 'completed') {
    feedback.streak = await touchStreak(userId);
    await bumpActivity(userId, { exercises: 1 });
    await recordConceptReview(userId, exercise.concepts, 4);
  } else if (!correct) {
    await recordConceptReview(userId, exercise.concepts, 2);
  }

  if (correct) {
    const completion = await refreshLessonCompletion(userId, lesson);
    feedback.lessonCompleted = completion.completed;
    feedback.weekCompleted = completion.weekCompleted;
  }

  feedback.newAchievements = await evaluateAchievements(userId);
  return { ...feedback, attempts, completed: row.status === 'completed' };
}

export interface QuizAttemptResult extends ActionFeedback {
  attempts: number;
  correct: boolean;
}

export async function recordQuizAnswer(
  userId: string,
  lesson: Lesson,
  quiz: Quiz,
  answerIndex: number,
  correct: boolean,
): Promise<QuizAttemptResult> {
  const now = Date.now();
  const existing = await db.quizResults.get(quizKey(userId, quiz.id));
  const attempts = (existing?.attempts ?? 0) + 1;

  const row: QuizResultRow = {
    key: quizKey(userId, quiz.id),
    userId,
    quizId: quiz.id,
    lessonId: lesson.id,
    weekId: lesson.weekId,
    answerIndex,
    isCorrect: correct || existing?.isCorrect === true,
    attempts,
    answeredAt: now,
    updatedAt: now,
  };

  await db.quizResults.put(row);
  await enqueue({ type: 'quiz', payload: row });

  const feedback = emptyFeedback();
  if (correct && existing?.isCorrect !== true) {
    feedback.streak = await touchStreak(userId);
    await bumpActivity(userId, { minutes: 1 });
    await recordConceptReview(userId, quiz.concepts, 4);
  } else if (!correct) {
    await recordConceptReview(userId, quiz.concepts, 2);
  }

  if (correct) {
    const completion = await refreshLessonCompletion(userId, lesson);
    feedback.lessonCompleted = completion.completed;
    feedback.weekCompleted = completion.weekCompleted;
  }

  feedback.newAchievements = await evaluateAchievements(userId);
  return { ...feedback, attempts, correct };
}

export interface ExplainAttemptResult extends ActionFeedback {
  matched: string[];
  completed: boolean;
}

export async function recordExplain(
  userId: string,
  lesson: Lesson,
  prompt: ExplainPrompt,
  text: string,
): Promise<ExplainAttemptResult> {
  const now = Date.now();
  const matched = keywordMatches(text, prompt.keywords);
  const completed = text.trim().length >= prompt.minChars && matched.length >= Math.ceil(prompt.keywords.length / 3);
  const existing = await db.explainResults.get(explainKey(userId, prompt.id));

  const row: ExplainResultRow = {
    key: explainKey(userId, prompt.id),
    userId,
    explainId: prompt.id,
    lessonId: lesson.id,
    text,
    matchedKeywords: matched,
    completed: completed || existing?.completed === true,
    updatedAt: now,
  };

  await db.explainResults.put(row);
  await enqueue({ type: 'explain', payload: row });

  const feedback = emptyFeedback();
  if (completed && !existing?.completed) {
    feedback.streak = await touchStreak(userId);
    await bumpActivity(userId, { minutes: 2 });
    await recordConceptReview(userId, prompt.concepts, 4);
    const completion = await refreshLessonCompletion(userId, lesson);
    feedback.lessonCompleted = completion.completed;
    feedback.weekCompleted = completion.weekCompleted;
    feedback.newAchievements = await evaluateAchievements(userId);
  }

  return { ...feedback, matched, completed: row.completed };
}

/** Marks a lesson row complete when exercises, quizzes and explanations are done. */
export async function refreshLessonCompletion(
  userId: string,
  lesson: Lesson,
): Promise<{ completed: boolean; weekCompleted: boolean }> {
  const rows = await db.progress.where('userId').equals(userId).toArray();
  const lessonRows = rows.filter((row) => row.lessonId === lesson.id);
  const completedExercises = new Set(
    lessonRows.filter((row) => row.exerciseId && row.status === 'completed').map((row) => row.exerciseId),
  );
  const allExercises = lesson.exercises.every((exercise) => completedExercises.has(exercise.id));

  const quizRows = await db.quizResults.where('userId').equals(userId).toArray();
  const lessonQuizRows = quizRows.filter((row) => row.lessonId === lesson.id);
  const allQuizzes = lesson.quizzes.every((quiz) =>
    lessonQuizRows.some((row) => row.quizId === quiz.id && row.isCorrect),
  );

  const explainRows = await db.explainResults.where('userId').equals(userId).toArray();
  const lessonExplainRows = explainRows.filter((row) => row.lessonId === lesson.id);
  const allExplains = lesson.explains.every((prompt) =>
    lessonExplainRows.some((row) => row.explainId === prompt.id && row.completed),
  );

  const ready = allExercises && allQuizzes && allExplains;
  const existing = await readProgress(userId, lesson.weekId, lesson.id, null);
  if (!ready) return { completed: false, weekCompleted: false };
  if (existing?.status === 'completed') {
    return { completed: false, weekCompleted: false };
  }

  const now = Date.now();
  const row: ProgressRow = {
    key: progressKey(userId, lesson.weekId, lesson.id, null),
    userId,
    weekId: lesson.weekId,
    lessonId: lesson.id,
    exerciseId: null,
    status: 'completed',
    attempts: 1,
    lastAttemptAt: now,
    completedAt: now,
    updatedAt: now,
  };
  await persistProgress(row);
  await bumpActivity(userId, { lessons: 1 });

  const all = await db.progress.where('userId').equals(userId).toArray();
  const weekLessonIds = new Set(
    all.filter((r) => r.weekId === lesson.weekId && r.exerciseId === null && r.status === 'completed').map((r) => r.lessonId),
  );
  const weekCompleted = weekLessonIds.has(lesson.id) && lesson.number === 8;

  return { completed: true, weekCompleted };
}

export async function markWeekTest(
  userId: string,
  weekId: string,
  correct: number,
  total: number,
): Promise<{ passed: boolean } & ActionFeedback> {
  const passed = total > 0 && correct / total >= 0.8;
  const now = Date.now();
  const key = progressKey(userId, weekId, 'week-test', WEEK_TEST_EXERCISE_ID);
  const existing = await db.progress.get(key);
  const attempts = (existing?.attempts ?? 0) + 1;

  const row: ProgressRow = {
    key,
    userId,
    weekId,
    lessonId: 'week-test',
    exerciseId: WEEK_TEST_EXERCISE_ID,
    status: passed ? 'completed' : 'in_progress',
    attempts,
    lastAttemptAt: now,
    completedAt: passed ? (existing?.completedAt ?? now) : null,
    updatedAt: now,
  };

  await persistProgress(row);

  const feedback = emptyFeedback();
  if (passed && existing?.status !== 'completed') {
    feedback.streak = await touchStreak(userId);
    await bumpActivity(userId, { minutes: 5 });
  }
  feedback.newAchievements = await evaluateAchievements(userId);
  return { ...feedback, passed };
}

export async function touchStreak(userId: string): Promise<StudyTodayResult> {
  const existing = await db.streaks.get(userId);
  const base: StreakRow = existing ?? {
    userId,
    ...emptyStreak(),
    updatedAt: Date.now(),
  };

  const result = studyToday(base, dayKey(new Date()));
  const next: StreakRow = { ...base, ...result.state, userId, updatedAt: Date.now() };

  if (result.reason !== 'same-day') {
    await db.streaks.put(next);
    await enqueue({ type: 'streak', payload: next });
  }

  return result;
}

export async function bumpActivity(
  userId: string,
  delta: { minutes?: number; exercises?: number; lessons?: number },
) {
  const date = dayKey(new Date());
  const key = activityKey(userId, date);
  const existing = await db.activity.get(key);
  const row: ActivityRow = {
    key,
    userId,
    date,
    minutes: (existing?.minutes ?? 0) + (delta.minutes ?? 0),
    exercisesCompleted: (existing?.exercisesCompleted ?? 0) + (delta.exercises ?? 0),
    lessonsCompleted: (existing?.lessonsCompleted ?? 0) + (delta.lessons ?? 0),
    updatedAt: Date.now(),
  };
  await db.activity.put(row);
  await enqueue({ type: 'activity', payload: row });
  return row;
}

export async function recordConceptReview(
  userId: string,
  concepts: string[],
  quality: ReviewQuality,
) {
  if (concepts.length === 0) return;
  for (const concept of concepts) {
    const key = conceptKey(userId, concept);
    const existing = await db.spaced.get(key);
    const state = existing
      ? {
          easinessFactor: existing.easinessFactor,
          intervalDays: existing.intervalDays,
          repetitions: existing.repetitions,
          lapses: existing.lapses,
          nextReviewAt: existing.nextReviewAt,
          lastReviewedAt: existing.lastReviewedAt,
        }
      : initialReviewState();

    const nextState = scheduleReview(state, quality);
    const row: SpacedRepetitionRow = {
      key,
      userId,
      conceptId: concept,
      ...nextState,
      updatedAt: Date.now(),
    };
    await db.spaced.put(row);
    await enqueue({ type: 'spaced', payload: row });
  }
}

export async function reviewConceptNow(userId: string, conceptId: string, quality: ReviewQuality) {
  await recordConceptReview(userId, [conceptId], quality);
  await bumpActivity(userId, { minutes: 1 });
  await touchStreak(userId);
  return evaluateAchievements(userId);
}

export async function buildAchievementContext(userId: string): Promise<AchievementContext> {
  const [progress, quizzes, explains, streak, sessions, tests] = await Promise.all([
    db.progress.where('userId').equals(userId).toArray(),
    db.quizResults.where('userId').equals(userId).toArray(),
    db.explainResults.where('userId').equals(userId).toArray(),
    db.streaks.get(userId),
    db.sessions.where('userId').equals(userId).toArray(),
    db.progress.where('userId').equals(userId).toArray(),
  ]);

  const lessonsCompleted = progress.filter((row) => row.exerciseId === null && row.status === 'completed').length;
  const weekIds = new Set(
    progress
      .filter((row) => row.exerciseId === null && row.status === 'completed' && row.lessonId !== 'week-test')
      .map((row) => row.weekId),
  );

  // A week counts as completed only when all eight lessons are done.
  let weeksCompleted = 0;
  for (const weekId of weekIds) {
    const completedInWeek = progress.filter(
      (row) => row.weekId === weekId && row.exerciseId === null && row.status === 'completed' && row.lessonId !== 'week-test',
    ).length;
    if (completedInWeek >= 8) weeksCompleted += 1;
  }

  const totalMinutes =
    sessions.reduce((sum, session) => sum + session.seconds, 0) / 60;

  const completedRows = progress.filter((row) => row.exerciseId !== null && row.status === 'completed');

  return {
    lessonsCompleted,
    weeksCompleted,
    exercisesCompleted: completedRows.length,
    quizzesCorrect: quizzes.filter((row) => row.isCorrect).length,
    explainsCompleted: explains.filter((row) => row.completed).length,
    currentStreak: streak?.current ?? 0,
    longestStreak: streak?.longest ?? 0,
    totalMinutes,
    lessonCompletedAtNight: completedRows.some((row) => {
      if (!row.completedAt) return false;
      const hour = new Date(row.completedAt).getHours();
      return hour >= 22 || hour < 5;
    }),
    projectWeeksCompleted: weeksCompleted,
    testsPassed: tests.filter((row) => row.exerciseId === WEEK_TEST_EXERCISE_ID && row.status === 'completed').length,
  };
}

/**
 * Achievements are awarded at most a couple at a time: the list is small on
 * purpose, so the celebration stays meaningful.
 */
export async function evaluateAchievements(userId: string): Promise<AchievementDefinition[]> {
  const context = await buildAchievementContext(userId);
  const earned: AchievementDefinition[] = [];

  for (const achievement of achievements) {
    if (!achievement.isEarned(context)) continue;
    const key = achievementKey(userId, achievement.id);
    const existing = await db.achievements.get(key);
    if (existing) continue;

    const row: AchievementRow = {
      key,
      userId,
      achievementId: achievement.id,
      earnedAt: Date.now(),
    };
    await db.achievements.put(row);
    await enqueue({ type: 'achievement', payload: row });
    earned.push(achievement);
  }

  return earned;
}

export async function saveSessionProgress(
  userId: string,
  lesson: Lesson,
  seconds: number,
  scrollRatio: number,
) {
  if (seconds < 3) return;
  const key = sessionKey(userId, lesson.id);
  const existing = await db.sessions.get(key);
  const row = {
    key,
    userId,
    lessonId: lesson.id,
    weekId: lesson.weekId,
    seconds: (existing?.seconds ?? 0) + seconds,
    lastLessonId: lesson.id,
    lastScrollRatio: scrollRatio,
    startedAt: existing?.startedAt ?? Date.now(),
    updatedAt: Date.now(),
  };
  await db.sessions.put(row);
  await enqueue({ type: 'session', payload: row });
  await bumpActivity(userId, { minutes: Math.round(seconds / 60) });
}

export async function getLastLessonId(userId: string): Promise<string | null> {
  const mostRecent = await db.progress
    .where('userId')
    .equals(userId)
    .filter((row) => row.exerciseId === null || row.status === 'in_progress')
    .reverse()
    .sortBy('updatedAt');

  return mostRecent[0]?.lessonId ?? null;
}

export async function getLessonNote(userId: string, lessonId: string) {
  const key = `${userId}:${lessonId}`;
  return db.notes.get(key);
}

export async function saveLessonNote(userId: string, lessonId: string, content: string) {
  const key = `${userId}:${lessonId}`;
  const row = { key, userId, lessonId, content, updatedAt: Date.now() };
  await db.notes.put(row);
  await enqueue({ type: 'note', payload: row });
  return row;
}
