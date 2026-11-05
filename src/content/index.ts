import type { Course, Exercise, Lesson, Quiz, Week } from '@/types/course';
import { week01 } from './week-01';
import { week02 } from './week-02';
import { week03 } from './week-03';
import { week04 } from './week-04';
import { week05 } from './week-05';
import { week06 } from './week-06';
import { week07 } from './week-07';
import { week08 } from './week-08';
import { week09 } from './week-09';
import { week10 } from './week-10';
import { week11 } from './week-11';
import { week12 } from './week-12';
import { affinityWeeks } from './affinity';

/**
 * The app is a pure data registry. Courses own their week sequence; routes,
 * search, spaced repetition and mastery gating all derive from these arrays.
 */
export const javascriptCourse: Course = {
  id: 'javascript',
  title: 'JavaScript Mastery',
  shortTitle: 'JavaScript',
  subtitle: 'Da zero alla padronanza in 12 settimane',
  description:
    'Il percorso completo per programmare davvero: 96 lezioni, esercizi in sandbox, progetti reali e ripasso a intervalli.',
  weeks: [
    week01,
    week02,
    week03,
    week04,
    week05,
    week06,
    week07,
    week08,
    week09,
    week10,
    week11,
    week12,
  ],
};

export const affinityCourse: Course = {
  id: 'affinity',
  title: 'Affinity Mastery',
  shortTitle: 'Affinity',
  subtitle: 'Grafica professionale in 10 settimane',
  description:
    'Vettore, Pixel e Layout in un unico percorso: loghi, fotoritocco, brochure, poster e file pronti per la stampa. Esercizi pratici dentro Affinity by Canva.',
  weeks: affinityWeeks,
};

export const courses: Course[] = [javascriptCourse, affinityCourse];

export const weeks: Week[] = courses.flatMap((course) => course.weeks);

export const lessons: Lesson[] = weeks.flatMap((week) => week.lessons);

export const lessonById = new Map<string, Lesson>(lessons.map((lesson) => [lesson.id, lesson]));

export const weekById = new Map<string, Week>(weeks.map((week) => [week.id, week]));

export const courseById = new Map<string, Course>(courses.map((course) => [course.id, course]));

const courseOfWeek = new Map<string, Course>(
  courses.flatMap((course) => course.weeks.map((week) => [week.id, course] as const)),
);

const courseOfLesson = new Map<string, Course>(
  courses.flatMap((course) =>
    course.weeks.flatMap((week) => week.lessons.map((lesson) => [lesson.id, course] as const)),
  ),
);

export function getWeek(id: string): Week | undefined {
  return weekById.get(id);
}

export function getLesson(id: string): Lesson | undefined {
  return lessonById.get(id);
}

export function getCourse(id: string): Course | undefined {
  return courseById.get(id);
}

export function getCourseOfWeek(weekId: string): Course | undefined {
  return courseOfWeek.get(weekId);
}

export function getCourseOfLesson(lessonId: string): Course | undefined {
  return courseOfLesson.get(lessonId);
}

export function getWeekOfLesson(lessonId: string): Week | undefined {
  const lesson = lessonById.get(lessonId);
  return lesson ? weekById.get(lesson.weekId) : undefined;
}

/** Sequence used by mastery gating: progress in one course never unlocks another. */
export function courseLessons(courseId: string): Lesson[] {
  const course = courseById.get(courseId);
  return course ? course.weeks.flatMap((week) => week.lessons) : [];
}

export function nextLesson(lessonId: string): Lesson | undefined {
  const lesson = lessonById.get(lessonId);
  if (!lesson) return undefined;
  const sequence = courseLessons(getCourseOfLesson(lessonId)?.id ?? '');
  const index = sequence.findIndex((item) => item.id === lessonId);
  return index >= 0 ? sequence[index + 1] : undefined;
}

export function previousLesson(lessonId: string): Lesson | undefined {
  const lesson = lessonById.get(lessonId);
  if (!lesson) return undefined;
  const sequence = courseLessons(getCourseOfLesson(lessonId)?.id ?? '');
  const index = sequence.findIndex((item) => item.id === lessonId);
  return index > 0 ? sequence[index - 1] : undefined;
}

export const allExercises: Exercise[] = lessons.flatMap((lesson) => lesson.exercises);

export const exerciseById = new Map<string, Exercise>(
  allExercises.map((exercise) => [exercise.id, exercise]),
);

export const totalExerciseCount = allExercises.length;

export const totalLessonCount = lessons.length;

export const totalWeekCount = weeks.length;

export const totalMinutes = lessons.reduce((sum, lesson) => sum + lesson.minutes, 0);

export const allConcepts: string[] = Array.from(
  new Set(lessons.flatMap((lesson) => lesson.concepts)),
);

export const explainPrompts = lessons.flatMap((lesson) => lesson.explains);

export interface WeekTestQuestion {
  /** Stable id: `${lessonId}:${quizId}` so attempts survive content edits. */
  id: string;
  quiz: Quiz;
  lessonId: string;
  lessonTitle: string;
}

/**
 * The weekly test reuses one quiz per lesson (the retrieval practice items the
 * learner has already met). No duplicated content to keep in sync.
 */
export function getWeekTest(weekId: string): WeekTestQuestion[] {
  const week = weekById.get(weekId);
  if (!week) return [];

  return week.lessons.flatMap((lesson) => {
    const quiz = lesson.quizzes[lesson.quizzes.length - 1];
    if (!quiz) return [];
    return [
      {
        id: `${lesson.id}:${quiz.id}`,
        quiz,
        lessonId: lesson.id,
        lessonTitle: lesson.title,
      },
    ];
  });
}

export const weekTestCount = weeks.reduce((sum, week) => sum + getWeekTest(week.id).length, 0);

/** Used by the stats page: which lesson each concept belongs to. */
export const conceptLessons = new Map<string, Lesson[]>();
for (const lesson of lessons) {
  for (const concept of lesson.concepts) {
    const list = conceptLessons.get(concept) ?? [];
    list.push(lesson);
    conceptLessons.set(concept, list);
  }
}

export {
  week01,
  week02,
  week03,
  week04,
  week05,
  week06,
  week07,
  week08,
  week09,
  week10,
  week11,
  week12,
  affinityWeeks,
};
