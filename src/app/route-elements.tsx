import { Suspense, type ReactNode } from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { useAppStore } from '@/app/store';
import { Skeleton } from '@/components/ui/skeleton';

/** Route-level code splitting keeps the home bundle small. */
export function Page({ children }: { children: ReactNode }) {
  return (
    <Suspense
      fallback={
        <div className="space-y-4 py-6" aria-busy="true" aria-label="Caricamento">
          <Skeleton className="h-8 w-2/3" />
          <Skeleton className="h-4 w-1/2" />
          <Skeleton className="h-40 w-full" />
        </div>
      }
    >
      {children}
    </Suspense>
  );
}

/** Guests can study immediately; onboarding is the only gate. */
export function Gate() {
  const hydrated = useAppStore((state) => state.hydrated);
  const settings = useAppStore((state) => state.settings);

  if (!hydrated || !settings) {
    return (
      <div className="flex min-h-dvh items-center justify-center bg-background">
        <div className="w-48 space-y-3" aria-busy="true" aria-label="Avvio dell’app">
          <Skeleton className="h-8 w-8 rounded-md" />
          <Skeleton className="h-4 w-full" />
          <Skeleton className="h-4 w-2/3" />
        </div>
      </div>
    );
  }

  if (!settings.onboarded) return <Navigate to="/onboarding" replace />;
  return <Outlet />;
}
