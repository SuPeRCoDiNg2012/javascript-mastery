import { useState } from 'react';
import { Loader2, Play } from 'lucide-react';
import type { LessonCodeSample } from '@/types/course';
import type { RunResult } from '@/types/runner';
import { runJavaScript } from '@/lib/code-runner';
import { Button } from '@/components/ui';
import { OutputPanel } from './OutputPanel';
import { RichText } from './RichText';

/**
 * A code block that can actually be executed. Examples in the text are not
 * decoration: the reader can run them, change them and see what happens.
 */
export function CodeSample({ sample }: { sample: LessonCodeSample }) {
  const [result, setResult] = useState<RunResult | null>(null);
  const [running, setRunning] = useState(false);
  const runnable = sample.runnable !== false;

  return (
    <figure className="my-4 overflow-hidden rounded-lg border border-border bg-card">
      {sample.title && (
        <figcaption className="border-b border-border bg-muted/40 px-4 py-2 text-xs font-semibold uppercase tracking-[0.1em] text-muted-foreground">
          {sample.title}
        </figcaption>
      )}

      <pre className="overflow-x-auto bg-code p-4 font-mono text-[0.8rem] leading-relaxed text-code-foreground">
        <code>{sample.code}</code>
      </pre>

      {sample.output && (
        <div className="border-t border-border bg-muted/40 px-4 py-2">
          <p className="text-[0.7rem] font-semibold uppercase tracking-[0.1em] text-muted-foreground">Output</p>
          <pre className="mt-1 overflow-x-auto font-mono text-[0.78rem] leading-relaxed text-foreground/80">
            {sample.output}
          </pre>
        </div>
      )}

      {sample.note && (
        <p className="border-t border-border px-4 py-2 text-sm leading-relaxed text-muted-foreground">
          <RichText text={sample.note} />
        </p>
      )}

      {runnable && (
        <div className="border-t border-border px-4 py-2">
          <Button
            size="sm"
            variant="ghost"
            disabled={running}
            onClick={async () => {
              setRunning(true);
              setResult(await runJavaScript(sample.code));
              setRunning(false);
            }}
          >
            {running ? <Loader2 className="h-3.5 w-3.5 animate-spin" aria-hidden /> : <Play className="h-3.5 w-3.5" aria-hidden />}
            {running ? 'Esecuzione…' : 'Esegui questo esempio'}
          </Button>
          {result && <OutputPanel result={result} className="mt-2" />}
        </div>
      )}
    </figure>
  );
}
