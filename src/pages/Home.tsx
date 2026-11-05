import { Link } from 'react-router-dom';
import { useAppStore } from '@/app/store';
import { useResumeTarget, useStats } from '@/app/selectors';
import { courses, totalLessonCount, totalWeekCount, getWeek } from '@/content';
import { dayKey } from '@/features/gamification/streak';
import { minutesLabel } from '@/lib/date';

export default function Home() {
  const userId = useAppStore((state) => state.userId);
  const settings = useAppStore((state) => state.settings);
  const stats = useStats(userId);
  const resume = useResumeTarget(userId);

  const daysSinceStudy = stats.streak.lastStudyDate
    ? Math.round((Date.parse(dayKey(new Date())) - Date.parse(stats.streak.lastStudyDate)) / 86_400_000)
    : null;
  const returning = daysSinceStudy !== null && daysSinceStudy >= 3;

  const questRemaining = Math.max(0, stats.questState.target - stats.questState.value);

  return (
    <div>
      <h1 className="text-2xl font-semibold tracking-tight">
        {settings?.displayName ? `Ciao, ${settings.displayName}.` : returning ? 'Bentornato.' : 'Riprendiamo.'}
      </h1>
      <p className="mt-2 max-w-lg text-sm leading-relaxed text-muted-foreground">
        {returning
          ? 'Nessun ritardo da recuperare. Si riparte da un passo piccolo, quando vuoi.'
          : 'Due corsi, progetti reali. Un esercizio alla volta.'}
      </p>

      <p className="mt-4 text-xs text-muted-foreground">
        {stats.lessonsCompleted}/{totalLessonCount} lezioni · {stats.weeksCompleted}/{totalWeekCount} settimane ·{' '}
        {minutesLabel(stats.totalMinutes)}
      </p>

      <section className="mt-10 border-y border-border py-6" aria-labelledby="prossimo">
        <p className="text-xs uppercase tracking-[0.12em] text-muted-foreground">
          {resume?.reason === 'in-progress' ? 'Riprendi' : 'Prossimo passo'}
        </p>
        <h2 id="prossimo" className="mt-2 text-lg font-medium">
          {resume ? resume.lesson.title : 'Tutte le lezioni sono complete'}
        </h2>
        <p className="mt-1 text-sm text-muted-foreground">
          {resume
            ? `Settimana ${getWeek(resume.lesson.weekId)?.number ?? ''} · Lezione ${resume.lesson.number} · ${resume.lesson.minutes} min`
            : 'Il valore ora è nei progetti: riprendi un brand kit o aggiungi una funzionalità al Quaderno delle spese.'}
        </p>
        <div className="mt-4 flex flex-wrap items-center gap-x-5 gap-y-2 text-sm">
          <Link
            to={resume ? `/lesson/${resume.lesson.id}` : '/course'}
            className="font-medium underline underline-offset-4"
          >
            {resume?.reason === 'in-progress' ? 'Riprendi la lezione' : 'Scegli un corso'}
          </Link>
          <Link to="/review" className="text-muted-foreground underline underline-offset-4">
            Ripassi{stats.due.length > 0 ? ` (${stats.due.length})` : ''}
          </Link>
        </div>
      </section>

      <p className="mt-6 text-xs text-muted-foreground">
        Oggi: {stats.quest.title} ·{' '}
        {questRemaining === 0
          ? 'fatto'
          : `${Math.min(stats.questState.value, stats.questState.target)}/${stats.questState.target}`}
      </p>

      <section className="mt-10" aria-labelledby="percorso">
        <div className="flex items-baseline justify-between">
          <h2 id="percorso" className="text-sm font-medium">
            Corsi
          </h2>
          <Link to="/course" className="text-xs text-muted-foreground underline underline-offset-4">
            Tutti i percorsi
          </Link>
        </div>

        <ul className="mt-3 border-t border-border">
          {courses.map((course) => {
            const done = course.weeks
              .flatMap((week) => week.lessons)
              .filter((lesson) => stats.completed.has(lesson.id)).length;
            const total = course.weeks.flatMap((week) => week.lessons).length;
            return (
              <li key={course.id}>
                <Link
                  to={`/course/${course.id}`}
                  className="flex items-baseline justify-between gap-4 border-b border-border py-3 text-sm hover:bg-muted/40"
                >
                  <span>
                    <span className="block font-medium">{course.title}</span>
                    <span className="mt-0.5 block text-xs text-muted-foreground">{course.subtitle}</span>
                  </span>
                  <span className="shrink-0 text-xs tabular-nums text-muted-foreground">
                    {done}/{total}
                  </span>
                </Link>
              </li>
            );
          })}
        </ul>
      </section>
    </div>
  );
}
