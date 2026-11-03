import Dexie, { type EntityTable } from 'dexie';
import type {
  AchievementRow,
  ActivityRow,
  NoteRow,
  ProgressRow,
  QueueRow,
  QuizResultRow,
  SessionRow,
  SettingsRow,
  SpacedRepetitionRow,
  StreakRow,
  ExplainResultRow,
} from '@/types/progress';

/**
 * Local-first mirror of the Postgres schema. Every user action is written here
 * first (synchronously, so it survives a crash) and pushed to Supabase in the
 * background. Reads always come from here, which is what makes offline study
 * and instant cross-device resume possible.
 */
class MasteryDatabase extends Dexie {
  progress!: EntityTable<ProgressRow, 'key'>;
  quizResults!: EntityTable<QuizResultRow, 'key'>;
  explainResults!: EntityTable<ExplainResultRow, 'key'>;
  streaks!: EntityTable<StreakRow, 'userId'>;
  spaced!: EntityTable<SpacedRepetitionRow, 'key'>;
  achievements!: EntityTable<AchievementRow, 'key'>;
  sessions!: EntityTable<SessionRow, 'key'>;
  activity!: EntityTable<ActivityRow, 'key'>;
  notes!: EntityTable<NoteRow, 'key'>;
  settings!: EntityTable<SettingsRow, 'key'>;
  queue!: EntityTable<QueueRow, 'id'>;
  meta!: EntityTable<{ key: string; value: unknown }, 'key'>;

  constructor() {
    super('javascript-mastery');
    this.version(1).stores({
      progress: 'key, userId, weekId, lessonId, status, updatedAt',
      quizResults: 'key, userId, quizId, lessonId, weekId, updatedAt',
      explainResults: 'key, userId, lessonId, updatedAt',
      streaks: 'userId',
      spaced: 'key, userId, conceptId, nextReviewAt',
      achievements: 'key, userId, achievementId, earnedAt',
      sessions: 'key, userId, lessonId, updatedAt',
      activity: 'key, userId, date',
      notes: 'key, userId, lessonId',
      settings: 'key, userId',
      queue: '++id, userId, createdAt',
      meta: 'key',
    });
  }
}

export const db = new MasteryDatabase();

/** Clears everything belonging to one local identity (or all data). */
export async function clearLocalData(userId?: string) {
  const tables = [
    db.progress,
    db.quizResults,
    db.explainResults,
    db.spaced,
    db.achievements,
    db.sessions,
    db.activity,
    db.notes,
    db.settings,
    db.queue,
    db.streaks,
  ] as const;

  await db.transaction('rw', tables, async () => {
    for (const table of tables) {
      if (userId) {
        const rows = await table.toArray();
        const keys = rows
          .filter((row) => (row as { userId?: string }).userId === userId)
          .map((row) => (row as { key?: string; id?: number }).key ?? (row as { id?: number }).id)
          .filter((key): key is string | number => key !== undefined);
        await Promise.all(keys.map((key) => table.delete(key as never)));
      } else {
        await table.clear();
      }
    }
  });
}
