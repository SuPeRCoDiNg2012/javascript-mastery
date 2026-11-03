import { createClient, type SupabaseClient } from '@supabase/supabase-js';

const url = import.meta.env.VITE_SUPABASE_URL as string | undefined;
const anonKey = import.meta.env.VITE_SUPABASE_ANON_KEY as string | undefined;

/**
 * The app is fully usable as a guest without Supabase. When the two public
 * environment variables are present the client is created and sync/auth turn on.
 * Only public (anon) keys belong here — never a service role key.
 */
export const isSupabaseConfigured = Boolean(url && anonKey);

export const supabase: SupabaseClient | null = isSupabaseConfigured
  ? createClient(url as string, anonKey as string, {
      auth: {
        persistSession: true,
        autoRefreshToken: true,
        detectSessionInUrl: true,
        flowType: 'pkce',
      },
      realtime: { params: { eventsPerSecond: 5 } },
    })
  : null;

export const appOrigin = () =>
  typeof window === 'undefined' ? 'http://localhost:5173' : window.location.origin;
