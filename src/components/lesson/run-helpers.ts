import type { Exercise } from '@/types/course';
import type { RunResult } from '@/types/runner';
import { evaluateExercise, evaluateSource, type CheckResult } from '@/features/lesson/check';
import { normalizeOutput } from '@/lib/utils';

/**
 * Single entry point used by the UI: source checks look at the code the learner
 * wrote, everything else at what the sandbox printed.
 */
export function checkOutput(exercise: Exercise, result: RunResult, code = ''): CheckResult {
  if (exercise.check.kind === 'source') {
    return evaluateSource(exercise, code || result.logs.join('\n'));
  }
  if (exercise.check.kind === 'manual') {
    return { passed: true, message: 'Segna i punti che hai completato.' };
  }
  return evaluateExercise(exercise, result);
}

/** Preview of expected output for the panel and for solution comparisons. */
export function expectedLines(exercise: Exercise) {
  return exercise.check.kind === 'output' ? exercise.check.lines : [];
}

export { normalizeOutput };
