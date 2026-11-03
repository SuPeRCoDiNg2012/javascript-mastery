import { AlertTriangle, CheckCircle2, Terminal } from 'lucide-react';
import type { RunResult } from '@/types/runner';
import { cn } from '@/lib/utils';

interface OutputPanelProps {
  result: RunResult | null;
  running?: boolean;
  expected?: string | null;
  className?: string;
}

export function OutputPanel({ result, running = false, expected, className }: OutputPanelProps) {
  const ok = result && !result.error && !result.timedOut;

  return (
    <div className={cn('overflow-hidden rounded-md border border-border bg-code text-code-foreground', className)}>
      <div className="flex items-center justify-between border-b border-border px-3 py-2 text-[0.7rem] uppercase tracking-[0.12em] text-code-foreground/60">
        <span className="flex items-center gap-1.5">
          <Terminal className="h-3.5 w-3.5" aria-hidden />
          Output
        </span>
        {result && !running && (
          <span className="normal-case tracking-normal text-code-foreground/50">{result.durationMs} ms</span>
        )}
      </div>

      <div
        className="max-h-64 min-h-[72px] overflow-auto px-3 py-2 font-mono text-[0.8125rem] leading-relaxed"
        aria-live="polite"
        aria-atomic="true"
      >
        {running && <p className="text-code-foreground/50">Esecuzione…</p>}

        {!running && !result && (
          <p className="text-code-foreground/40">Esegui il codice per vedere l’output.</p>
        )}

        {!running && result?.timedOut && (
          <p className="flex items-start gap-2 text-warning">
            <AlertTriangle className="mt-0.5 h-4 w-4 shrink-0" aria-hidden />
            {result.message ?? 'Attenzione: possibile ciclo infinito.'}
          </p>
        )}

        {!running && result?.error && (
          <pre className="whitespace-pre-wrap text-destructive">
            <span className="text-destructive">{result.error}</span>
          </pre>
        )}

        {!running && ok && result.logs.length === 0 && (
          <p className="text-code-foreground/40">Nessun output: usa console.log per vedere i valori.</p>
        )}

        {!running &&
          result?.logs.map((line, index) => (
            <pre key={`${index}-${line}`} className="whitespace-pre-wrap text-code-foreground">
              {line}
            </pre>
          ))}

        {!running && ok && expected && (
          <p className="mt-2 flex items-center gap-1.5 border-t border-border pt-2 text-xs text-code-foreground/50">
            <CheckCircle2 className="h-3.5 w-3.5" aria-hidden />
            Output atteso: <code className="font-mono">{expected.split('\n').join(' · ')}</code>
          </p>
        )}
      </div>
    </div>
  );
}
