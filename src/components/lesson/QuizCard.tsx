import { useState } from 'react';
import { motion } from 'framer-motion';
import { Check, X } from 'lucide-react';
import { toast } from 'sonner';
import type { Lesson, Quiz } from '@/types/course';
import { useAppStore } from '@/app/store';
import { recordQuizAnswer } from '@/app/progress';
import { Card } from '@/components/ui';
import { cn } from '@/lib/utils';

interface QuizCardProps {
  quiz: Quiz;
  lesson: Lesson;
  index: number;
  answeredCorrectly: boolean;
}

export function QuizCard({ quiz, lesson, index, answeredCorrectly }: QuizCardProps) {
  const userId = useAppStore((state) => state.userId);
  const [selected, setSelected] = useState<number | null>(answeredCorrectly ? quiz.correctIndex : null);
  const [solved, setSolved] = useState(answeredCorrectly);
  const [wrongPicks, setWrongPicks] = useState<number[]>([]);

  const choose = async (optionIndex: number) => {
    if (solved || wrongPicks.includes(optionIndex)) return;
    setSelected(optionIndex);
    const correct = optionIndex === quiz.correctIndex;

    if (correct) {
      setSolved(true);
      toast.success('Risposta corretta.', { description: quiz.explanation });
    } else {
      setWrongPicks((current) => [...current, optionIndex]);
      toast('Non ancora: leggi perché.', { description: quiz.options[optionIndex]?.feedback });
    }

    const feedback = await recordQuizAnswer(userId, lesson, quiz, optionIndex, correct);
    for (const achievement of feedback.newAchievements) {
      toast.success(`Achievement: ${achievement.title}`, { description: achievement.description });
    }
  };

  return (
    <Card className="scroll-mt-24 p-5">
      <div className="mb-4 flex items-baseline gap-2">
        <span className="text-xs font-semibold uppercase tracking-[0.12em] text-muted-foreground">
          Domanda {index + 1}
        </span>
        {solved && <Check className="ml-auto h-4 w-4 text-success" aria-hidden />}
      </div>

      <fieldset>
        <legend className="text-base font-medium leading-relaxed">{quiz.question}</legend>

        <div className="mt-4 space-y-2">
          {quiz.options.map((option, optionIndex) => {
            const isCorrect = optionIndex === quiz.correctIndex;
            const chosen = selected === optionIndex;
            const wrong = wrongPicks.includes(optionIndex);
            const reveal = solved || wrong;

            return (
              <motion.button
                key={option.text}
                type="button"
                onClick={() => void choose(optionIndex)}
                disabled={solved || wrong}
                whileTap={{ scale: 0.995 }}
                className={cn(
                  'flex min-h-[44px] w-full items-start gap-3 rounded-md border border-border bg-card px-4 py-3 text-left text-sm leading-relaxed transition-colors',
                  'hover:border-primary/50 hover:bg-accent/40 disabled:cursor-default',
                  reveal && isCorrect && 'border-success/60 bg-success-soft',
                  wrong && 'border-destructive/40 bg-destructive-soft',
                )}
                aria-pressed={chosen}
              >
                <span
                  className={cn(
                    'mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full border text-[0.7rem] font-semibold',
                    reveal && isCorrect && 'border-success bg-success text-success-foreground',
                    wrong && 'border-destructive text-destructive',
                    !reveal && 'border-border text-muted-foreground',
                  )}
                  aria-hidden
                >
                  {reveal && isCorrect ? <Check className="h-3 w-3" /> : wrong ? <X className="h-3 w-3" /> : String.fromCharCode(65 + optionIndex)}
                </span>
                <span>
                  {option.text}
                  {(chosen || reveal) && (
                    <span className="mt-1 block text-xs text-muted-foreground">{option.feedback}</span>
                  )}
                </span>
              </motion.button>
            );
          })}
        </div>
      </fieldset>

      {solved && <p className="mt-4 text-sm leading-relaxed text-muted-foreground">{quiz.explanation}</p>}
    </Card>
  );
}
