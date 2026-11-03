import type {
  Contrast,
  Exercise,
  ExerciseCheck,
  ExerciseKind,
  ExplainPrompt,
  Lesson,
  Quiz,
  Week,
  WeekProject,
} from '@/types/course';

/**
 * Authoring helpers.
 *
 * Lesson content is data, not JSX: it must stay diff-friendly, reusable by the
 * spaced-repetition engine and testable. These builders only add the fields the
 * renderer needs so each lesson file reads like a lesson plan.
 */

interface ExerciseInput {
  id: string;
  title: string;
  prompt: string;
  starterCode: string;
  check: ExerciseCheck;
  hints: [string, string];
  solution: string;
  explanation: string;
  concepts?: string[];
  objective?: string;
  runtime?: 'worker' | 'dom';
}

const makeExercise =
  (kind: ExerciseKind) =>
  (input: ExerciseInput): Exercise => ({
    ...input,
    kind,
    concepts: input.concepts ?? [],
    runtime: input.runtime ?? 'worker',
  });

export const fill = makeExercise('fill');
export const guided = makeExercise('guided');
export const solo = makeExercise('solo');
export const transfer = makeExercise('transfer');

interface ContrastInput {
  title: string;
  code: string;
  error: string;
  why: string;
  fix: string;
}

const makeContrast =
  () =>
  ({ title, code, error, why, fix }: ContrastInput): Contrast => ({
    title,
    brokenCode: code,
    errorMessage: error,
    why,
    fix,
  });

export const contrast = makeContrast();

interface ExplainInput {
  id: string;
  prompt: string;
  keywords: string[];
  model: string;
  minChars?: number;
  concepts?: string[];
}

export const explain = ({
  id,
  prompt,
  keywords,
  model,
  minChars = 60,
  concepts = [],
}: ExplainInput): ExplainPrompt => ({
  id,
  prompt,
  keywords,
  modelAnswer: model,
  minChars,
  concepts,
});

interface QuizInput {
  id: string;
  question: string;
  /** [testo, perché questa risposta è giusta/sbagliata] */
  options: [string, string][];
  correct: number;
  explanation: string;
  concepts?: string[];
}

export const quiz = ({
  id,
  question,
  options,
  correct,
  explanation,
  concepts = [],
}: QuizInput): Quiz => ({
  id,
  question,
  options: options.map(([text, feedback]) => ({ text, feedback })),
  correctIndex: correct,
  explanation,
  concepts,
});

interface LessonInput {
  id: string;
  title: string;
  subtitle: string;
  minutes?: number;
  objectives: string[];
  concepts: string[];
  activate: [question: string, hint: string];
  analogy: string;
  example: { code: string; output: string };
  formal: string;
  worked: { code: string; output: string; steps: [focus: string, explanation: string][] };
  exercises: Exercise[];
  contrasts: Contrast[];
  explains: ExplainPrompt[];
  quizzes: Quiz[];
  recap: { points: string[]; learned: string; next: string };
  browserLesson?: boolean;
}

export function lesson(weekId: string, number: number, input: LessonInput): Lesson {
  return {
    id: input.id,
    weekId,
    number,
    title: input.title,
    subtitle: input.subtitle,
    minutes: input.minutes ?? 45,
    objectives: input.objectives,
    concepts: input.concepts,
    activation: { question: input.activate[0], hint: input.activate[1] },
    analogy: input.analogy,
    exampleCode: input.example.code,
    exampleOutput: input.example.output,
    formalization: input.formal,
    worked: {
      code: input.worked.code,
      output: input.worked.output,
      steps: input.worked.steps.map(([focus, explanation]) => ({ focus, explanation })),
    },
    exercises: input.exercises,
    contrasts: input.contrasts,
    explains: input.explains,
    quizzes: input.quizzes,
    recap: input.recap,
    browserLesson: input.browserLesson ?? false,
  };
}

interface WeekInput {
  id: string;
  number: number;
  title: string;
  subtitle: string;
  description: string;
  goals: string[];
  lessons: Lesson[];
  project: WeekProject;
  professional: { title: string; topics: string[]; exercise: string };
}

/**
 * Each week file exports `lessons` authored with `lesson()`, then calls
 * `makeWeek`. Week-01 therefore stays readable as a teaching document.
 */
export function makeWeek(input: WeekInput): Week {
  return {
    id: input.id,
    number: input.number,
    title: input.title,
    subtitle: input.subtitle,
    description: input.description,
    goals: input.goals,
    lessons: input.lessons,
    project: input.project,
    professional: input.professional,
  };
}
