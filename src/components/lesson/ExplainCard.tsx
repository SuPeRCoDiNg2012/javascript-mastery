import { useState } from 'react';
import { toast } from 'sonner';
import type { ExplainPrompt, Lesson } from '@/types/course';
import { useAppStore } from '@/app/store';
import { keywordMatches, recordExplain } from '@/app/progress';
import { Badge, Button, Card, Textarea } from '@/components/ui';

interface ExplainCardProps {
  prompt: ExplainPrompt;
  lesson: Lesson;
  completed: boolean;
  initialText?: string;
}

export function ExplainCard({ prompt, lesson, completed, initialText = '' }: ExplainCardProps) {
  const userId = useAppStore((state) => state.userId);
  const [text, setText] = useState(initialText);
  const [submitted, setSubmitted] = useState(completed);
  const [matched, setMatched] = useState<string[]>([]);
  const [missing, setMissing] = useState<string[]>([]);

  const localMatches = keywordMatches(text, prompt.keywords)
  const remainingChars = Math.max(0, prompt.minChars - text.trim().length);

  const submit = async () => {
    if (text.trim().length < 10) {
      toast('Aggiungi qualche parola in più.', { description: 'Una frase basta: scrivi come lo spiegheresti a un amico.' });
      return;
    }

    const result = await recordExplain(userId, lesson, prompt, text);
    setMatched(result.matched);
    setMissing(prompt.keywords.filter((keyword) => !result.matched.includes(keyword)).slice(0, 3));
    setSubmitted(result.completed);

    if (result.completed) {
      toast.success('Spiegazione salvata.', { description: 'Spiegare con parole proprie è il test più onesto.' });
    } else {
      toast('Ci sei quasi.', {
        description: result.matched.length > 0
          ? `Hai menzionato: ${result.matched.join(', ')}. Prova ad aggiungere: ${prompt.keywords.filter((k) => !result.matched.includes(k)).slice(0, 2).join(', ')}.`
          : 'Prova a nominare il concetto e a dire a cosa serve.',
      });
    }

    for (const achievement of result.newAchievements) {
      toast.success(`Achievement: ${achievement.title}`, { description: achievement.description });
    }
  };

  return (
    <Card className="scroll-mt-24 p-5">
      <div className="mb-3 flex flex-wrap items-center gap-2">
        <Badge variant="secondary">Spiega con parole tue</Badge>
        {submitted && <Badge variant="success">Salvata</Badge>}
      </div>

      <h3 className="text-base font-medium leading-relaxed">{prompt.prompt}</h3>
      <p className="mt-1 text-xs text-muted-foreground">
        Non serve una definizione perfetta: scrivi cosa fa e perché conta.
      </p>

      <label htmlFor={`explain-${prompt.id}`} className="sr-only">
        La tua spiegazione
      </label>
      <Textarea
        id={`explain-${prompt.id}`}
        className="mt-3 min-h-[140px]"
        value={text}
        onChange={(event) => setText(event.target.value)}
        placeholder="Con parole mie, questo concetto serve a…"
        aria-describedby={`explain-help-${prompt.id}`}
      />
      <div id={`explain-help-${prompt.id}`} className="mt-1.5 flex items-center justify-between text-xs text-muted-foreground">
        <span>{text.trim().length} caratteri</span>
        {remainingChars > 0 ? <span>Ancora {remainingChars} per il minimo</span> : <span>Lunghezza sufficiente</span>}
      </div>

      <div className="mt-3 flex flex-wrap items-center gap-2">
        <Button onClick={() => void submit()}>{submitted ? 'Aggiorna spiegazione' : 'Verifica spiegazione'}</Button>
        {localMatches.length > 0 && (
          <span className="text-xs text-muted-foreground">
            Concetti menzionati: {localMatches.slice(0, 4).join(', ')}
          </span>
        )}
      </div>

      {submitted && (
        <div className="mt-4 space-y-2 rounded-md bg-muted/50 p-4 text-sm leading-relaxed">
          {matched.length > 0 && (
            <p>
              <span className="font-medium">Hai menzionato:</span> {matched.join(', ')}.
            </p>
          )}
          {missing.length > 0 && (
            <p className="text-muted-foreground">
              <span className="font-medium text-foreground/80">Potresti aggiungere:</span> {missing.join(', ')}.
            </p>
          )}
          <details className="pt-1">
            <summary className="cursor-pointer text-xs font-medium text-primary">Confronta con una spiegazione modello</summary>
            <p className="mt-2 text-muted-foreground">{prompt.modelAnswer}</p>
          </details>
        </div>
      )}
    </Card>
  );
}
