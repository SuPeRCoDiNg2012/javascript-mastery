import { create } from 'zustand';
import type { SettingsRow } from '@/types/progress';

export const GUEST_ID = 'guest';

interface AppState {
  /** Local identity: 'guest' until a Supabase session exists. */
  userId: string;
  email: string | null;
  settings: SettingsRow | null;
  hydrated: boolean;
  online: boolean;
  pendingSync: number;
  /** Set once per session so the welcome-back message only shows on arrival. */
  returnedAfterPause: boolean;
  lastActiveLessonId: string | null;
  setUserId: (userId: string, email?: string | null) => void;
  setSettings: (settings: SettingsRow | null) => void;
  setHydrated: (hydrated: boolean) => void;
  setOnline: (online: boolean) => void;
  setPendingSync: (pending: number) => void;
  setReturnedAfterPause: (value: boolean) => void;
  setLastActiveLessonId: (lessonId: string | null) => void;
}

export const useAppStore = create<AppState>((set) => ({
  userId: GUEST_ID,
  email: null,
  settings: null,
  hydrated: false,
  online: typeof navigator === 'undefined' ? true : navigator.onLine,
  pendingSync: 0,
  returnedAfterPause: false,
  lastActiveLessonId: null,
  setUserId: (userId, email = null) => set({ userId, email }),
  setSettings: (settings) => set({ settings }),
  setHydrated: (hydrated) => set({ hydrated }),
  setOnline: (online) => set({ online }),
  setPendingSync: (pendingSync) => set({ pendingSync }),
  setReturnedAfterPause: (returnedAfterPause) => set({ returnedAfterPause }),
  setLastActiveLessonId: (lastActiveLessonId) => set({ lastActiveLessonId }),
}));
