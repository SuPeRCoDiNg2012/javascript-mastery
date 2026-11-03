import { useEffect, useMemo, useRef, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { ArrowLeft, ArrowRight, CheckCircle2, Lock, Play } from 'lucide-react';
import { toast } from 'sonner';
import { useAppStore } from '@/app/store';
import {
  completedLessonIds,
  isLessonUnlocked,
  lessonProgress,
  useExplainRows,
  useProgressRows,
  useQuizRows,
} from '@/app/selectors';
import { getLesson, getWeek, nextLesson, previousLesson } from '@/content';
import { refreshLessonCompletion, saveSessionProgress } from '@/app/progress';
import { runJavaScript } from '@/lib/code-runner';
import type { RunResult } from '@/types/runner';
import { Button } from '@/components/ui';
import { CodeEditor } from '@/components/lesson/CodeEditor';
import { OutputPanel } from '@/components/lesson/OutputPanel';
import { ExerciseCard } from '@/components/lesson/ExerciseCard';
import { QuizCard } from '@/components/lesson/QuizCard';
import { ExplainCard } from '@/components/lesson/ExplainCard';
import { ContrastCard } from '@/components/lesson/ContrastCard';
import { RichSections } from '@/components/lesson/RichSections';
import { CommonErrors } from '@/components/lesson/CommonErrors';
import NotFound from './NotFound';

export default function LessonPage() {
  const { lessonId = '' } = useParams();
  const userId = useAppStore((state) => state.userId);
  const lesson = getLesson(lessonId);
  const week = lesson ? getWeek(lesson.weekId) : undefined;

  const rows = useProgressRows(userId);
  const quizRows = useQuizRows(userId);
  const explainRows = useExplainRows(userId);
  const completed = completedLessonIds(rows);

  const secondsRef = useRef(0);
  const scrollRef = useRef(0);

  const progress = lesson ? lessonProgress(lesson, rows, quizRows, explainRows) : null;
  const isComplete = lesson ? completed.has(lesson.id) : false;
  const unlocked = lesson ? isLessonUnlocked(lesson, completed) : false;
  const next = lesson ? nextLesson(lesson.id) : undefined;
  const previous = lesson ? previousLesson(lesson.id) : undefined;

  useEffect(() => {
    if (!lesson) return;
    const interval = window.setInterval(() => {
      secondsRef.current += 1;
    }, 1000);
    return () => {
      window.clearInterval(interval);
      void saveSessionProgress(userId, lesson, secondsRef.current, scrollRef.current);
    };
  }, [lesson, userId]);

  useEffect(() => {
    if (!lesson) return;
    let frame = 0;
    const onScroll = () => {
      if (frame) return;
      frame = window.requestAnimationFrame(() => {
        const doc = document.documentElement;
        const max = doc.scrollHeight - window.innerHeight;
        scrollRef.current = max > 0 ? Math.min(1, window.scrollY / max) : 0;
        frame = 0;
      });
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, [lesson]);

  const missing = useMemo(() => {
    if (!lesson || !progress) return [];
    const items: string[] = [];
    if (progress.exercises < lesson.exercises.length) {
      items.push(`${lesson.exercises.length - progress.exercises} esercizi`);
    }
    if (progress.quizzes < lesson.quizzes.length) {
      items.push(`${lesson.quizzes.length - progress.quizzes} quiz`);
    }
    if (progress.explains < lesson.explains.length) items.push('la spiegazione con parole tue');
    return items;
  }, [lesson, progress]);

  if (!lesson || !week) return <NotFound />;

  if (!unlocked) {
    return (
      <div className="max-w-prose py-10">
        <p className="flex items-center gap-2 text-xs uppercase tracking-[0.12em] text-muted-foreground">
          <Lock className="h-3.5 w-3.5" aria-hidden /> Lezione bloccata
        </p>
        <h1 className="mt-2 text-2xl font-semibold tracking-tight">Prima chiudi la lezione precedente</h1>
        <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
          Il mastery gating evita di accumulare lacune. Non è una scadenza: torna quando vuoi.
        </p>
        <div className="mt-6 flex flex-wrap gap-4 text-sm">
          {previous && (
            <Link to={`/lesson/${previous.id}`} className="underline underline-offset-4">
              Lezione precedente
            </Link>
          )}
          <Link to={`/week/${week.id}`} className="text-muted-foreground underline underline-offset-4">
            Torna alla settimana
          </Link>
        </div>
      </div>
    );
  }

  return (
    <article className="max-w-prose">
      <Link
        to={`/week/${week.id}`}
        className="inline-flex items-center gap-1.5 text-xs text-muted-foreground hover:text-foreground"
      >
        <ArrowLeft className="h-3.5 w-3.5" aria-hidden />
        Settimana {week.number} · {week.title}
      </Link>

      <p className="mt-5 text-xs text-muted-foreground">
        Lezione {lesson.number} · {lesson.minutes} min
        {isComplete ? ' · completata' : ''}
      </p>
      <h1 className="mt-1 text-balance text-2xl font-semibold tracking-tight sm:text-3xl">
        {lesson.title}
      </h1>
      <p className="mt-1.5 text-base text-muted-foreground">{lesson.subtitle}</p>

      <section className="mt-6" aria-labelledby="obiettivi">
        <h2 id="obiettivi" className="text-xs uppercase tracking-[0.12em] text-muted-foreground">
          Alla fine saprai
        </h2>
        <ul className="mt-2 space-y-1">
          {lesson.objectives.map((objective) => (
            <li key={objective} className="text-sm leading-relaxed text-muted-foreground">
              {objective}
            </li>
          ))}
        </ul>
      </section>

      <div className="mt-6 flex items-center gap-3">
        <div className="h-0.5 flex-1 bg-border">
          <div
            className="h-full bg-foreground"
            style={{ width: `${Math.round((progress?.ratio ?? 0) * 100)}%` }}
          />
        </div>
        <span className="text-xs tabular-nums text-muted-foreground">
          {progress?.done ?? 0}/{progress?.total ?? 0}
        </span>
      </div>

      <Section id="attivazione" title="Attivazione">
        <p className="text-base leading-relaxed">{lesson.activation.question}</p>
        <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{lesson.activation.hint}</p>
      </Section>

      {lesson.sections ? (
        <div className="mt-10">
          <RichSections sections={lesson.sections} />
        </div>
      ) : (
        <>
          <Section id="spiegazione" title="Spiegazione concreta">
            <p className="leading-relaxed text-muted-foreground">{lesson.analogy}</p>
            <details className="mt-3 border-l-2 border-border pl-3">
              <summary className="cursor-pointer text-sm font-medium">Formalizzazione</summary>
              <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                {lesson.formalization}
              </p>
            </details>
          </Section>

          <Section id="esempio" title="Esempio lavorato">
            <ExampleRunner code={lesson.exampleCode} output={lesson.exampleOutput} />

            <ol className="mt-6 space-y-3">
              {lesson.worked.steps.map((step, index) => (
                <li key={step.focus} className="flex gap-3">
                  <span className="mt-0.5 text-xs tabular-nums text-muted-foreground">{index + 1}.</span>
                  <div className="min-w-0">
                    <code className="font-mono text-xs">{step.focus}</code>
                    <p className="mt-1 text-sm leading-relaxed text-muted-foreground">
                      {step.explanation}
                    </p>
                  </div>
                </li>
              ))}
            </ol>

            <div className="mt-5 space-y-2">
              <pre className="overflow-x-auto rounded-md bg-code p-3 font-mono text-[0.78rem] leading-relaxed text-code-foreground">
                {lesson.worked.code}
              </pre>
              <pre className="overflow-x-auto rounded-md border border-border bg-muted/50 p-3 font-mono text-[0.75rem] leading-relaxed text-muted-foreground">
                {lesson.worked.output}
              </pre>
            </div>
          </Section>
        </>
      )}

      <Section id="pratica" title="Pratica">
        <p className="text-sm leading-relaxed text-muted-foreground">
          Prima completi, poi segui una traccia, poi scrivi da zero. Gli indizi arrivano solo se servono.
        </p>
        <div className="mt-4 space-y-4">
          {lesson.exercises.map((exercise, index) => {
            const row = rows.find((item) => item.exerciseId === exercise.id);
            return (
              <ExerciseCard
                key={exercise.id}
                exercise={exercise}
                lesson={lesson}
                index={index}
                attempts={row?.attempts ?? 0}
                completed={row?.status === 'completed'}
              />
            );
          })}
        </div>
      </Section>

      <Section
        id="contrasto"
        title={lesson.errors?.length ? 'Errori comuni' : 'Errori tipici'}
      >
        {lesson.errors && lesson.errors.length > 0 ? (
          <CommonErrors errors={lesson.errors} />
        ) : (
          <div className="space-y-3">
            {lesson.contrasts.map((contrast) => (
              <ContrastCard key={contrast.title} contrast={contrast} />
            ))}
          </div>
        )}
      </Section>

      <Section id="spiega" title="Spiega con parole tue">
        <div className="space-y-3">
          {lesson.explains.map((prompt) => (
            <ExplainCard
              key={prompt.id}
              prompt={prompt}
              lesson={lesson}
              completed={explainRows.some((row) => row.explainId === prompt.id && row.completed)}
              initialText={explainRows.find((row) => row.explainId === prompt.id)?.text ?? ''}
            />
          ))}
        </div>
      </Section>

      <Section id="quiz" title="Quiz">
        <div className="space-y-3">
          {lesson.quizzes.map((quiz, index) => (
            <QuizCard
              key={quiz.id}
              quiz={quiz}
              lesson={lesson}
              index={index}
              answeredCorrectly={quizRows.some((row) => row.quizId === quiz.id && row.isCorrect)}
            />
          ))}
        </div>
      </Section>

      <Section id="chiusura" title="Chiusura">
        <ul className="space-y-1.5">
          {lesson.recap.points.map((point) => (
            <li key={point} className="text-sm leading-relaxed">
              {point}
            </li>
          ))}
        </ul>
        <p className="mt-3 text-sm leading-relaxed text-muted-foreground">{lesson.recap.learned}</p>
        <p className="mt-3 border-l-2 border-border pl-3 text-sm leading-relaxed">
          <span className="font-medium">Prossimo passo:</span> {lesson.recap.next}
        </p>

        {lesson.project && (
          <div className="mt-8 border-t border-border pt-4">
            <h3 className="text-sm font-medium">Mini-progetto · {lesson.project.title}</h3>
            <p className="mt-1 text-sm leading-relaxed text-muted-foreground">
              {lesson.project.brief}
            </p>
            <ol className="mt-2 space-y-1">
              {lesson.project.steps.map((step) => (
                <li key={step} className="text-sm leading-relaxed text-muted-foreground">
                  {step}
                </li>
              ))}
            </ol>
            {lesson.project.starterCode && (
              <pre className="mt-3 overflow-x-auto rounded-md bg-code p-3 font-mono text-[0.78rem] leading-relaxed text-code-foreground">
                {lesson.project.starterCode}
              </pre>
            )}
          </div>
        )}

        {lesson.consolidate && (
          <p className="mt-6 border-l-2 border-border pl-3 text-sm leading-relaxed">
            {lesson.consolidate}
          </p>
        )}
      </Section>

      <div className="mt-10 border-t border-border pt-5">
        {isComplete ? (
          <div className="flex flex-wrap items-center justify-between gap-3">
            <p className="flex items-center gap-2 text-sm text-muted-foreground">
              <CheckCircle2 className="h-4 w-4" aria-hidden />
              Lezione completata.
            </p>
            {next && (
              <Button asChild size="sm">
                <Link to={`/lesson/${next.id}`}>
                  Prossima lezione
                  <ArrowRight className="h-3.5 w-3.5" aria-hidden />
                </Link>
              </Button>
            )}
          </div>
        ) : (
          <div>
            <p className="text-sm text-muted-foreground">
              {missing.length > 0
                ? `Per sbloccare la prossima: ${missing.join(', ')}.`
                : 'Tutto fatto: conferma per registrare il completamento.'}
            </p>
            <Button
              className="mt-3"
              size="sm"
              variant="outline"
              disabled={missing.length > 0}
              onClick={async () => {
                const result = await refreshLessonCompletion(userId, lesson);
                if (result.completed) {
                  toast.success('Lezione completata.');
                } else {
                  toast('Manca ancora qualche passaggio.');
                }
              }}
            >
              Segna come completata
            </Button>
          </div>
        )}
      </div>
    </article>
  );
}

function Section({
  id,
  title,
  children,
}: {
  id: string;
  title: string;
  children: React.ReactNode;
}) {
  return (
    <section id={id} className="mt-10 scroll-mt-20">
      <h2 className="mb-3 text-lg font-semibold tracking-tight">{title}</h2>
      {children}
    </section>
  );
}

function ExampleRunner({ code, output }: { code: string; output: string }) {
  const [value, setValue] = useState(code);
  const [result, setResult] = useState<RunResult | null>(null);
  const [running, setRunning] = useState(false);

  return (
    <div className="mt-3 space-y-2">
      <CodeEditor value={value} onChange={setValue} ariaLabel="Esempio eseguibile" minHeight="150px" />
      <div className="flex items-center gap-3">
        <Button
          size="sm"
          onClick={async () => {
            setRunning(true);
            setResult(await runJavaScript(value));
            setRunning(false);
          }}
          disabled={running}
        >
          <Play className="h-3.5 w-3.5" aria-hidden />
          {running ? 'Esecuzione…' : 'Esegui'}
        </Button>
        <span className="text-xs text-muted-foreground">Sandbox usa e getta: puoi modificarlo.</span>
      </div>
      <OutputPanel result={result} running={running} expected={output} />
    </div>
  );
}
