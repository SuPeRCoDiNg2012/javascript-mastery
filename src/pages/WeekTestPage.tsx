import { useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { ArrowLeft, ArrowRight, CheckCircle2, Lock, ShieldCheck, X } from 'lucide-react';
import { toast } from 'sonner';
import { useAppStore } from '@/app/store';
import { useWeekTestState } from '@/app/selectors';
import { markWeekTest } from '@/app/progress';
import { Badge, Button, Card, CardContent, Progress } from '@/components/ui';
import { PageHeader } from '@/components/layout/PageHeader';
import { cn } from '@/lib/utils';
import NotFound from './NotFound';

export default function WeekTestPage() {
  const { weekId = '' } = useParams();
  const userId = useAppStore((state) => state.userId);
  const { week, test, unlocked, attempts, passed } = useWeekTestState(userId, weekId);
  const [answers, setAnswers] = useState<Record<string, number>>({});
  const [submitted, setSubmitted] = useState(false);
  const [result, setResult] = useState<{ correct: number; total: number } | null>(null);

  if (!week) return <NotFound />;

  const remaining = test.filter((question) => answers[question.id] === undefined).length;
  const correctCount = test.filter((question) => answers[question.id] === question.quiz.correctIndex).length;
  const percent = test.length === 0 ? 0 : Math.round((correctCount / test.length) * 100);

  const submit = async () => {
    if (remaining > 0) {
      toast('Rispondi a tutte le domande.', { description: `Ne mancano ${remaining}.` });
      return;
    }
    const feedback = await markWeekTest(userId, week.id, correctCount, test.length);
    setResult({ correct: correctCount, total: test.length });
    setSubmitted(true);
    toast[feedback.passed ? 'success' : 'message'](
      feedback.passed ? 'Checkpoint superato.' : 'Checkpoint completato.',
      {
        description: feedback.passed
          ? 'Puoi passare alla prossima settimana quando vuoi.'
          : 'Rileggi le spiegazioni delle domande sbagliate: è lì che c’è il valore.',
      },
    );
    for (const achievement of feedback.newAchievements) {
      toast.success(`Achievement: ${achievement.title}`, { description: achievement.description });
    }
  };

  if (!unlocked) {
    return (
      <div className="mx-auto max-w-prose py-10 text-center">
        <span className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-muted">
          <Lock className="h-5 w-5" aria-hidden />
        </span>
        <h1 className="mt-4 text-2xl font-semibold tracking-tight">Checkpoint non ancora disponibile</h1>
        <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
          Si sblocca quando tutte le otto lezioni della settimana sono complete. Non è un esame: è un
          controllo onesto di cosa è rimasto.
        </p>
        <Button className="mt-5" asChild>
          <Link to={`/week/${week.id}`}>Torna alla settimana</Link>
        </Button>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-prose animate-rise">
      <Link
        to={`/week/${week.id}`}
        className="mb-4 inline-flex items-center gap-1.5 text-xs font-medium text-muted-foreground hover:text-foreground"
      >
        <ArrowLeft className="h-3.5 w-3.5" aria-hidden />
        Settimana {week.number}
      </Link>

      <PageHeader
        eyebrow={`Checkpoint · Settimana ${week.number}`}
        title="Otto domande, nessuna fretta"
        description="Una domanda per lezione. Se qualcosa non torna, il feedback dice dove rileggere. Puoi riprovare quando vuoi."
        actions={
          passed ? (
            <Badge variant="success">Superato</Badge>
          ) : attempts > 0 ? (
            <Badge variant="secondary">{attempts} tentativi</Badge>
          ) : null
        }
      />

      {submitted && result && (
        <Card className={cn('mb-5', result.correct / result.total >= 0.8 ? 'border-success/40' : 'border-warning/40')}>
          <CardContent className="p-5">
            <div className="flex items-center gap-3">
              <span className="flex h-10 w-10 items-center justify-center rounded-full bg-primary-soft">
                <ShieldCheck className="h-5 w-5 text-primary" aria-hidden />
              </span>
              <div className="min-w-0 flex-1">
                <p className="text-sm font-semibold">
                  {result.correct}/{result.total} corrette · {percent}%
                </p>
                <p className="text-xs text-muted-foreground">
                  {percent >= 80
                    ? 'Sopra la soglia dell’80%. Puoi proseguire.'
                    : 'Sotto la soglia dell’80%: rivedi le lezioni indicate e riprova. Nessuna penalità.'}
                </p>
              </div>
            </div>
            <Progress value={percent} className="mt-3" tone={percent >= 80 ? 'success' : 'primary'} />
          </CardContent>
        </Card>
      )}

      <ol className="space-y-4">
        {test.map((question, index) => {
          const selected = answers[question.id];
          const isCorrect = selected === question.quiz.correctIndex;

          return (
            <li key={question.id}>
              <Card className="p-5">
                <p className="text-xs text-muted-foreground">
                  {index + 1}. Dalla lezione “{question.lessonTitle}”
                </p>
                <fieldset className="mt-2">
                  <legend className="text-sm font-medium leading-relaxed">{question.quiz.question}</legend>
                  <div className="mt-3 space-y-2">
                    {question.quiz.options.map((option, optionIndex) => {
                      const chosen = selected === optionIndex;
                      const showCorrect = submitted && optionIndex === question.quiz.correctIndex;
                      const showWrong = submitted && chosen && !isCorrect;
                      return (
                        <label
                          key={option.text}
                          className={cn(
                            'flex min-h-[44px] cursor-pointer items-start gap-3 rounded-md border border-border px-4 py-2.5 text-sm leading-relaxed transition-colors',
                            chosen && !submitted && 'border-primary/60 bg-primary-soft/50',
                            showCorrect && 'border-success/60 bg-success-soft',
                            showWrong && 'border-destructive/40 bg-destructive-soft',
                            submitted && 'cursor-default',
                          )}
                        >
                          <input
                            type="radio"
                            name={question.id}
                            className="mt-1 h-4 w-4 accent-[hsl(var(--primary))]"
                            checked={chosen}
                            disabled={submitted}
                            onChange={() => setAnswers((current) => ({ ...current, [question.id]: optionIndex }))}
                          />
                          <span>
                            {option.text}
                            {submitted && (chosen || optionIndex === question.quiz.correctIndex) && (
                              <span className="mt-1 block text-xs text-muted-foreground">{option.feedback}</span>
                            )}
                          </span>
                          {showCorrect && <CheckCircle2 className="ml-auto mt-0.5 h-4 w-4 shrink-0 text-success" aria-hidden />}
                          {showWrong && <X className="ml-auto mt-0.5 h-4 w-4 shrink-0 text-destructive" aria-hidden />}
                        </label>
                      );
                    })}
                  </div>
                </fieldset>
                {submitted && (
                  <p className="mt-3 rounded-md bg-muted/60 px-3 py-2 text-xs leading-relaxed text-muted-foreground">
                    {question.quiz.explanation}
                  </p>
                )}
              </Card>
            </li>
          );
        })}
      </ol>

      <div className="mt-6 flex flex-wrap items-center gap-3">
        {!submitted ? (
          <>
            <Button onClick={() => void submit()} disabled={remaining > 0}>
              Consegna il checkpoint
            </Button>
            <span className="text-xs text-muted-foreground">
              {remaining > 0 ? `Mancano ${remaining} risposte` : 'Tutte le risposte sono state date'}
            </span>
          </>
        ) : (
          <>
            <Button
              variant="outline"
              onClick={() => {
                setAnswers({});
                setSubmitted(false);
                setResult(null);
              }}
            >
              Riprova
            </Button>
            <Button asChild>
              <Link to={`/week/${week.id}`}>
                Torna alla settimana
                <ArrowRight className="h-4 w-4" aria-hidden />
              </Link>
            </Button>
          </>
        )}
      </div>
    </div>
  );
}
