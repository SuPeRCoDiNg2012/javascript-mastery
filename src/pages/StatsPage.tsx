import { Link } from 'react-router-dom';
import { Area, AreaChart, CartesianGrid, ResponsiveContainer, XAxis, YAxis } from 'recharts';
import { useAppStore } from '@/app/store';
import { useStats } from '@/app/selectors';
import { formatDay, lastNDays, minutesLabel } from '@/lib/date';

export default function StatsPage() {
  const userId = useAppStore((state) => state.userId);
  const settings = useAppStore((state) => state.settings);
  const stats = useStats(userId);

  const isDark = settings?.theme === 'dark';
  const chartColor = isDark ? '#e5e5e5' : '#171717';

  const activityData = lastNDays(30).map((day) => {
    const row = stats.activity.find((item) => item.date === day);
    return { label: formatDay(day), minuti: row?.minutes ?? 0 };
  });

  return (
    <div>
      <h1 className="text-2xl font-semibold tracking-tight">Statistiche</h1>

      <dl className="mt-8 border-t border-border">
        <Row label="Lezioni" value={`${stats.lessonsCompleted}/96`} />
        <Row label="Settimane" value={`${stats.weeksCompleted}/12`} />
        <Row label="Esercizi" value={`${stats.exercisesCompleted}/${stats.totalExercises}`} />
        <Row label="Quiz corretti" value={`${stats.correctQuizzes}/${stats.totalQuizzes}`} />
        <Row label="Tempo" value={minutesLabel(stats.totalMinutes)} />
        <Row label="Streak" value={`${stats.streak.current} giorni · record ${stats.streak.longest}`} />
      </dl>

      <section className="mt-10" aria-labelledby="attivita">
        <h2 id="attivita" className="text-sm font-medium">
          Ultimi 30 giorni
        </h2>
        <div className="mt-3 h-40 w-full" role="img" aria-label="Minuti di studio degli ultimi 30 giorni">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={activityData} margin={{ top: 4, right: 0, left: -28, bottom: 0 }}>
              <defs>
                <linearGradient id="activityFill" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor={chartColor} stopOpacity={0.18} />
                  <stop offset="100%" stopColor={chartColor} stopOpacity={0} />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="2 4" stroke="hsl(var(--border))" vertical={false} />
              <XAxis
                dataKey="label"
                tick={{ fontSize: 10, fill: 'hsl(var(--muted-foreground))' }}
                tickLine={false}
                axisLine={false}
                interval={6}
              />
              <YAxis
                tick={{ fontSize: 10, fill: 'hsl(var(--muted-foreground))' }}
                tickLine={false}
                axisLine={false}
                width={40}
              />
              <Area
                type="monotone"
                dataKey="minuti"
                stroke={chartColor}
                strokeWidth={1.5}
                fill="url(#activityFill)"
                isAnimationActive={false}
              />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </section>

      <section className="mt-10" aria-labelledby="difficili">
        <h2 id="difficili" className="text-sm font-medium">
          Concetti da rivedere
        </h2>
        {stats.hardestConcepts.length === 0 ? (
          <p className="mt-2 text-sm text-muted-foreground">Nessun errore registrato nei quiz.</p>
        ) : (
          <ul className="mt-3 border-t border-border">
            {stats.hardestConcepts.map((item) => (
              <li key={item.concept} className="border-b border-border py-2.5 text-sm">
                <div className="flex items-baseline justify-between gap-4">
                  <span>{item.concept}</span>
                  <span className="text-xs text-muted-foreground">{item.wrong} errori</span>
                </div>
                {item.lessons[0] && (
                  <Link
                    to={`/lesson/${item.lessons[0].id}`}
                    className="mt-1 inline-block text-xs text-muted-foreground underline underline-offset-4"
                  >
                    {item.lessons[0].title}
                  </Link>
                )}
              </li>
            ))}
          </ul>
        )}
      </section>

      <section className="mt-10" aria-labelledby="traguardi">
        <h2 id="traguardi" className="text-sm font-medium">
          Traguardi
        </h2>
        {stats.earned.length === 0 ? (
          <p className="mt-2 text-sm text-muted-foreground">Il primo arriva alla prima lezione completa.</p>
        ) : (
          <ul className="mt-3 border-t border-border">
            {stats.earned.map((achievement) => (
              <li key={achievement.id} className="border-b border-border py-2.5 text-sm">
                {achievement.title}
              </li>
            ))}
          </ul>
        )}
      </section>
    </div>
  );
}

function Row({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex items-baseline justify-between gap-4 border-b border-border py-2.5 text-sm">
      <dt className="text-muted-foreground">{label}</dt>
      <dd className="tabular-nums">{value}</dd>
    </div>
  );
}
