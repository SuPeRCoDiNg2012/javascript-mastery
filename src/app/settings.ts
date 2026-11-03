import { db } from '@/lib/db';
import { enqueue } from '@/lib/offline-queue';
import type { SettingsRow } from '@/types/progress';
import { applyFontSize, applyTheme } from '@/lib/theme';

export const defaultSettings = (userId: string): SettingsRow => ({
  key: `${userId}:settings`,
  userId,
  theme: 'light',
  fontSize: 'md',
  sound: false,
  reminders: false,
  studyTime: null,
  onboarded: false,
  displayName: null,
  updatedAt: Date.now(),
});

export async function loadSettings(userId: string): Promise<SettingsRow> {
  const existing = await db.settings.get(`${userId}:settings`);
  if (existing) {
    // Older builds defaulted to "system"; the course is now paper-white by default.
    if (existing.theme === 'system') {
      const migrated: SettingsRow = { ...existing, theme: 'light', updatedAt: Date.now() };
      await db.settings.put(migrated);
      return migrated;
    }
    return existing;
  }
  const fresh = defaultSettings(userId);
  await db.settings.put(fresh);
  return fresh;
}

export async function saveSettings(userId: string, patch: Partial<SettingsRow>) {
  const current = await loadSettings(userId);
  const next: SettingsRow = { ...current, ...patch, userId, key: `${userId}:settings`, updatedAt: Date.now() };
  await db.settings.put(next);
  await enqueue({ type: 'settings', payload: next });
  applyTheme(next.theme);
  applyFontSize(next.fontSize);
  return next;
}

/** Exports progress as a portable JSON file (works as a manual device sync). */
export async function exportProgress(userId: string) {
  const [progress, quizzes, explains, streak, spaced, achievements, sessions, activity, notes, settings] =
    await Promise.all([
      db.progress.where('userId').equals(userId).toArray(),
      db.quizResults.where('userId').equals(userId).toArray(),
      db.explainResults.where('userId').equals(userId).toArray(),
      db.streaks.get(userId),
      db.spaced.where('userId').equals(userId).toArray(),
      db.achievements.where('userId').equals(userId).toArray(),
      db.sessions.where('userId').equals(userId).toArray(),
      db.activity.where('userId').equals(userId).toArray(),
      db.notes.where('userId').equals(userId).toArray(),
      db.settings.get(`${userId}:settings`),
    ]);

  const payload = {
    format: 'javascript-mastery/export',
    version: 1,
    exportedAt: new Date().toISOString(),
    progress,
    quizzes,
    explains,
    streak: streak ?? null,
    spaced,
    achievements,
    sessions,
    activity,
    notes,
    settings: settings ?? null,
  };

  const blob = new Blob([JSON.stringify(payload, null, 2)], { type: 'application/json' });
  const url = URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.href = url;
  link.download = `javascript-mastery-${new Date().toISOString().slice(0, 10)}.json`;
  link.click();
  URL.revokeObjectURL(url);
  return payload;
}

interface ImportPayload {
  format?: string;
  progress?: unknown[];
  quizzes?: unknown[];
  explains?: unknown[];
  spaced?: unknown[];
  achievements?: unknown[];
  sessions?: unknown[];
  activity?: unknown[];
  notes?: unknown[];
  streak?: unknown;
}

/** Imports an export into the current identity, unioning completions. */
export async function importProgress(userId: string, raw: string) {
  const parsed = JSON.parse(raw) as ImportPayload;
  if (parsed.format !== 'javascript-mastery/export') {
    throw new Error('Il file non è un backup di JavaScript Mastery.');
  }

  const withUser = <T extends { userId?: string; key?: string }>(row: T, kind: string) => {
    const copy = { ...row, userId } as T & { userId: string; key: string };
    const oldKey = String(row.key ?? '');
    const colon = oldKey.indexOf(':');
    copy.key = colon >= 0 ? `${userId}${oldKey.slice(colon)}` : `${userId}:${kind}:${oldKey}`;
    return copy;
  };

  let imported = 0;

  if (Array.isArray(parsed.progress)) {
    for (const item of parsed.progress) {
      const row = withUser(item as { userId?: string; key?: string; status?: string }, 'progress');
      const existing = await db.progress.get(row.key);
      if (!existing || row.status === 'completed' || !existing.status) {
        await db.progress.put(row as never);
        imported += 1;
      }
    }
  }

  if (Array.isArray(parsed.quizzes)) {
    for (const item of parsed.quizzes) {
      const row = withUser(item as { userId?: string; key?: string }, 'quiz');
      await db.quizResults.put(row as never);
      imported += 1;
    }
  }

  if (Array.isArray(parsed.explains)) {
    for (const item of parsed.explains) {
      const row = withUser(item as { userId?: string; key?: string }, 'explain');
      await db.explainResults.put(row as never);
      imported += 1;
    }
  }

  if (Array.isArray(parsed.spaced)) {
    for (const item of parsed.spaced) {
      const row = withUser(item as { userId?: string; key?: string }, 'spaced');
      await db.spaced.put(row as never);
      imported += 1;
    }
  }

  if (Array.isArray(parsed.achievements)) {
    for (const item of parsed.achievements) {
      const row = withUser(item as { userId?: string; key?: string }, 'achievement');
      await db.achievements.put(row as never);
      imported += 1;
    }
  }

  if (Array.isArray(parsed.sessions)) {
    for (const item of parsed.sessions) {
      const row = withUser(item as { userId?: string; key?: string }, 'session');
      const existing = await db.sessions.get(row.key);
      if (!existing || (row as { updatedAt?: number }).updatedAt! >= existing.updatedAt) {
        await db.sessions.put(row as never);
      }
      imported += 1;
    }
  }

  if (Array.isArray(parsed.activity)) {
    for (const item of parsed.activity) {
      const row = withUser(item as { userId?: string; key?: string }, 'activity');
      await db.activity.put(row as never);
      imported += 1;
    }
  }

  if (Array.isArray(parsed.notes)) {
    for (const item of parsed.notes) {
      const row = withUser(item as { userId?: string; key?: string }, 'note');
      await db.notes.put(row as never);
      imported += 1;
    }
  }

  if (parsed.streak && typeof parsed.streak === 'object') {
    const streak = parsed.streak as Record<string, unknown>;
    await db.streaks.put({
      ...(streak as object),
      userId,
      updatedAt: Date.now(),
    } as never);
  }

  return imported;
}
