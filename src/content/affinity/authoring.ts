import type {
  Contrast,
  Exercise,
  Lesson,
  LessonError,
  LessonSection,
  Quiz,
  Week,
} from '@/types/course';

/**
 * Authoring helpers for Affinity Mastery.
 *
 * Affinity is learned by doing, not by typing code. Every lesson therefore
 * expands into a repeated structure: one mental model, one annotated table of
 * controls, one click-by-click trace, three real-world cases, one misconception,
 * and manual drills verified against a checklist.
 */

type Pair = [string, string];

export interface AffinityTable {
  caption?: string;
  headers?: [string, string, string];
  rows: [string, string, string][];
}

export interface AffinityDrill {
  title: string;
  task: string;
  checks: string[];
  hints: [string, string];
  solution: string;
  explanation: string;
}

export interface AffinityQuiz {
  question: string;
  options: Pair[];
  correct: number;
  explanation: string;
}

export interface AffinityError {
  title: string;
  whatYouDo: string;
  whatHappens: string;
  why: string;
  fix: string;
  recognize: string;
}

export interface AffinityLessonSpec {
  id: string;
  title: string;
  subtitle: string;
  minutes?: number;
  objectives: string[];
  concepts: [string, string, string];
  activation: Pair;
  analogy: string;
  theory: string[];
  table: AffinityTable;
  trace: [string, string][];
  misconception: Pair;
  world: [string, string, string];
  tip: string;
  errors: AffinityError[];
  drills: AffinityDrill[];
  quizzes: AffinityQuiz[];
  explain: { prompt: string; keywords: string[]; model: string };
  project: { title: string; brief: string; steps: string[] };
  learned: string;
  next: string;
  consolidate: string;
}

export function affLesson(weekId: string, number: number, spec: AffinityLessonSpec): Lesson {
  const sections: LessonSection[] = [
    {
      id: 'modello',
      title: 'Il modello mentale',
      kind: 'theory',
      paragraphs: spec.theory,
    },
    {
      id: 'analogia',
      title: 'Un’immagine per ricordarlo',
      kind: 'analogy',
      paragraphs: [spec.analogy],
    },
    {
      id: 'strumenti',
      title: 'I comandi che servono',
      kind: 'table',
      paragraphs: [
        'Non serve imparare tutto il pannello. Questi sono i comandi che userai davvero in questa lezione; il resto è rumore finché non ti servirà.',
      ],
      table: {
        caption: spec.table.caption,
        headers: spec.table.headers ?? ['Cosa vuoi fare', 'Dove si trova', 'Scorciatoia'],
        rows: spec.table.rows,
      },
    },
    {
      id: 'flusso',
      title: 'Cosa fa Affinity, passo per passo',
      kind: 'trace',
      paragraphs: [
        'Segui la sequenza una volta leggendo ogni passaggio. Poi rifalla senza guardare: è lì che nasce la memoria operativa.',
      ],
      steps: spec.trace.map(([action, why]) => `**${action}** — ${why}`),
    },
    {
      id: 'mondo',
      title: 'Tre casi reali',
      kind: 'world',
      paragraphs: spec.world,
    },
    {
      id: 'non-e',
      title: 'Cosa NON è',
      kind: 'misconception',
      paragraphs: [],
      wrongIdea: spec.misconception[0],
      whyWrong: spec.misconception[1],
    },
    {
      id: 'consiglio',
      title: 'Come non bloccarsi',
      kind: 'tip',
      paragraphs: [],
      tip: spec.tip,
    },
  ];

  const errors: LessonError[] = spec.errors.map((error) => ({
    title: error.title,
    badCode: error.whatYouDo,
    message: error.whatHappens,
    why: error.why,
    fix: error.fix,
    recognize: error.recognize,
  }));

  const contrasts: Contrast[] = spec.errors.slice(0, 2).map((error) => ({
    title: error.title,
    brokenCode: error.whatYouDo,
    errorMessage: error.whatHappens,
    why: error.why,
    fix: error.fix,
  }));

  const exercises: Exercise[] = spec.drills.map((drill, index) => ({
    id: `${spec.id}e${index + 1}`,
    kind: (['guided', 'solo', 'transfer'] as const)[index] ?? 'transfer',
    title: drill.title,
    prompt: drill.task,
    objective: spec.objectives[Math.min(index, spec.objectives.length - 1)],
    starterCode: '',
    check: { kind: 'manual', checklist: drill.checks },
    hints: drill.hints,
    solution: drill.solution,
    explanation: drill.explanation,
    concepts: [spec.concepts[Math.min(index, 2)] ?? spec.concepts[0]],
    runtime: 'worker',
  }));

  const quizzes: Quiz[] = spec.quizzes.map((item, index) => ({
    id: `${spec.id}q${index + 1}`,
    question: item.question,
    options: item.options.map(([text, feedback]) => ({ text, feedback })),
    correctIndex: item.correct,
    explanation: item.explanation,
    concepts: spec.concepts.slice(0, 2),
  }));

  return {
    id: spec.id,
    weekId,
    number,
    title: spec.title,
    subtitle: spec.subtitle,
    minutes: spec.minutes ?? 45,
    objectives: spec.objectives,
    concepts: [...spec.concepts],
    activation: { question: spec.activation[0], hint: spec.activation[1] },
    analogy: spec.analogy,
    exampleCode: spec.trace.map(([action]) => action).join('\n'),
    exampleOutput: 'Il risultato è visibile sulla tela di Affinity.',
    formalization: spec.theory[0] ?? spec.analogy,
    worked: {
      code: spec.trace.map(([action]) => action).join('\n'),
      output: 'Procedura completata: confronta il risultato con la tela.',
      steps: spec.trace.map(([action, why]) => ({ focus: action, explanation: why })),
    },
    exercises,
    contrasts,
    explains: [
      {
        id: `${spec.id}x1`,
        prompt: spec.explain.prompt,
        keywords: spec.explain.keywords,
        modelAnswer: spec.explain.model,
        minChars: 60,
        concepts: spec.concepts.slice(0, 2),
      },
    ],
    quizzes,
    recap: {
      points: [...spec.objectives.slice(0, 3), spec.tip],
      learned: spec.learned,
      next: spec.next,
    },
    sections,
    errors,
    project: {
      title: spec.project.title,
      brief: spec.project.brief,
      steps: spec.project.steps,
    },
    consolidate: spec.consolidate,
  };
}

interface AffinityWeekInput {
  number: number;
  title: string;
  subtitle: string;
  description: string;
  goals: string[];
  lessons: Lesson[];
  project: Week['project'];
  professional: Week['professional'];
}

/** Affinity ids are prefixed so progress from the JavaScript course never collides. */
export function affWeek(input: AffinityWeekInput): Week {
  const id = `af-week-${String(input.number).padStart(2, '0')}`;
  return {
    id,
    number: input.number,
    title: input.title,
    subtitle: input.subtitle,
    description: input.description,
    goals: input.goals,
    lessons: input.lessons.map((lesson) => ({ ...lesson, weekId: id })),
    project: input.project,
    professional: input.professional,
  };
}

/** Compact authoring for the later weeks: same structure, shorter prose. */
export interface CompactDrill {
  title: string;
  task: string;
  checks: string[];
  solution: string;
}

export interface CompactQuiz {
  question: string;
  correct: string;
  wrong: [string, string];
  explanation: string;
}

export interface CompactError {
  title: string;
  what: string;
  why: string;
  fix: string;
}

export interface CompactLessonSpec {
  id: string;
  title: string;
  subtitle: string;
  objectives: [string, string, string];
  concepts: [string, string, string];
  summary: string;
  points: [string, string, string];
  table: AffinityTable;
  trace: [string, string][];
  uses: [string, string, string];
  drills: [CompactDrill, CompactDrill, CompactDrill];
  quizzes: [CompactQuiz, CompactQuiz];
  errors: [CompactError, CompactError];
  project: string;
  next: string;
}

/**
 * Expands a short, specific lesson brief into the full lesson contract.
 * Used for weeks 4–10 so coverage stays complete without turning the
 * authoring files into novellas.
 */
export function affCompact(weekId: string, number: number, spec: CompactLessonSpec): Lesson {
  return affLesson(weekId, number, {
    id: spec.id,
    title: spec.title,
    subtitle: spec.subtitle,
    objectives: [...spec.objectives],
    concepts: spec.concepts,
    activation: [
      `Prima di aprire Affinity: cosa ti aspetti che faccia “${spec.title}”?`,
      spec.summary,
    ],
    analogy: `Pensa a ${spec.title.toLowerCase()} come a un passaggio di una catena: ogni comando prepara il successivo. Se salti un passaggio, il risultato si vede subito.`,
    theory: [spec.summary, `In pratica: ${spec.points.join(' ')}`],
    table: spec.table,
    trace: spec.trace,
    misconception: [
      `${spec.title} è solo un pulsante da premere.`,
      `Non è così: ${spec.points[0].toLowerCase()} Il comando funziona solo dentro un flusso corretto.`,
    ],
    world: spec.uses,
    tip: `Se il risultato non torna, rileggi ${spec.points[0].toLowerCase()} e rifai solo quel passaggio.`,
    errors: spec.errors.map((error) => ({
      title: error.title,
      whatYouDo: error.what,
      whatHappens: 'Il risultato non è quello atteso e il file va corretto.',
      why: error.why,
      fix: error.fix,
      recognize: `Se succede questo, controlla prima: ${error.why.toLowerCase()}`,
    })),
    drills: spec.drills.map((drill) => ({
      title: drill.title,
      task: drill.task,
      checks: drill.checks,
      hints: ['Rileggi la tabella dei comandi e individua il primo passaggio.', `Parti da: ${drill.checks[0]}.`],
      solution: drill.solution,
      explanation: `Hai verificato: ${drill.checks.join('; ')}.`,
    })),
    quizzes: spec.quizzes.map((item) => ({
      question: item.question,
      options: [
        [item.correct, `Esatto: ${item.explanation}`],
        [item.wrong[0], 'Non è questa: rileggi il passaggio chiave della lezione.'],
        [item.wrong[1], 'Non è questa: il comando giusto serve a uno scopo preciso.'],
      ],
      correct: 0,
      explanation: item.explanation,
    })),
    explain: {
      prompt: `Spiega con parole tue ${spec.title.toLowerCase()} e a cosa serve.`,
      keywords: [...spec.concepts],
      model: `${spec.summary} In pratica: ${spec.points.join(' ')}`,
    },
    project: {
      title: `Mini-progetto: ${spec.project}`,
      brief: `Applica ${spec.title.toLowerCase()} in un esercizio breve e verificabile.`,
      steps: spec.trace.map(([action]) => action).slice(0, 3),
    },
    learned: spec.summary,
    next: spec.next,
    consolidate: `Dedica dieci minuti a ${spec.title.toLowerCase()}: ${spec.drills[0].task}`,
  });
}
