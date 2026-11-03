import { AlertTriangle, ArrowRight } from 'lucide-react';
import type { Contrast } from '@/types/course';
import { Card } from '@/components/ui';

export function ContrastCard({ contrast }: { contrast: Contrast }) {
  return (
    <Card className="overflow-hidden border-warning/30">
      <div className="flex items-center gap-2 border-b border-border bg-warning-soft px-5 py-3 text-sm font-medium text-warning">
        <AlertTriangle className="h-4 w-4" aria-hidden />
        {contrast.title}
      </div>

      <div className="grid gap-4 p-5 sm:grid-cols-2">
        <div>
          <p className="mb-2 text-xs font-semibold uppercase tracking-[0.12em] text-muted-foreground">
            Cosa succede se sbagli
          </p>
          <pre className="overflow-x-auto rounded-md bg-code p-3 font-mono text-[0.78rem] leading-relaxed text-code-foreground">
            {contrast.brokenCode}
          </pre>
          <p className="mt-2 rounded bg-destructive-soft px-2 py-1.5 font-mono text-[0.72rem] text-destructive">
            {contrast.errorMessage}
          </p>
        </div>

        <div>
          <p className="mb-2 text-xs font-semibold uppercase tracking-[0.12em] text-muted-foreground">
            Perché è sbagliato
          </p>
          <p className="text-sm leading-relaxed text-muted-foreground">{contrast.why}</p>
          <div className="mt-3 flex items-start gap-2 rounded-md bg-success-soft px-3 py-2">
            <ArrowRight className="mt-1 h-3.5 w-3.5 shrink-0 text-success" aria-hidden />
            <pre className="overflow-x-auto whitespace-pre-wrap font-mono text-[0.75rem] leading-relaxed text-success">
              {contrast.fix}
            </pre>
          </div>
        </div>
      </div>
    </Card>
  );
}
