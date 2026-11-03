import { Outlet, useLocation } from 'react-router-dom';
import { useEffect } from 'react';
import { Sidebar } from './Sidebar';
import { BottomNav } from './BottomNav';
import { Header } from './Header';

export function AppShell() {
  const location = useLocation();

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'auto' });
  }, [location.pathname]);

  return (
    <div className="min-h-dvh bg-background">
      <a
        href="#contenuto"
        className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:z-50 focus:rounded-md focus:bg-primary focus:px-4 focus:py-2 focus:text-primary-foreground"
      >
        Salta al contenuto
      </a>

      <Sidebar />

      <div className="lg:pl-[260px]">
        <Header />
        <main
          id="contenuto"
          className="mx-auto w-full max-w-content px-4 pb-24 pt-6 sm:px-6 lg:px-8 lg:pb-16"
        >
          <Outlet />
        </main>
      </div>

      <BottomNav />
    </div>
  );
}
