import { describe, expect, it } from 'vitest';
import { INTERVAL_LADDER, dueReviews, initialReviewState, scheduleReview } from './sm2';

const DAY = 86_400_000;
const NOW = Date.UTC(2026, 0, 1);

describe('SM-2 schedule', () => {
  it('follows the promised 1/3/7/14/30/90 ladder on perfect recall', () => {
    let state = initialReviewState(NOW);
    const intervals: number[] = [];

    for (let i = 0; i < INTERVAL_LADDER.length; i += 1) {
      state = scheduleReview(state, 5, NOW);
      intervals.push(state.intervalDays);
    }

    expect(intervals).toEqual([1, 3, 7, 14, 30, 90]);
  });

  it('resets to one day and counts a lapse when the recall fails', () => {
    let state = initialReviewState(NOW);
    state = scheduleReview(state, 5, NOW);
    state = scheduleReview(state, 1, NOW);

    expect(state.intervalDays).toBe(1);
    expect(state.repetitions).toBe(0);
    expect(state.lapses).toBe(1);
    expect(state.nextReviewAt).toBe(NOW + DAY);
  });

  it('never lets the easiness factor fall below 1.3', () => {
    let state = initialReviewState(NOW);
    for (let i = 0; i < 12; i += 1) state = scheduleReview(state, 0, NOW);
    expect(state.easinessFactor).toBeGreaterThanOrEqual(1.3);
  });

  it('lists due reviews most overdue first', () => {
    const items = [
      { id: 'a', nextReviewAt: NOW + DAY },
      { id: 'b', nextReviewAt: NOW - DAY },
      { id: 'c', nextReviewAt: NOW - 3 * DAY },
    ];
    expect(dueReviews(items, NOW).map((item) => item.id)).toEqual(['c', 'b']);
  });
});
