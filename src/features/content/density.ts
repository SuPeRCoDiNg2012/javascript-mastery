import type { Lesson } from '@/types/course';

/**
 * Density contract for the long-form lesson format.
 *
 * The point is not to hit numbers for their own sake: each minimum maps to a
 * learning need. Sections break cognitive load, examples make ideas runnable,
 * traces build the mental model, errors prevent the same mistake twice.
 */
export interface DensityReport {
  sections: number;
  codeSamples: number;
  worldCases: number;
  traces: number;
  misconceptions: number;
  tables: number;
  errors: number;
  exercises: number;
  quizzes: number;
  explains: number;
  recapPoints: number;
  words: number;
  gaps: string[];
}

export const DENSITY_MINIMUMS = {
  sections: 6,
  codeSamples: 5,
  worldCases: 3,
  traces: 1,
  misconceptions: 1,
  tables: 1,
  errors: 4,
  exercises: 4,
  quizzes: 2,
  explains: 1,
  recapPoints: 4,
  /** Target stated in the brief is 3,000–5,000; below 2,000 it is a summary. */
  words: 2000,
} as const;

const countWords = (parts: string[]) =>
  parts
    .join(' ')
    .replace(/\s+/g, ' ')
    .trim()
    .split(' ')
    .filter(Boolean).length;

export function measureLessonDensity(lesson: Lesson): DensityReport {
  const sections = lesson.sections ?? [];
  const codeSamples = sections.reduce((total, item) => total + (item.code?.length ?? 0), 0);
  const worldCases = sections.filter((item) => item.kind === 'world').length;
  const traces = sections.filter((item) => item.kind === 'trace').length;
  const misconceptions = sections.filter((item) => item.kind === 'misconception').length;
  const tables = sections.filter((item) => item.table).length;
  const errors = lesson.errors?.length ?? 0;
  const exercises = lesson.exercises.length;
  const quizzes = lesson.quizzes.length;
  const explains = lesson.explains.length;
  const recapPoints = lesson.recap.points.length;

  const words = countWords([
    lesson.activation.question,
    lesson.activation.hint,
    lesson.analogy,
    lesson.formalization,
    ...sections.flatMap((item) => [
      item.title,
      ...item.paragraphs,
      ...(item.steps ?? []),
      item.wrongIdea ?? '',
      item.whyWrong ?? '',
      item.tip ?? '',
      ...(item.code ?? []).flatMap((sample) => [sample.title ?? '', sample.note ?? '']),
    ]),
    ...(lesson.errors ?? []).flatMap((item) => [item.title, item.why, item.recognize]),
    lesson.project?.brief ?? '',
    ...(lesson.project?.steps ?? []),
    lesson.consolidate ?? '',
    lesson.recap.learned,
    ...lesson.recap.points,
  ]);

  const gaps: string[] = [];
  const check = (label: string, actual: number, minimum: number) => {
    if (actual < minimum) gaps.push(`${label}: ${actual}/${minimum}`);
  };

  check('sezioni', sections.length, DENSITY_MINIMUMS.sections);
  check('esempi', codeSamples, DENSITY_MINIMUMS.codeSamples);
  check('casi reali', worldCases, DENSITY_MINIMUMS.worldCases);
  check('trace', traces, DENSITY_MINIMUMS.traces);
  check('cosa NON è', misconceptions, DENSITY_MINIMUMS.misconceptions);
  check('tabelle', tables, DENSITY_MINIMUMS.tables);
  check('errori', errors, DENSITY_MINIMUMS.errors);
  check('esercizi', exercises, DENSITY_MINIMUMS.exercises);
  check('quiz', quizzes, DENSITY_MINIMUMS.quizzes);
  check('spiegazioni', explains, DENSITY_MINIMUMS.explains);
  check('riepilogo', recapPoints, DENSITY_MINIMUMS.recapPoints);
  check('parole', words, DENSITY_MINIMUMS.words);

  if (!lesson.project) gaps.push('mini-progetto assente');
  if (!lesson.consolidate) gaps.push('“cosa fare adesso” assente');

  return {
    sections: sections.length,
    codeSamples,
    worldCases,
    traces,
    misconceptions,
    tables,
    errors,
    exercises,
    quizzes,
    explains,
    recapPoints,
    words,
    gaps,
  };
}

export function isDense(lesson: Lesson) {
  return Boolean(lesson.sections?.length);
}
