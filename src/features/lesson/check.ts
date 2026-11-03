import type { Exercise } from '@/types/course';
import type { RunResult } from '@/types/runner';
import { normalizeOutput } from '@/lib/utils';

export interface CheckResult {
  passed: boolean;
  /** What to tell the learner: never punitive, always next-step oriented. */
  message: string;
  expected?: string;
}

export function expectedOutput(exercise: Exercise): string | null {
  return exercise.check.kind === 'output' ? exercise.check.lines.join('\n') : null;
}

/**
 * Output checks compare normalised lines. Source checks look for the constructs
 * that matter (e.g. `export`, `await`) when a runtime observation is impossible.
 */
export function evaluateExercise(exercise: Exercise, result: RunResult): CheckResult {
  if (result.timedOut) {
    return {
      passed: false,
      message: 'Il codice non ha finito in tempo: controlla i cicli. Se pensi sia un ciclo infinito, riduci le iterazioni e riprova.',
    };
  }

  if (result.error) {
    return {
      passed: false,
      message: `Il codice si è fermato con un errore: ${result.error}. Leggilo con calma: spesso indica la riga esatta.`,
    };
  }

  const check = exercise.check;

  if (check.kind === 'output') {
    const actual = normalizeOutput(result.logs.join('\n'));
    const expected = normalizeOutput(check.lines.join('\n'));
    const passed = check.unordered
      ? sortLines(actual) === sortLines(expected)
      : actual === expected;

    if (passed) return { passed: true, message: 'Corretto. Output identico a quello atteso.', expected };

    const actualLines = actual.split('\n').filter(Boolean);
    const firstDifference = check.lines.findIndex((line, index) => actualLines[index] !== line);
    const hint =
      firstDifference >= 0
        ? `Riga ${firstDifference + 1}: atteso “${check.lines[firstDifference] ?? ''}”, ottenuto “${actualLines[firstDifference] ?? 'niente'}”.`
        : 'Il numero di righe stampate non corrisponde.';

    return {
      passed: false,
      message: `${hint} Non è un errore: è un indizio su cosa manca.`,
      expected,
    };
  }

  if (check.kind === 'source') {
    const source = exercise.starterCode;
    void source;
    const missing = check.mustInclude.filter((needle) => !result.logs.join('\n').includes(needle));
    const banned = (check.mustExclude ?? []).filter((needle) => result.logs.join('\n').includes(needle));

    if (missing.length === 0 && banned.length === 0) {
      return { passed: true, message: 'Corretto: la struttura richiesta c’è.' };
    }

    return {
      passed: false,
      message:
        missing.length > 0
          ? `Manca ancora qualcosa: ${missing.join(', ')}.`
          : `Togli questa parte: ${banned.join(', ')}.`,
    };
  }

  return { passed: true, message: 'Verifica completata: segna tu i punti che hai fatto.' };
}

/** Some checks (source/console) depend on the emitted code, not the output. */
export function evaluateSource(exercise: Exercise, code: string): CheckResult {
  const check = exercise.check;
  if (check.kind !== 'source') return { passed: false, message: 'Nessuna verifica di sorgente.' };

  const missing = check.mustInclude.filter((needle) => !code.includes(needle));
  const banned = (check.mustExclude ?? []).filter((needle) => code.includes(needle));

  if (missing.length === 0 && banned.length === 0) {
    return { passed: true, message: 'Corretto: la struttura richiesta c’è.' };
  }

  return {
    passed: false,
    message:
      missing.length > 0
        ? `Manca ancora qualcosa: ${missing.join(', ')}.`
        : `Togli questa parte: ${banned.join(', ')}.`,
  };
}

const sortLines = (value: string) =>
  value
    .split('\n')
    .map((line) => line.trim())
    .sort()
    .join('\n');
