import { Link, useParams } from 'react-router-dom';
import { useAppStore } from '@/app/store';
import {
  completedLessonIds,
  isLessonUnlocked,
  lessonProgress,
  useExplainRows,
  useProgressRows,
  useQuizRows,
} from '@/app/selectors';
import { getCourseOfWeek, getWeek } from '@/content';
import NotFound from './NotFound';

export default function WeekPage() {
  const { weekId = '' } = useParams();
  const userId = useAppStore((state) => state.userId);
  const week = getWeek(weekId);
  const rows = useProgressRows(userId);
  const quizRows = useQuizRows(userId);
  const explainRows = useExplainRows(userId);
  const completed = completedLessonIds(rows);

  if (!week) return <NotFound />;

  const course = getCourseOfWeek(week.id);
  const done = week.lessons.filter((lesson) => completed.has(lesson.id)).length;
  const testUnlocked = done === week.lessons.length;
  const testRow = rows.find((row) => row.weekId === week.id && row.exerciseId === 'week-test');

  return (
    <div>
      <Link
        to={course ? `/course/${course.id}` : '/course'}
        className="text-xs text-muted-foreground underline underline-offset-4"
      >
        {course?.shortTitle ?? 'Percorsi'}
      </Link>

      <p className="mt-6 text-xs uppercase tracking-[0.12em] text-muted-foreground">
        Settimana {week.number}
      </p>
      <h1 className="mt-1 text-2xl font-semibold tracking-tight">{week.title}</h1>
      <p className="mt-2 max-w-lg text-sm leading-relaxed text-muted-foreground">{week.description}</p>
      <p className="mt-4 text-xs tabular-nums text-muted-foreground">
        {done}/{week.lessons.length} lezioni complete
      </p>

      <ol className="mt-8 border-t border-border">
        {week.lessons.map((lesson) => {
          const progress = lessonProgress(lesson, rows, quizRows, explainRows);
          const unlocked = isLessonUnlocked(lesson, completed);
          const complete = completed.has(lesson.id);

          return (
            <li key={lesson.id}>
              <Link
                to={`/lesson/${lesson.id}`}
                className="flex items-baseline justify-between gap-4 border-b border-border py-3 text-sm hover:bg-muted/40"
              >
                <span>
                  <span className="mr-3 text-xs tabular-nums text-muted-foreground">{lesson.number}</span>
                  {lesson.title}
                </span>
                <span className="shrink-0 text-xs text-muted-foreground">
                  {complete ? 'fatto' : unlocked ? `${progress.done}/${progress.total}` : 'bloccata'}
                </span>
              </Link>
            </li>
          );
        })}
      </ol>

      <section className="mt-8">
        <h2 className="text-sm font-medium">Checkpoint</h2>
        <p className="mt-1 text-xs leading-relaxed text-muted-foreground">
          Otto domande, una per lezione. Si apre a settimana completata.
        </p>
        <p className="mt-2 text-sm">
          {testRow?.status === 'completed' ? (
            'Superato.'
          ) : testUnlocked ? (
            <Link to={`/week/${week.id}/test`} className="underline underline-offset-4">
              Apri il checkpoint
            </Link>
          ) : (
            <span className="text-muted-foreground">
              Mancano {week.lessons.length - done} lezioni.
            </span>
          )}
        </p>
      </section>

      <section className="mt-8">
        <h2 className="text-sm font-medium">Progetto · {week.project.title}</h2>
        <p className="mt-1 max-w-lg text-sm leading-relaxed text-muted-foreground">{week.project.brief}</p>
        <p className="mt-2 text-xs text-muted-foreground">Consegna: {week.project.deliverable}</p>
      </section>

      <section className="mt-8">
        <h2 className="text-sm font-medium">{week.professional.title}</h2>
        <p className="mt-1 text-xs text-muted-foreground">{week.professional.topics.join(' · ')}</p>
        <p className="mt-2 max-w-lg text-sm leading-relaxed text-muted-foreground">
          {week.professional.exercise}
        </p>
      </section>
    </div>
  );
}
