import { useEffect } from 'react';
import { db } from '@/lib/db';
import { supabase } from '@/lib/supabase';
import { flushQueue } from '@/lib/offline-queue';
import { applyFontSize, applyTheme, watchSystemTheme } from '@/lib/theme';
import { GUEST_ID, useAppStore } from '@/app/store';
import { loadSettings } from '@/app/settings';
import { migrateGuestData, pullRemote, subscribeToRemote, syncNow } from '@/features/sync/sync';

/**
 * Boot sequence: identity → settings → theme → connectivity → sync.
 * Everything degrades to guest mode when Supabase is absent or unreachable.
 */
export function useBootstrap() {
  const setUserId = useAppStore((state) => state.setUserId);
  const setSettings = useAppStore((state) => state.setSettings);
  const setHydrated = useAppStore((state) => state.setHydrated);
  const setOnline = useAppStore((state) => state.setOnline);
  const setPendingSync = useAppStore((state) => state.setPendingSync);

  useEffect(() => {
    let cancelled = false;
    let unsubscribeRealtime: (() => void) | null = null;
    let unsubscribeAuth: (() => void) | null = null;

    const boot = async () => {
      let userId = GUEST_ID;
      let email: string | null = null;

      if (supabase) {
        const { data } = await supabase.auth.getSession();
        if (data.session?.user) {
          userId = data.session.user.id;
          email = data.session.user.email ?? null;
        }
      }

      if (cancelled) return;

      const previous = useAppStore.getState().userId;
      if (previous === GUEST_ID && userId !== GUEST_ID) {
        await migrateGuestData(GUEST_ID, userId);
      }

      setUserId(userId, email);
      const settings = await loadSettings(userId);
      if (cancelled) return;
      setSettings(settings);
      applyTheme(settings.theme);
      applyFontSize(settings.fontSize);
      setHydrated(true);

      if (userId !== GUEST_ID) {
        await pullRemote(userId);
        await flushQueue(userId);
        setPendingSync(await db.queue.count());
        unsubscribeRealtime = subscribeToRemote(userId);
      } else {
        setPendingSync(await db.queue.where('userId').equals(GUEST_ID).count());
      }

      unsubscribeAuth = (() => {
        if (!supabase) return null;
        const { data } = supabase.auth.onAuthStateChange(async (_event, session) => {
          const nextId = session?.user.id ?? GUEST_ID;
          if (nextId === useAppStore.getState().userId) return;
          if (nextId === GUEST_ID) {
            setUserId(GUEST_ID, null);
            const guestSettings = await loadSettings(GUEST_ID);
            setSettings(guestSettings);
            return;
          }
          await migrateGuestData(GUEST_ID, nextId);
          setUserId(nextId, session?.user.email ?? null);
          const nextSettings = await loadSettings(nextId);
          setSettings(nextSettings);
          await syncNow(nextId);
        });
        return () => data.subscription.unsubscribe();
      })();
    };

    void boot();

    const onOnline = () => {
      setOnline(true);
      void syncNow(useAppStore.getState().userId).then(async () => {
        setPendingSync(await db.queue.count());
      });
    };
    const onOffline = () => setOnline(false);
    window.addEventListener('online', onOnline);
    window.addEventListener('offline', onOffline);
    setOnline(navigator.onLine);

    const unwatchTheme = watchSystemTheme(useAppStore.getState().settings?.theme ?? 'system');

    const interval = window.setInterval(() => {
      const { userId: current } = useAppStore.getState();
      void flushQueue(current).then(async () => setPendingSync(await db.queue.count()));
    }, 30_000);

    return () => {
      cancelled = true;
      window.removeEventListener('online', onOnline);
      window.removeEventListener('offline', onOffline);
      window.clearInterval(interval);
      unwatchTheme();
      unsubscribeAuth?.();
      unsubscribeRealtime?.();
    };
  }, [setHydrated, setOnline, setPendingSync, setSettings, setUserId]);
}
