import { db } from '@/lib/db';
import { supabase } from '@/lib/supabase';
import { flushQueue } from '@/lib/offline-queue';
import type { ProgressRow, QuizResultRow, ExplainResultRow, SpacedRepetitionRow, StreakRow, AchievementRow, ActivityRow, SessionRow, NoteRow, SettingsRow } from '@/types/progress';

/**
 * Cross-device sync.
 *
 * Pull is last-write-wins per row, except for completed exercises and earned
 * achievements, which are unioned so nothing is ever lost. Push goes through the
 * Dexie queue, which is why studying offline works without special cases.
 */

const isoToMs = (value: unknown): number => {
  if (typeof value === 'number') return value;
  if (typeof value === 'string') {
    const parsed = Date.parse(value);
    return Number.isNaN(parsed) ? 0 : parsed;
  }
  return 0;
};

const num = (value: unknown) => (typeof value === 'number' ? value : Number(value ?? 0));

async function mergeProgress(rows: ProgressRow[]) {
  for (const remote of rows) {
    const local = await db.progress.get(remote.key);
    if (!local) {
      await db.progress.put(remote);
      continue;
    }
    if (local.status === 'completed' && remote.status !== 'completed') continue;
    if (remote.updatedAt >= local.updatedAt) await db.progress.put(remote);
  }
}

async function mergeQuizzes(rows: QuizResultRow[]) {
  for (const remote of rows) {
    const local = await db.quizResults.get(remote.key);
    if (!local) {
      await db.quizResults.put(remote);
      continue;
    }
    if (local.isCorrect && !remote.isCorrect) continue;
    if (remote.updatedAt >= local.updatedAt) await db.quizResults.put(remote);
  }
}

async function mergeExplains(rows: ExplainResultRow[]) {
  for (const remote of rows) {
    const local = await db.explainResults.get(remote.key);
    if (!local) {
      await db.explainResults.put(remote);
      continue;
    }
    if (local.completed && !remote.completed) continue;
    if (remote.updatedAt >= local.updatedAt) await db.explainResults.put(remote);
  }
}

async function mergeSpaced(rows: SpacedRepetitionRow[]) {
  for (const remote of rows) {
    const local = await db.spaced.get(remote.key);
    if (!local || remote.updatedAt >= local.updatedAt) await db.spaced.put(remote);
  }
}

export interface PullResult {
  pulled: number;
  ok: boolean;
}

/** Pulls every table for the signed-in user and merges it into Dexie. */
export async function pullRemote(userId: string): Promise<PullResult> {
  if (!supabase) return { pulled: 0, ok: false };

  let pulled = 0;
  try {
    const [progress, quizzes, explains, spaced, streaks, achievementsRes, activity, sessions, notes, settings] =
      await Promise.all([
        supabase.from('user_progress').select('*').eq('user_id', userId),
        supabase.from('user_quiz_results').select('*').eq('user_id', userId),
        supabase.from('user_explain_results').select('*').eq('user_id', userId),
        supabase.from('user_spaced_repetition').select('*').eq('user_id', userId),
        supabase.from('user_streaks').select('*').eq('user_id', userId).maybeSingle(),
        supabase.from('user_achievements').select('*').eq('user_id', userId),
        supabase.from('user_activity').select('*').eq('user_id', userId),
        supabase.from('user_sessions').select('*').eq('user_id', userId),
        supabase.from('user_notes').select('*').eq('user_id', userId),
        supabase.from('user_settings').select('*').eq('user_id', userId).maybeSingle(),
      ]);

    const failed = [progress, quizzes, explains, spaced, achievementsRes, activity, sessions, notes].find(
      (result) => result.error,
    );
    if (failed?.error) throw new Error(failed.error.message);

    const progressRows: ProgressRow[] = (progress.data ?? []).map((row) => ({
      key: `${userId}:${row.week_id}:${row.lesson_id}:${row.exercise_id ?? 'lesson'}`,
      userId,
      weekId: String(row.week_id),
      lessonId: String(row.lesson_id),
      exerciseId: row.exercise_id ? String(row.exercise_id) : null,
      status: row.status === 'completed' ? 'completed' : 'in_progress',
      attempts: num(row.attempts),
      lastAttemptAt: isoToMs(row.last_attempt_at),
      completedAt: row.completed_at ? isoToMs(row.completed_at) : null,
      updatedAt: isoToMs(row.updated_at),
    }));
    await mergeProgress(progressRows);
    pulled += progressRows.length;

    const quizRows: QuizResultRow[] = (quizzes.data ?? []).map((row) => ({
      key: `${userId}:${row.quiz_id}`,
      userId,
      quizId: String(row.quiz_id),
      lessonId: String(row.lesson_id),
      weekId: String(row.week_id),
      answerIndex: num(row.answer),
      isCorrect: Boolean(row.is_correct),
      attempts: num(row.attempts),
      answeredAt: isoToMs(row.answered_at),
      updatedAt: isoToMs(row.updated_at),
    }));
    await mergeQuizzes(quizRows);
    pulled += quizRows.length;

    const explainRows: ExplainResultRow[] = (explains.data ?? []).map((row) => ({
      key: `${userId}:${row.explain_id}`,
      userId,
      explainId: String(row.explain_id),
      lessonId: String(row.lesson_id),
      text: String(row.content ?? ''),
      matchedKeywords: (row.matched_keywords as string[] | null) ?? [],
      completed: Boolean(row.completed),
      updatedAt: isoToMs(row.updated_at),
    }));
    await mergeExplains(explainRows);
    pulled += explainRows.length;

    const spacedRows: SpacedRepetitionRow[] = (spaced.data ?? []).map((row) => ({
      key: `${userId}:${row.concept_id}`,
      userId,
      conceptId: String(row.concept_id),
      easinessFactor: num(row.easiness_factor),
      intervalDays: num(row.interval_days),
      repetitions: num(row.repetitions),
      nextReviewAt: isoToMs(row.next_review_at),
      lastReviewedAt: row.last_reviewed_at ? isoToMs(row.last_reviewed_at) : null,
      lapses: num(row.lapses),
      updatedAt: isoToMs(row.updated_at),
    }));
    await mergeSpaced(spacedRows);
    pulled += spacedRows.length;

    if (streaks.data) {
      const row = streaks.data;
      const remote: StreakRow = {
        userId,
        current: num(row.current_streak),
        longest: num(row.longest_streak),
        lastStudyDate: (row.last_study_date as string | null) ?? null,
        freezesUsed: (row.freezes_used as string[] | null) ?? [],
        recoveryUntil: (row.recovery_until as string | null) ?? null,
        recoveryValue: num(row.recovery_value),
        updatedAt: isoToMs(row.updated_at),
      };
      const local = await db.streaks.get(userId);
      if (!local || remote.updatedAt >= local.updatedAt) await db.streaks.put(remote);
      pulled += 1;
    }

    for (const row of achievementsRes.data ?? []) {
      const remote: AchievementRow = {
        key: `${userId}:${row.achievement_id}`,
        userId,
        achievementId: String(row.achievement_id),
        earnedAt: isoToMs(row.earned_at),
      };
      await db.achievements.put(remote);
      pulled += 1;
    }

    for (const row of activity.data ?? []) {
      const remote: ActivityRow = {
        key: `${userId}:${row.day}`,
        userId,
        date: String(row.day),
        minutes: num(row.minutes),
        exercisesCompleted: num(row.exercises_completed),
        lessonsCompleted: num(row.lessons_completed),
        updatedAt: isoToMs(row.updated_at),
      };
      const local = await db.activity.get(remote.key);
      if (!local || remote.updatedAt >= local.updatedAt) await db.activity.put(remote);
      pulled += 1;
    }

    for (const row of sessions.data ?? []) {
      const remote: SessionRow = {
        key: `${userId}:${row.lesson_id}`,
        userId,
        lessonId: String(row.lesson_id),
        weekId: String(row.week_id),
        seconds: num(row.seconds),
        lastLessonId: (row.last_lesson_id as string | null) ?? null,
        lastScrollRatio: num(row.last_scroll_ratio),
        startedAt: isoToMs(row.started_at),
        updatedAt: isoToMs(row.updated_at),
      };
      const local = await db.sessions.get(remote.key);
      if (!local || remote.updatedAt >= local.updatedAt) await db.sessions.put(remote);
      pulled += 1;
    }

    for (const row of notes.data ?? []) {
      const remote: NoteRow = {
        key: `${userId}:${row.lesson_id}`,
        userId,
        lessonId: String(row.lesson_id),
        content: String(row.content ?? ''),
        updatedAt: isoToMs(row.updated_at),
      };
      const local = await db.notes.get(remote.key);
      if (!local || remote.updatedAt >= local.updatedAt) await db.notes.put(remote);
      pulled += 1;
    }

    if (settings.data) {
      const row = settings.data;
      const remote: SettingsRow = {
        key: `${userId}:settings`,
        userId,
        theme: row.theme === 'dark' ? 'dark' : row.theme === 'light' ? 'light' : 'system',
        fontSize: row.font_size === 'sm' ? 'sm' : row.font_size === 'lg' ? 'lg' : 'md',
        sound: Boolean(row.sound),
        reminders: Boolean(row.reminders),
        studyTime: row.study_time ?? null,
        onboarded: Boolean(row.onboarded),
        displayName: (row.display_name as string | null) ?? null,
        updatedAt: isoToMs(row.updated_at),
      };
      const local = await db.settings.get(remote.key);
      if (!local || remote.updatedAt >= local.updatedAt) await db.settings.put(remote);
      pulled += 1;
    }

    return { pulled, ok: true };
  } catch {
    return { pulled, ok: false };
  }
}

let channel: ReturnType<NonNullable<typeof supabase>['channel']> | null = null;

/**
 * Realtime is a freshness hint, not the source of truth: any remote change
 * triggers a merge pull, which is idempotent and works after reconnects.
 */
export function subscribeToRemote(userId: string) {
  if (!supabase) return () => {};
  if (channel) {
    void supabase.removeChannel(channel);
    channel = null;
  }

  channel = supabase.channel(`progress:${userId}`);
  for (const table of [
    'user_progress',
    'user_quiz_results',
    'user_explain_results',
    'user_streaks',
    'user_spaced_repetition',
    'user_achievements',
    'user_activity',
    'user_sessions',
    'user_settings',
  ]) {
    channel.on(
      'postgres_changes',
      { event: '*', schema: 'public', table, filter: `user_id=eq.${userId}` },
      () => {
        void pullRemote(userId);
      },
    );
  }
  channel.subscribe();

  return () => {
    if (channel && supabase) void supabase.removeChannel(channel);
    channel = null;
  };
}

export async function syncNow(userId: string) {
  if (!supabase || userId === 'guest') return { ok: false, pulled: 0, pushed: 0 };
  const flushed = await flushQueue(userId);
  const pulled = await pullRemote(userId);
  return { ok: pulled.ok, pulled: pulled.pulled, pushed: flushed.pushed };
}

/** Guest → account migration: everything local is re-keyed to the real user. */
export async function migrateGuestData(guestId: string, userId: string) {
  const tables = [
    db.progress,
    db.quizResults,
    db.explainResults,
    db.spaced,
    db.achievements,
    db.activity,
    db.sessions,
    db.notes,
    db.settings,
    db.streaks,
  ] as const;

  for (const table of tables) {
    const rows = await table.toArray();
    const own = rows.filter((row) => (row as { userId?: string }).userId === guestId);
    for (const row of own) {
      if ('userId' in row) {
        const key = String((row as { key?: string }).key ?? '');
        const newKey = key.startsWith(`${guestId}:`) ? `${userId}${key.slice(guestId.length)}` : key;
        await table.put({ ...row, key: newKey, userId } as never);
        const operationType =
          table === db.progress
            ? 'progress'
            : table === db.quizResults
              ? 'quiz'
              : table === db.explainResults
                ? 'explain'
                : table === db.spaced
                  ? 'spaced'
                  : table === db.achievements
                    ? 'achievement'
                    : table === db.activity
                      ? 'activity'
                      : table === db.sessions
                        ? 'session'
                        : table === db.notes
                          ? 'note'
                          : 'settings';
        await flushQueue(userId);
        void operationType;
      }
    }
  }
  await db.settings.delete(`${guestId}:settings`);
}
