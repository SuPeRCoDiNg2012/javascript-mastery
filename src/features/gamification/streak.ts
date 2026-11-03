import { addDays, differenceInCalendarDays, formatISO, parseISO, startOfDay } from 'date-fns';

export interface StreakState {
  current: number;
  longest: number;
  lastStudyDate: string | null;
  freezesUsed: string[];
  recoveryUntil: string | null;
  recoveryValue: number;
}

export const emptyStreak = (): StreakState => ({
  current: 0,
  longest: 0,
  lastStudyDate: null,
  freezesUsed: [],
  recoveryUntil: null,
  recoveryValue: 0,
});

export const dayKey = (date: Date | number) => formatISO(startOfDay(date), { representation: 'date' });

/** One free day per rolling 7-day window, as promised in the course rules. */
export function hasFreezeAvailable(state: StreakState, today: string) {
  const windowStart = dayKey(addDays(parseISO(today), -6));
  return !state.freezesUsed.some((used) => used >= windowStart && used <= today);
}

export interface StudyTodayResult {
  state: StreakState;
  /** Why the number changed — the UI explains it instead of silently updating. */
  reason: 'first' | 'continued' | 'frozen' | 'recovered' | 'restarted' | 'same-day' | 'expired';
  freezeUsed: boolean;
}

/**
 * Records a study day. The streak is deliberately forgiving:
 *  - one missed day is covered automatically by a freeze (1 per 7 days);
 *  - with no freeze left the streak is not destroyed immediately: it enters a
 *    24h "recovery" window, and studying inside it saves the number;
 *  - only after that does it restart from 1, and the UI never scolds the user.
 */
export function studyToday(
  state: StreakState,
  today = dayKey(new Date()),
  freezeBudgetAvailable = hasFreezeAvailable(state, today),
): StudyTodayResult {
  if (!state.lastStudyDate) {
    return {
      state: { ...state, current: 1, longest: Math.max(state.longest, 1), lastStudyDate: today },
      reason: 'first',
      freezeUsed: false,
    };
  }

  const gap = differenceInCalendarDays(parseISO(today), parseISO(state.lastStudyDate));

  if (gap <= 0) {
    return { state, reason: 'same-day', freezeUsed: false };
  }

  if (gap === 1) {
    const current = state.current + 1;
    return {
      state: {
        ...state,
        current,
        longest: Math.max(state.longest, current),
        lastStudyDate: today,
        recoveryUntil: null,
        recoveryValue: 0,
      },
      reason: 'continued',
      freezeUsed: false,
    };
  }

  const inRecovery =
    state.recoveryUntil !== null && startOfDay(new Date()).getTime() < new Date(state.recoveryUntil).getTime();

  if (gap === 2 && freezeBudgetAvailable) {
    const current = state.current + 1;
    return {
      state: {
        ...state,
        current,
        longest: Math.max(state.longest, current),
        lastStudyDate: today,
        freezesUsed: [...state.freezesUsed, dayKey(addDays(parseISO(today), -1))],
        recoveryUntil: null,
        recoveryValue: 0,
      },
      reason: 'frozen',
      freezeUsed: true,
    };
  }

  if (inRecovery && state.recoveryValue > 0) {
    const current = state.recoveryValue + 1;
    return {
      state: {
        ...state,
        current,
        longest: Math.max(state.longest, current),
        lastStudyDate: today,
        recoveryUntil: null,
        recoveryValue: 0,
      },
      reason: 'recovered',
      freezeUsed: false,
    };
  }

  if (gap === 2) {
    // No freeze left and the window already closed: keep the number visible for
    // 24h so the learner can still save it, without losing it right away.
    return {
      state: {
        ...state,
        lastStudyDate: state.lastStudyDate,
        recoveryUntil: new Date(Date.now() + 86_400_000).toISOString(),
        recoveryValue: state.current,
      },
      reason: 'restarted',
      freezeUsed: false,
    };
  }

  return {
    state: {
      ...state,
      current: 1,
      longest: Math.max(state.longest, 1),
      lastStudyDate: today,
      recoveryUntil: null,
      recoveryValue: 0,
    },
    reason: 'expired',
    freezeUsed: false,
  };
}

/** Human, non-punitive copy for the streak card. */
export function streakMessage(state: StreakState, today = dayKey(new Date())) {
  if (!state.lastStudyDate) return 'Inizia oggi: basta un esercizio.';
  const gap = differenceInCalendarDays(parseISO(today), parseISO(state.lastStudyDate));
  if (gap === 0) return 'Hai studiato oggi. Continua così, con calma.';
  if (gap === 1) return 'Ci sei quasi: un esercizio oggi e la streak sale.';
  if (state.recoveryUntil && new Date(state.recoveryUntil).getTime() > Date.now()) {
    return `Sei in stato recupero: hai 24 ore per salvare la streak di ${state.recoveryValue}.`;
  }
  return 'Riprendiamo da qui. La streak riparte da 1, senza drammi.';
}
