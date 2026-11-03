import { Link } from 'react-router-dom';
import { useAppStore } from '@/app/store';
import { useCourseOverview } from '@/app/selectors';

export default function CoursePage() {
  const userId = useAppStore((state) => state.userId);
  const overview = useCourseOverview(userId);

  return (
    <div>
      <h1 className="text-2xl font-semibold tracking-tight">Percorso</h1>
      <p className="mt-2 max-w-lg text-sm leading-relaxed text-muted-foreground">
        Dodici settimane, otto lezioni ciascuna. Ogni lezione si apre quando la precedente è completa.
      </p>

      <ol className="mt-8 border-t border-border">
        {overview.perWeek.map(({ week, lessonsCompleted, total, testPassed }) => (
          <li key={week.id}>
            <Link
              to={`/week/${week.id}`}
              className="flex items-baseline justify-between gap-4 border-b border-border py-3 text-sm hover:bg-muted/40"
            >
              <span>
                <span className="mr-3 text-xs tabular-nums text-muted-foreground">
                  {String(week.number).padStart(2, '0')}
                </span>
                {week.title}
              </span>
              <span className="shrink-0 text-xs tabular-nums text-muted-foreground">
                {lessonsCompleted}/{total}
                {testPassed ? ' · test' : ''}
              </span>
            </Link>
          </li>
        ))}
      </ol>

      <p className="mt-6 text-xs leading-relaxed text-muted-foreground">
        Per aprire una lezione servono tutti gli esercizi, i quiz corretti e la spiegazione con parole tue.
      </p>
    </div>
  );
}
