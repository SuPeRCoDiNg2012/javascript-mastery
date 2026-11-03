import { supabase } from '@/lib/supabase';
import { db } from '@/lib/db';
import type {
  AchievementRow,
  ActivityRow,
  ExplainResultRow,
  NoteRow,
  ProgressRow,
  QueueOperation,
  QuizResultRow,
  SessionRow,
  SettingsRow,
  SpacedRepetitionRow,
  StreakRow,
} from '@/types/progress';

type TableName =
  | 'user_progress'
  | 'user_quiz_results'
  | 'user_explain_results'
  | 'user_streaks'
  | 'user_spaced_repetition'
  | 'user_achievements'
  | 'user_sessions'
  | 'user_activity'
  | 'user_notes'
  | 'user_settings';

interface TableSync {
  table: TableName;
  payload: Record<string, unknown>;
}

const toIso = (value: unknown) =>
  typeof value === 'number' ? new Date(value).toISOString() : ((value as string | null) ?? null);

export function progressToRemote(row: ProgressRow): TableSync {
  return {
    table: 'user_progress',
    payload: {
      user_id: row.userId,
      week_id: row.weekId,
      lesson_id: row.lessonId,
      exercise_id: row.exerciseId,
      status: row.status,
      attempts: row.attempts,
      last_attempt_at: toIso(row.lastAttemptAt),
      completed_at: toIso(row.completedAt),
      updated_at: toIso(row.updatedAt),
    },
  };
}

export function quizToRemote(row: QuizResultRow): TableSync {
  return {
    table: 'user_quiz_results',
    payload: {
      user_id: row.userId,
      quiz_id: row.quizId,
      lesson_id: row.lessonId,
      week_id: row.weekId,
      answer: row.answerIndex,
      is_correct: row.isCorrect,
      attempts: row.attempts,
      answered_at: toIso(row.answeredAt),
      updated_at: toIso(row.updatedAt),
    },
  };
}

export function explainToRemote(row: ExplainResultRow): TableSync {
  return {
    table: 'user_explain_results',
    payload: {
      user_id: row.userId,
      explain_id: row.explainId,
      lesson_id: row.lessonId,
      content: row.text,
      matched_keywords: row.matchedKeywords,
      completed: row.completed,
      updated_at: toIso(row.updatedAt),
    },
  };
}

export function streakToRemote(row: StreakRow): TableSync {
  return {
    table: 'user_streaks',
    payload: {
      user_id: row.userId,
      current_streak: row.current,
      longest_streak: row.longest,
      last_study_date: row.lastStudyDate,
      freezes_used: row.freezesUsed,
      recovery_until: row.recoveryUntil,
      recovery_value: row.recoveryValue,
      updated_at: toIso(row.updatedAt),
    },
  };
}

export function spacedToRemote(row: SpacedRepetitionRow): TableSync {
  return {
    table: 'user_spaced_repetition',
    payload: {
      user_id: row.userId,
      concept_id: row.conceptId,
      easiness_factor: row.easinessFactor,
      interval_days: row.intervalDays,
      repetitions: row.repetitions,
      next_review_at: toIso(row.nextReviewAt),
      last_reviewed_at: toIso(row.lastReviewedAt),
      lapses: row.lapses,
      updated_at: toIso(row.updatedAt),
    },
  };
}

export function achievementToRemote(row: AchievementRow): TableSync {
  return {
    table: 'user_achievements',
    payload: {
      user_id: row.userId,
      achievement_id: row.achievementId,
      earned_at: toIso(row.earnedAt),
    },
  };
}

export function sessionToRemote(row: SessionRow): TableSync {
  return {
    table: 'user_sessions',
    payload: {
      user_id: row.userId,
      lesson_id: row.lessonId,
      week_id: row.weekId,
      seconds: row.seconds,
      last_lesson_id: row.lastLessonId,
      last_scroll_ratio: row.lastScrollRatio,
      started_at: toIso(row.startedAt),
      updated_at: toIso(row.updatedAt),
    },
  };
}

export function activityToRemote(row: ActivityRow): TableSync {
  return {
    table: 'user_activity',
    payload: {
      user_id: row.userId,
      day: row.date,
      minutes: row.minutes,
      exercises_completed: row.exercisesCompleted,
      lessons_completed: row.lessonsCompleted,
      updated_at: toIso(row.updatedAt),
    },
  };
}

export function noteToRemote(row: NoteRow): TableSync {
  return {
    table: 'user_notes',
    payload: {
      user_id: row.userId,
      lesson_id: row.lessonId,
      content: row.content,
      updated_at: toIso(row.updatedAt),
    },
  };
}

export function settingsToRemote(row: SettingsRow): TableSync {
  return {
    table: 'user_settings',
    payload: {
      user_id: row.userId,
      theme: row.theme,
      font_size: row.fontSize,
      sound: row.sound,
      reminders: row.reminders,
      study_time: row.studyTime,
      onboarded: row.onboarded,
      display_name: row.displayName,
      updated_at: toIso(row.updatedAt),
    },
  };
}

function operationToRemote(operation: QueueOperation): TableSync {
  switch (operation.type) {
    case 'progress':
      return progressToRemote(operation.payload);
    case 'quiz':
      return quizToRemote(operation.payload);
    case 'explain':
      return explainToRemote(operation.payload);
    case 'streak':
      return streakToRemote(operation.payload);
    case 'spaced':
      return spacedToRemote(operation.payload);
    case 'achievement':
      return achievementToRemote(operation.payload);
    case 'session':
      return sessionToRemote(operation.payload);
    case 'activity':
      return activityToRemote(operation.payload);
    case 'note':
      return noteToRemote(operation.payload);
    case 'settings':
      return settingsToRemote(operation.payload);
  }
}

export async function enqueue(operation: QueueOperation) {
  await db.queue.add({
    userId: operation.payload.userId,
    operation,
    createdAt: Date.now(),
    retries: 0,
    lastError: null,
  });
}

let flushing = false;

/**
 * Drains the offline queue. Safe to call often: it no-ops when offline, when
 * Supabase is not configured, or when another flush is in flight.
 */
export async function flushQueue(userId: string): Promise<{ pushed: number; remaining: number }> {
  if (flushing || !supabase || !userId) {
    return { pushed: 0, remaining: await db.queue.count() };
  }
  if (typeof navigator !== 'undefined' && !navigator.onLine) {
    return { pushed: 0, remaining: await db.queue.count() };
  }

  flushing = true;
  let pushed = 0;

  try {
    const rows = await db.queue.where('userId').equals(userId).sortBy('createdAt');

    for (const row of rows) {
      if (!row.id) continue;
      const { table, payload } = operationToRemote(row.operation);
      try {
        const { error } = await supabase.from(table).upsert(payload, { onConflict: 'user_id' });
        if (error && error.code !== '23505') {
          await db.queue.update(row.id, {
            retries: row.retries + 1,
            lastError: error.message,
          });
          // Stop on auth problems: retrying without a session just burns requests.
          if (error.code === '401' || error.code === '42501' || /JWT/i.test(error.message)) break;
          continue;
        }
        await db.queue.delete(row.id);
        pushed += 1;
      } catch (error) {
        await db.queue.update(row.id, {
          retries: row.retries + 1,
          lastError: error instanceof Error ? error.message : 'unknown',
        });
        break;
      }
    }
  } finally {
    flushing = false;
  }

  return { pushed, remaining: await db.queue.count() };
}

/** Removes queue entries that have failed too many times (corrupt payloads). */
export async function pruneQueue() {
  await db.queue.filter((row) => row.retries > 8).delete();
}
