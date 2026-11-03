export type ExerciseKind = 'fill' | 'guided' | 'solo' | 'transfer';

/** DOM lessons run inside a sandboxed iframe instead of the plain worker. */
export type ExerciseRuntime = 'worker' | 'dom';

export type ExerciseCheck =
  | { kind: 'output'; lines: string[]; unordered?: boolean }
  | { kind: 'source'; mustInclude: string[]; mustExclude?: string[] }
  | { kind: 'manual'; checklist: string[] };

export interface Exercise {
  id: string;
  kind: ExerciseKind;
  title: string;
  prompt: string;
  objective?: string;
  starterCode: string;
  check: ExerciseCheck;
  /** Progressive hints: 1 = concept reminder, 2 = specific nudge. */
  hints: [string, string];
  solution: string;
  explanation: string;
  concepts: string[];
  runtime?: ExerciseRuntime;
  /** Review items are generated from earlier weeks; authored ones skip this. */
  reviewOf?: string;
}

export interface QuizOption {
  text: string;
  /** Shown when this option is picked — why it is right or wrong. */
  feedback: string;
}

export interface Quiz {
  id: string;
  question: string;
  options: QuizOption[];
  correctIndex: number;
  explanation: string;
  concepts: string[];
}

export interface ExplainPrompt {
  id: string;
  prompt: string;
  /** Lowercase keyword stems; matching is on normalised text. */
  keywords: string[];
  modelAnswer: string;
  minChars: number;
  concepts: string[];
}

export interface Contrast {
  title: string;
  brokenCode: string;
  errorMessage: string;
  why: string;
  fix: string;
}

/**
 * Dense lesson format.
 *
 * A lesson is not a summary: it is a sequence of short, scannable sections that
 * each carry one idea, one concrete example and one failure mode. Lessons that
 * declare `sections` are rendered by the rich renderer; older lessons keep the
 * compact layout until they are migrated.
 */
export type SectionKind =
  | 'theory'
  | 'analogy'
  | 'example'
  | 'world'
  | 'trace'
  | 'misconception'
  | 'tip'
  | 'table';

export interface LessonCodeSample {
  title?: string;
  code: string;
  output?: string;
  /** A short sentence explaining what the reader should notice. */
  note?: string;
  /** Module/async snippets that cannot run in the sandbox set this to false. */
  runnable?: boolean;
}

export interface LessonTable {
  caption?: string;
  headers: string[];
  rows: string[][];
}

export interface LessonSection {
  id: string;
  title: string;
  kind: SectionKind;
  /** Short paragraphs; **bold**, `code` and *italic* are rendered inline. */
  paragraphs: string[];
  code?: LessonCodeSample[];
  table?: LessonTable;
  /** Numbered execution trace for "cosa fa il computer, passo per passo". */
  steps?: string[];
  /** Misconception: the wrong mental model, why it fails, and the right code. */
  wrongIdea?: string;
  whyWrong?: string;
  correctCode?: string;
  tip?: string;
}

export interface LessonError {
  title: string;
  badCode: string;
  /** The exact message the runtime would print. */
  message: string;
  why: string;
  fix: string;
  /** Transferable diagnostic rule: how to recognise it next time. */
  recognize: string;
}

export interface LessonProject {
  title: string;
  brief: string;
  steps: string[];
  starterCode?: string;
}

export interface WorkedStep {
  /** Line or fragment highlighted in the worked example. */
  focus: string;
  explanation: string;
}

export interface Lesson {
  id: string;
  weekId: string;
  number: number;
  title: string;
  subtitle: string;
  minutes: number;
  objectives: string[];
  concepts: string[];
  activation: {
    question: string;
    hint: string;
  };
  analogy: string;
  exampleCode: string;
  exampleOutput: string;
  formalization: string;
  worked: {
    code: string;
    output: string;
    steps: WorkedStep[];
  };
  exercises: Exercise[];
  contrasts: Contrast[];
  explains: ExplainPrompt[];
  quizzes: Quiz[];
  recap: {
    points: string[];
    learned: string;
    next: string;
  };
  /** Weeks 5+ lessons are DOM/browser oriented and get an extra notice. */
  browserLesson?: boolean;
  /** Dense format: 6–8 sections, 5 examples, 3 real-world cases, traces. */
  sections?: LessonSection[];
  errors?: LessonError[];
  project?: LessonProject;
  /** One or two lines on how to consolidate this lesson today. */
  consolidate?: string;
}

export interface WeekProject {
  title: string;
  brief: string;
  deliverable: string;
  milestones: string[];
}

export interface Week {
  id: string;
  number: number;
  title: string;
  subtitle: string;
  description: string;
  goals: string[];
  lessons: Lesson[];
  project: WeekProject;
  professional: {
    title: string;
    topics: string[];
    exercise: string;
  };
}
