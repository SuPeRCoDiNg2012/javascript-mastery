import { describe, expect, it } from 'vitest';
import { emptyStreak, studyToday } from './streak';

describe('gentle streak', () => {
  it('starts at one on the first study day', () => {
    const result = studyToday(emptyStreak(), '2026-03-01');
    expect(result.state.current).toBe(1);
    expect(result.reason).toBe('first');
  });

  it('continues on consecutive days', () => {
    const day1 = studyToday(emptyStreak(), '2026-03-01');
    const day2 = studyToday(day1.state, '2026-03-02');
    expect(day2.state.current).toBe(2);
    expect(day2.reason).toBe('continued');
  });

  it('covers a single missed day with a freeze instead of resetting', () => {
    const day1 = studyToday(emptyStreak(), '2026-03-01');
    const day3 = studyToday(day1.state, '2026-03-03');
    expect(day3.state.current).toBe(2);
    expect(day3.reason).toBe('frozen');
    expect(day3.state.freezesUsed).toContain('2026-03-02');
  });

  it('offers a 24h recovery window when no freeze is left', () => {
    const day1 = studyToday(emptyStreak(), '2026-03-01');
    // Freeze already spent inside the rolling 7-day window.
    const noBudget = { ...day1.state, freezesUsed: ['2026-02-27'] };
    const day3 = studyToday(noBudget, '2026-03-03', false);

    expect(day3.reason).toBe('restarted');
    expect(day3.state.recoveryValue).toBe(1);
    expect(day3.state.recoveryUntil).not.toBeNull();

    // Studying inside the window saves the number instead of starting over.
    const saved = studyToday(day3.state, '2026-03-04');
    expect(saved.state.current).toBe(2);
    expect(saved.state.recoveryUntil).toBeNull();
  });

  it('does not change the number twice on the same day', () => {
    const day1 = studyToday(emptyStreak(), '2026-03-01');
    const again = studyToday(day1.state, '2026-03-01');
    expect(again.state.current).toBe(1);
    expect(again.reason).toBe('same-day');
  });
});
