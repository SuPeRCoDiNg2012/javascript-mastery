import { describe, expect, it } from 'vitest';
import type { Exercise } from '@/types/course';
import { evaluateExercise } from './check';

const exercise = (lines: string[], unordered = false): Exercise => ({
  id: 'e1',
  kind: 'fill',
  title: 'Test',
  prompt: 'Stampa le righe',
  starterCode: '',
  check: { kind: 'output', lines, unordered },
  hints: ['uno', 'due'],
  solution: '',
  explanation: '',
  concepts: [],
});

const run = (logs: string[], extra: Partial<{ error: string | null; timedOut: boolean }> = {}) => ({
  logs,
  error: extra.error ?? null,
  timedOut: extra.timedOut ?? false,
  message: null,
  durationMs: 12,
});

describe('exercise evaluation', () => {
  it('accepts identical output regardless of trailing whitespace', () => {
    expect(evaluateExercise(exercise(['Ciao']), run(['Ciao   '])).passed).toBe(true);
  });

  it('reports the first differing line as a hint, not a scolding', () => {
    const result = evaluateExercise(exercise(['a', 'b']), run(['a', 'c']));
    expect(result.passed).toBe(false);
    expect(result.message).toContain('Riga 2');
    expect(result.message).toContain('indizio');
  });

  it('surfaces runtime errors with the error text', () => {
    const result = evaluateExercise(exercise(['a']), run([], { error: 'TypeError: x is not a function' }));
    expect(result.passed).toBe(false);
    expect(result.message).toContain('TypeError');
  });

  it('explains the timeout as a possible infinite loop', () => {
    const result = evaluateExercise(exercise(['a']), run([], { timedOut: true }));
    expect(result.passed).toBe(false);
    expect(result.message).toMatch(/cicli/i);
  });

  it('can compare output without order', () => {
    expect(evaluateExercise(exercise(['a', 'b'], true), run(['b', 'a'])).passed).toBe(true);
  });
});
