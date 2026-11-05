import { useMemo, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { Check, Eye, Lightbulb, Loader2, Play, RotateCcw } from 'lucide-react';
import { toast } from 'sonner';
import type { Exercise, Lesson } from '@/types/course';
import type { RunResult } from '@/types/runner';
import { runJavaScript } from '@/lib/code-runner';
import { runDomJavaScript } from '@/lib/dom-runner';
import { checkOutput } from './run-helpers';
import { useAppStore } from '@/app/store';
import { recordExerciseAttempt } from '@/app/progress';
import { Badge, Button, Card } from '@/components/ui';
import { CodeEditor } from './CodeEditor';
import { OutputPanel } from './OutputPanel';
import { cn } from '@/lib/utils';

const kindLabels: Record<Exercise['kind'], string> = {
  fill: 'Completa',
  guided: 'Con traccia',
  solo: 'Da zero',
  transfer: 'Transfer',
};

interface ExerciseCardProps {
  exercise: Exercise;
  lesson: Lesson;
  index: number;
  attempts: number;
  completed: boolean;
}

/**
 * Six-step error ladder, as specified by the course standard:
 * 1 gentle retry → 2 concept hint → 3 specific hint → 4 precise pointer →
 * 5 unrevealed solution → 6 no judgment, spaced review later.
 */
export function ExerciseCard({ exercise, lesson, index, attempts, completed }: ExerciseCardProps) {
  const userId = useAppStore((state) => state.userId);
  const [code, setCode] = useState(exercise.starterCode);
  const [result, setResult] = useState<RunResult | null>(null);
  const [running, setRunning] = useState(false);
  const [showSolution, setShowSolution] = useState(false);
  const [usedSolution, setUsedSolution] = useState(false);
  const [wrongAttempts, setWrongAttempts] = useState(attempts > 0 && !completed ? Math.min(attempts, 4) : 0);
  const [lastDiagnosis, setLastDiagnosis] = useState<string | null>(null);
  const [passed, setPassed] = useState(completed);
  const manual = exercise.check.kind === 'manual';
  const checklist = exercise.check.kind === 'manual' ? exercise.check.checklist : [];
  const [checked, setChecked] = useState<boolean[]>(() =>
    checklist.map(() => completed),
  );

  const failures = wrongAttempts;
  const canReveal = failures >= 5;
  const isReview = Boolean(exercise.reviewOf);

  const expected = useMemo(
    () => (exercise.check.kind === 'output' ? exercise.check.lines.join('\n') : null),
    [exercise.check],
  );

  const reset = () => {
    setCode(exercise.starterCode);
    setResult(null);
    setLastDiagnosis(null);
  };

  const completeManual = async () => {
    if (!checked.every(Boolean)) return;
    setPassed(true);
    toast.success('Esercizio completato.', {
      description: 'La verifica è nelle tue mani: hai controllato ogni punto.',
    });
    const feedback = await recordExerciseAttempt(userId, lesson, exercise, true);
    for (const achievement of feedback.newAchievements) {
      toast.success(`Achievement: ${achievement.title}`, { description: achievement.description });
    }
    if (feedback.lessonCompleted) {
      toast.success('Lezione completata', {
        description: 'Tutti gli esercizi, quiz e spiegazioni sono a posto.',
      });
    }
  };

  const run = async () => {
    setRunning(true);
    try {
      const runnerResult =
        exercise.runtime === 'dom' ? await runDomJavaScript(code) : await runJavaScript(code);
      setResult(runnerResult);

      const outcome = checkOutput(exercise, runnerResult, code);
      if (outcome.passed) {
        setPassed(true);
        setShowSolution(false);
        toast.success('Ottimo, esercizio completato.', {
          description: usedSolution
            ? 'Hai usato la soluzione: domani riprovalo senza guardare, così il concetto si fissa.'
            : 'Un passo concreto avanti. Continua quando vuoi.',
        });
      } else {
        const nextFailures = failures + 1;
        setWrongAttempts(nextFailures);
        setLastDiagnosis(outcome.message);
        toast(
          nextFailures >= 5
            ? 'Va bene, capita.'
            : nextFailures >= 4
              ? 'Ci sei quasi.'
              : nextFailures >= 3
                ? 'Ancora no.'
                : nextFailures >= 2
                  ? 'Non è ancora giusto.'
                  : 'Riprova.',
          { description: outcome.message },
        );
      }

      const feedback = await recordExerciseAttempt(userId, lesson, exercise, outcome.passed);
      for (const achievement of feedback.newAchievements) {
        toast.success(`Achievement: ${achievement.title}`, { description: achievement.description });
      }
      if (feedback.lessonCompleted) {
        toast.success('Lezione completata', { description: 'Tutti gli esercizi, quiz e spiegazioni sono a posto.' });
      }
    } catch {
      toast.error('La sandbox non ha risposto. Riprova tra un istante.');
    } finally {
      setRunning(false);
    }
  };

  const ladder = (() => {
    if (failures === 0) return null;
    if (usedSolution) {
      return {
        tone: 'neutral' as const,
        title: 'Nessun giudizio',
        text: 'Ripassa la soluzione e riprova quando vuoi. Oppure passa avanti: tornerai su questo concetto nel ripasso a intervalli.',
      };
    }
    if (failures === 1) {
      return {
        tone: 'neutral' as const,
        title: 'Riprova',
        text: 'Guarda bene il messaggio d’errore (se c’è) e l’obiettivo dell’esercizio. Se ti serve, rileggi la sezione qui sopra.',
      };
    }
    if (failures === 2) {
      return {
        tone: 'info' as const,
        title: 'Indizio sul concetto',
        text: exercise.hints[0],
      };
    }
    if (failures === 3) {
      return {
        tone: 'info' as const,
        title: 'Indizio specifico',
        text: `${exercise.hints[1]} Prova a correggere solo quel pezzo, non riscrivere tutto.`,
      };
    }
    if (failures === 4) {
      return {
        tone: 'warning' as const,
        title: 'Il problema è qui',
        text: lastDiagnosis ?? 'Confronta riga per riga con l’output atteso: la differenza è più piccola di quanto sembri.',
      };
    }
    return {
      tone: 'warning' as const,
      title: 'Mostra soluzione disponibile',
      text: 'Studiala con calma, poi riscrivila senza guardare. Imparare dalla soluzione è una tecnica valida, non un fallimento.',
    };
  })();

  return (
    <Card id={exercise.id} className={cn('scroll-mt-24 overflow-hidden', passed && 'border-success/40')}>
      <div className="flex flex-wrap items-center gap-2 border-b border-border px-5 py-3">
        <Badge variant="secondary">Esercizio {index + 1}</Badge>
        <Badge variant="outline">{kindLabels[exercise.kind]}</Badge>
        {isReview && <Badge variant="warning">Ripasso</Badge>}
        {passed && (
          <Badge variant="success" className="ml-auto">
            <Check className="h-3 w-3" aria-hidden /> Completato
          </Badge>
        )}
      </div>

      <div className="space-y-4 p-5">
        <div>
          <h3 className="text-base font-semibold tracking-tight">{exercise.title}</h3>
          <p className="mt-1.5 text-sm leading-relaxed text-muted-foreground">{exercise.prompt}</p>
          {exercise.objective && (
            <p className="mt-2 text-xs text-muted-foreground/80">
              <span className="font-medium text-foreground/70">Obiettivo:</span> {exercise.objective}
            </p>
          )}
        </div>

        {manual ? (
          <div className="space-y-3">
            <ul className="divide-y divide-border rounded-md border border-border">
              {checklist.map((item, checkIndex) => (
                <li key={item}>
                  <label className="flex min-h-[44px] cursor-pointer items-start gap-3 px-4 py-3 text-sm leading-relaxed">
                    <input
                      type="checkbox"
                      className="mt-1 h-4 w-4 accent-[hsl(var(--primary))]"
                      checked={checked[checkIndex] ?? false}
                      disabled={passed}
                      onChange={(event) =>
                        setChecked((current) =>
                          current.map((value, index) =>
                            index === checkIndex ? event.target.checked : value,
                          ),
                        )
                      }
                    />
                    <span>{item}</span>
                  </label>
                </li>
              ))}
            </ul>

            <div className="flex flex-wrap items-center gap-2">
              <Button
                onClick={() => void completeManual()}
                disabled={!checked.every(Boolean) || passed}
              >
                {passed ? 'Completato' : 'Segna come completato'}
              </Button>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setShowSolution((value) => !value)}
              >
                <Eye className="h-3.5 w-3.5" aria-hidden />
                Vedi procedura
              </Button>
              {!checked.every(Boolean) && (
                <span className="text-xs text-muted-foreground">
                  Spunta ogni punto quando l’hai verificato nell’app.
                </span>
              )}
            </div>

            <details className="rounded-md border border-border bg-muted/30 px-4 py-3 text-sm leading-relaxed">
              <summary className="cursor-pointer text-xs font-medium">Indizi</summary>
              <p className="mt-2 text-muted-foreground">{exercise.hints[0]}</p>
              <p className="mt-1 text-muted-foreground">{exercise.hints[1]}</p>
            </details>
          </div>
        ) : (
          <>
            <CodeEditor value={code} onChange={setCode} ariaLabel={`Codice per ${exercise.title}`} minHeight="170px" />

            <div className="flex flex-wrap items-center gap-2">
              <Button onClick={() => void run()} disabled={running} aria-label="Esegui il codice">
                {running ? <Loader2 className="h-4 w-4 animate-spin" aria-hidden /> : <Play className="h-4 w-4" aria-hidden />}
                {running ? 'Esecuzione…' : 'Esegui'}
              </Button>
              <Button variant="ghost" size="sm" onClick={reset}>
                <RotateCcw className="h-3.5 w-3.5" aria-hidden />
                Ripristina
              </Button>
              {failures > 0 && (
                <Badge variant="warning" className="gap-1">
                  <Lightbulb className="h-3 w-3" aria-hidden />
                  {failures} {failures === 1 ? 'tentativo' : 'tentativi'}
                </Badge>
              )}
              {canReveal && (
                <Button
                  variant={showSolution ? 'ghost' : 'outline'}
                  size="sm"
                  className={cn('ml-auto', !showSolution && 'border-primary text-primary')}
                  onClick={() => {
                    setShowSolution((value) => !value);
                    setUsedSolution(true);
                  }}
                >
                  <Eye className="h-3.5 w-3.5" aria-hidden />
                  Mostra soluzione
                </Button>
              )}
            </div>
          </>
        )}

        {ladder && (
          <div
            className={cn(
              'rounded-md border px-4 py-3 text-sm leading-relaxed',
              ladder.tone === 'info' && 'border-primary/25 bg-primary-soft/40',
              ladder.tone === 'warning' && 'border-warning/30 bg-warning-soft/50',
              ladder.tone === 'neutral' && 'border-border bg-muted/40',
            )}
            aria-live="polite"
          >
            <p className="mb-0.5 text-xs font-semibold uppercase tracking-[0.1em] text-muted-foreground">
              {ladder.title}
            </p>
            <p>{ladder.text}</p>
            {failures >= 4 && !usedSolution && lastDiagnosis && failures === 4 && (
              <p className="mt-1.5 text-xs text-muted-foreground">{lastDiagnosis}</p>
            )}
          </div>
        )}

        {!manual && <OutputPanel result={result} running={running} expected={expected} />}

        <AnimatePresence>
          {showSolution && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              className="overflow-hidden"
            >
              <div className="rounded-md border border-border bg-muted/40 p-4">
                <p className="mb-2 text-xs font-semibold uppercase tracking-[0.12em] text-muted-foreground">
                  Una soluzione possibile
                </p>
                <pre className="overflow-x-auto whitespace-pre-wrap font-mono text-[0.8rem] leading-relaxed">
                  {exercise.solution}
                </pre>
                <p className="mt-3 text-sm leading-relaxed text-muted-foreground">{exercise.explanation}</p>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {passed && (manual || result) && (
          <p className="flex items-start gap-2 rounded-md bg-success-soft px-3 py-2 text-sm text-success">
            <Check className="mt-0.5 h-4 w-4 shrink-0" aria-hidden />
            {exercise.explanation}
          </p>
        )}
      </div>
    </Card>
  );
}
