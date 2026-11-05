import { Link, useParams } from 'react-router-dom';
import { useAppStore } from '@/app/store';
import { useCourseOverview, useStats } from '@/app/selectors';
import { courses, getCourse } from '@/content';
import NotFound from './NotFound';

export default function CoursePage() {
  const { courseId = '' } = useParams();
  const userId = useAppStore((state) => state.userId);
  const course = courseId ? getCourse(courseId) : undefined;
  const overview = useCourseOverview(userId, course?.id);
  const stats = useStats(userId);

  if (courseId && !course) return <NotFound />;

  if (!course) {
    return (
      <div>
        <h1 className="text-2xl font-semibold tracking-tight">Percorsi</h1>
        <p className="mt-2 max-w-lg text-sm leading-relaxed text-muted-foreground">
          Due corsi indipendenti. Puoi studiarli in parallelo: il progresso di uno non blocca l’altro.
        </p>

        <ul className="mt-8 border-t border-border">
          {courses.map((item) => {
            const itemLessons = item.weeks.flatMap((week) => week.lessons);
            const done = itemLessons.filter((lesson) => stats.completed.has(lesson.id)).length;
            return (
              <li key={item.id}>
                <Link
                  to={`/course/${item.id}`}
                  className="block border-b border-border py-4 hover:bg-muted/40"
                >
                  <div className="flex items-baseline justify-between gap-4">
                    <h2 className="text-sm font-medium">{item.title}</h2>
                    <span className="shrink-0 text-xs tabular-nums text-muted-foreground">
                      {done}/{itemLessons.length}
                    </span>
                  </div>
                  <p className="mt-1 text-xs text-muted-foreground">{item.subtitle}</p>
                  <p className="mt-2 max-w-xl text-sm leading-relaxed text-muted-foreground">
                    {item.description}
                  </p>
                </Link>
              </li>
            );
          })}
        </ul>
      </div>
    );
  }

  return (
    <div>
      <Link to="/course" className="text-xs text-muted-foreground underline underline-offset-4">
        Percorsi
      </Link>

      <p className="mt-6 text-xs uppercase tracking-[0.12em] text-muted-foreground">
        {course.weeks.length} settimane
      </p>
      <h1 className="mt-1 text-2xl font-semibold tracking-tight">{course.title}</h1>
      <p className="mt-2 max-w-lg text-sm leading-relaxed text-muted-foreground">{course.description}</p>
      <p className="mt-4 text-xs tabular-nums text-muted-foreground">
        {overview.lessonsCompleted}/{course.weeks.flatMap((week) => week.lessons).length} lezioni complete
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
