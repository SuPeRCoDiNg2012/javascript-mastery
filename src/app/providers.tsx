import type { ReactNode } from 'react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { Toaster } from 'sonner';
import { useAppStore } from './store';
import { useBootstrap } from './useBootstrap';

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 60_000,
      retry: 1,
      refetchOnWindowFocus: false,
    },
  },
});

export function Providers({ children }: { children: ReactNode }) {
  useBootstrap();
  const theme = useAppStore((state) => state.settings?.theme ?? 'system');

  return (
    <QueryClientProvider client={queryClient}>
      {children}
      <Toaster
        position="bottom-right"
        theme={theme === 'system' ? 'system' : theme}
        closeButton
        toastOptions={{
          classNames: {
            toast: 'rounded-md border border-border bg-card text-card-foreground shadow-lg',
            description: 'text-muted-foreground',
          },
        }}
      />
    </QueryClientProvider>
  );
}
