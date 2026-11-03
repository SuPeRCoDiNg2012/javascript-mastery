import { AlertTriangle, Check, Search } from 'lucide-react';
import type { LessonError } from '@/types/course';
import { RichText } from './RichText';

/**
 * The five-part error card required by the course standard:
 * wrong code → real message → why → fix → how to recognise it next time.
 * Errors are teaching material, never a verdict.
 */
export function CommonErrors({ errors }: { errors: LessonError[] }) {
  return (
    <div className="space-y-4">
      {errors.map((error, index) => (
        <article key={error.title} className="overflow-hidden rounded-lg border border-border bg-card">
          <header className="flex items-center gap-2 border-b border-border bg-warning-soft/40 px-4 py-2.5">
            <AlertTriangle className="h-4 w-4 shrink-0 text-warning" aria-hidden />
            <h3 className="text-sm font-semibold">
              Errore {index + 1}: {error.title}
            </h3>
          </header>

          <div className="grid gap-0 sm:grid-cols-2">
            <div className="border-b border-border p-4 sm:border-b-0 sm:border-r">
              <p className="mb-1.5 text-[0.7rem] font-semibold uppercase tracking-[0.1em] text-destructive">
                Codice sbagliato
              </p>
              <pre className="overflow-x-auto rounded-md bg-code p-3 font-mono text-[0.76rem] leading-relaxed text-code-foreground">
                {error.badCode}
              </pre>
              <p className="mb-1.5 mt-3 text-[0.7rem] font-semibold uppercase tracking-[0.1em] text-muted-foreground">
                Messaggio del computer
              </p>
              <pre className="overflow-x-auto rounded-md border border-destructive/20 bg-destructive-soft px-3 py-2 font-mono text-[0.74rem] text-destructive">
                {error.message}
              </pre>
            </div>

            <div className="p-4">
              <p className="mb-1.5 text-[0.7rem] font-semibold uppercase tracking-[0.1em] text-muted-foreground">
                Perché è sbagliato
              </p>
              <p className="text-sm leading-relaxed text-muted-foreground">
                <RichText text={error.why} />
              </p>
            </div>
          </div>

          <div className="border-t border-border p-4">
            <p className="mb-1.5 flex items-center gap-1.5 text-[0.7rem] font-semibold uppercase tracking-[0.1em] text-success">
              <Check className="h-3 w-3" aria-hidden />
              Come si corregge
            </p>
            <pre className="overflow-x-auto rounded-md bg-success-soft p-3 font-mono text-[0.76rem] leading-relaxed text-success">
              {error.fix}
            </pre>
          </div>

          <div className="border-t border-border bg-muted/30 px-4 py-3">
            <p className="flex items-center gap-1.5 text-[0.7rem] font-semibold uppercase tracking-[0.1em] text-muted-foreground">
              <Search className="h-3 w-3" aria-hidden />
              Come riconoscerlo la prossima volta
            </p>
            <p className="mt-1 text-sm leading-relaxed">
              <RichText text={error.recognize} />
            </p>
          </div>
        </article>
      ))}
    </div>
  );
}
