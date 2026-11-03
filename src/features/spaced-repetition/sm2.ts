/**
 * SM-2 spaced repetition, constrained to the interval ladder the course
 * promises: 1, 3, 7, 14, 30, 90 days.
 *
 * Classic SM-2 would grow intervals by the easiness factor each time and drift
 * away from that ladder. Here the ladder decides the interval and SM-2's
 * easiness factor only nudges it (never below the ladder step, at most 1.5x),
 * so the schedule stays predictable for the learner.
 */
export const INTERVAL_LADDER = [1, 3, 7, 14, 30, 90] as const;

export type ReviewQuality = 0 | 1 | 2 | 3 | 4 | 5;

export interface ReviewState {
  easinessFactor: number;
  intervalDays: number;
  repetitions: number;
  lapses: number;
  nextReviewAt: number;
  lastReviewedAt: number | null;
}

export const initialReviewState = (now = Date.now()): ReviewState => ({
  easinessFactor: 2.5,
  intervalDays: 0,
  repetitions: 0,
  lapses: 0,
  nextReviewAt: now,
  lastReviewedAt: null,
});

const DAY_MS = 86_400_000;

export function isPassing(quality: ReviewQuality) {
  return quality >= 3;
}

/**
 * Applies one review. Quality follows SM-2: 5 = perfect recall, 3 = correct
 * with effort, <3 = forgotten.
 */
export function scheduleReview(
  state: ReviewState,
  quality: ReviewQuality,
  now = Date.now(),
): ReviewState {
  const easinessFactor = Math.max(
    1.3,
    state.easinessFactor + (0.1 - (5 - quality) * (0.08 + (5 - quality) * 0.02)),
  );

  if (!isPassing(quality)) {
    return {
      easinessFactor,
      intervalDays: 1,
      repetitions: 0,
      lapses: state.lapses + 1,
      nextReviewAt: now + DAY_MS,
      lastReviewedAt: now,
    };
  }

  const repetitions = state.repetitions + 1;
  // The ladder is a promise to the learner: intervals stay exactly 1/3/7/14/30/90
  // days. The easiness factor still tracks difficulty for analytics and lapses,
  // but it must not silently stretch the schedule.
  const intervalDays = INTERVAL_LADDER[Math.min(repetitions - 1, INTERVAL_LADDER.length - 1)] ?? 1;

  return {
    easinessFactor,
    intervalDays,
    repetitions,
    lapses: state.lapses,
    nextReviewAt: now + intervalDays * DAY_MS,
    lastReviewedAt: now,
  };
}

/** Concepts whose next review is due, most overdue first. */
export function dueReviews<T extends { nextReviewAt: number }>(items: T[], now = Date.now()) {
  return items.filter((item) => item.nextReviewAt <= now).sort((a, b) => a.nextReviewAt - b.nextReviewAt);
}

export function formatDueIn(nextReviewAt: number, now = Date.now()) {
  const days = Math.ceil((nextReviewAt - now) / DAY_MS);
  if (days <= 0) return 'oggi';
  if (days === 1) return 'domani';
  return `tra ${days} giorni`;
}
