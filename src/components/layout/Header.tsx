import { Link } from 'react-router-dom';
import { useAppStore } from '@/app/store';

/** Mobile-only bar. On desktop the sidebar carries the brand and navigation. */
export function Header() {
  const online = useAppStore((state) => state.online);

  return (
    <header className="border-b border-border bg-background lg:hidden">
      <div className="flex h-12 items-center justify-between px-4">
        <Link to="/" className="text-sm font-semibold tracking-tight">
          JavaScript Mastery
        </Link>
        {!online && <span className="text-xs text-muted-foreground">Offline</span>}
      </div>
    </header>
  );
}
