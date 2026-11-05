import { NavLink } from 'react-router-dom';
import { useAppStore } from '@/app/store';
import { cn } from '@/lib/utils';

const navItems = [
  { to: '/', label: 'Home', end: true },
  { to: '/course', label: 'Percorsi' },
  { to: '/review', label: 'Ripassi' },
  { to: '/stats', label: 'Statistiche' },
  { to: '/settings', label: 'Impostazioni' },
];

export function Sidebar() {
  const online = useAppStore((state) => state.online);
  const pendingSync = useAppStore((state) => state.pendingSync);

  return (
    <aside
      className="fixed inset-y-0 left-0 z-40 hidden w-[260px] flex-col border-r border-border bg-background lg:flex"
      aria-label="Navigazione principale"
    >
      <div className="px-6 py-7">
        <NavLink to="/" className="text-sm font-semibold tracking-tight">
          Mastery
        </NavLink>
        <p className="mt-1 text-xs text-muted-foreground">Due corsi</p>
      </div>

      <nav className="flex-1 px-3">
        <ul className="space-y-0.5">
          {navItems.map(({ to, label, end }) => (
            <li key={to}>
              <NavLink
                to={to}
                end={end}
                className={({ isActive }) =>
                  cn(
                    'block border-l border-transparent px-3 py-2 text-sm transition-colors',
                    isActive
                      ? 'border-foreground font-medium text-foreground'
                      : 'text-muted-foreground hover:text-foreground',
                  )
                }
              >
                {label}
              </NavLink>
            </li>
          ))}
        </ul>
      </nav>

      <div className="px-6 py-5 text-xs text-muted-foreground">
        {online
          ? pendingSync > 0
            ? `${pendingSync} modifiche in coda`
            : 'Sincronizzato'
          : 'Offline · dati locali'}
      </div>
    </aside>
  );
}
