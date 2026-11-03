import {
  AlertTriangle,
  ArrowRight,
  Briefcase,
  Code2,
  Cpu,
  Lightbulb,
  Sparkles,
  Table2,
} from 'lucide-react';
import type { LessonSection, SectionKind } from '@/types/course';
import { CodeSample } from './CodeSample';
import { RichParagraphs, RichText } from './RichText';

const icons: Record<SectionKind, typeof Code2 | null> = {
  theory: null,
  analogy: Lightbulb,
  example: Code2,
  world: Briefcase,
  trace: Cpu,
  misconception: AlertTriangle,
  tip: Sparkles,
  table: Table2,
};

const worldLabel = 'Nel mondo reale';

/**
 * Dense lesson renderer. Each section is scannable: heading, short paragraphs,
 * then one visual artefact (code, table, trace, misconception callout).
 */
export function RichSections({ sections }: { sections: LessonSection[] }) {
  return (
    <div className="mt-2 space-y-10">
      {sections.map((section, index) => {
        const Icon = icons[section.kind];
        const isCallout = section.kind === 'world' || section.kind === 'analogy';

        return (
          <section key={section.id} id={`s-${section.id}`} className="scroll-mt-24">
            <h2 className="mb-3 flex items-baseline gap-2 text-lg font-semibold tracking-tight">
              <span className="text-sm font-medium tabular-nums text-primary">{index + 1}.</span>
              <span className="flex items-center gap-2">
                {Icon && <Icon className="h-4 w-4 text-muted-foreground" aria-hidden />}
                {section.title}
              </span>
            </h2>

            <div className="space-y-3">
              <div
                className={
                  isCallout
                    ? section.kind === 'world'
                      ? 'space-y-3 rounded-lg border-l-2 border-primary bg-primary-soft/40 p-4'
                      : 'space-y-3 rounded-lg border-l-2 border-warning/60 bg-warning-soft/30 p-4'
                    : 'space-y-3'
                }
              >
                {isCallout && (
                  <p className="text-[0.7rem] font-semibold uppercase tracking-[0.12em] text-muted-foreground">
                    {section.kind === 'world' ? worldLabel : 'Analogia'}
                  </p>
                )}
                <RichParagraphs paragraphs={section.paragraphs} />
              </div>

              {section.table && <SectionTable table={section.table} />}

              {section.code?.map((sample, codeIndex) => (
                <CodeSample key={`${section.id}-${codeIndex}`} sample={sample} />
              ))}

              {section.kind === 'trace' && section.steps && section.steps.length > 0 && (
                <div className="rounded-lg border border-border bg-card p-4">
                  <p className="mb-2 flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.1em] text-muted-foreground">
                    <Cpu className="h-3.5 w-3.5" aria-hidden />
                    Cosa fa il computer, passo per passo
                  </p>
                  <ol className="space-y-1.5">
                    {section.steps.map((step, stepIndex) => (
                      <li key={stepIndex} className="flex gap-2.5 text-sm leading-relaxed">
                        <span className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-primary-soft text-[0.7rem] font-semibold text-accent-foreground">
                          {stepIndex + 1}
                        </span>
                        <span>
                          <RichText text={step} />
                        </span>
                      </li>
                    ))}
                  </ol>
                </div>
              )}

              {section.kind === 'misconception' && (
                <div className="rounded-lg border border-destructive/25 bg-destructive-soft/40 p-4">
                  <p className="flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.1em] text-destructive">
                    <AlertTriangle className="h-3.5 w-3.5" aria-hidden />
                    Cosa NON è
                  </p>
                  {section.wrongIdea && (
                    <p className="mt-2 text-sm leading-relaxed text-foreground/90">
                      <RichText text={section.wrongIdea} />
                    </p>
                  )}
                  {section.whyWrong && (
                    <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                      <RichText text={section.whyWrong} />
                    </p>
                  )}
                  {section.correctCode && (
                    <pre className="mt-3 overflow-x-auto rounded-md bg-code p-3 font-mono text-[0.78rem] leading-relaxed text-code-foreground">
                      {section.correctCode}
                    </pre>
                  )}
                </div>
              )}

              {section.tip && (
                <div className="flex items-start gap-2 rounded-md border border-border bg-muted/40 px-3 py-2 text-sm leading-relaxed text-muted-foreground">
                  <Sparkles className="mt-0.5 h-3.5 w-3.5 shrink-0 text-primary" aria-hidden />
                  <span>
                    <RichText text={section.tip} />
                  </span>
                </div>
              )}
            </div>
          </section>
        );
      })}
    </div>
  );
}

function SectionTable({ table }: { table: NonNullable<LessonSection['table']> }) {
  return (
    <figure className="my-4 overflow-x-auto rounded-lg border border-border">
      <table className="w-full min-w-[420px] border-collapse text-left text-sm">
        <thead className="bg-muted/60">
          <tr>
            {table.headers.map((header) => (
              <th key={header} scope="col" className="border-b border-border px-3 py-2 font-semibold">
                {header}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {table.rows.map((row, rowIndex) => (
            <tr key={rowIndex} className="even:bg-muted/20">
              {row.map((cell, cellIndex) => (
                <td key={cellIndex} className="border-b border-border/60 px-3 py-2 align-top text-foreground/85 last:border-0">
                  <RichText text={cell} />
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
      {table.caption && (
        <figcaption className="border-t border-border px-3 py-2 text-xs text-muted-foreground">
          {table.caption}
        </figcaption>
      )}
    </figure>
  );
}

/** Small anchor: keeps "cos'è / cosa non è" visually distinct in long lessons. */
export function CompareCallout({
  label,
  children,
  tone = 'neutral',
}: {
  label: string;
  children: React.ReactNode;
  tone?: 'neutral' | 'warning';
}) {
  return (
    <div
      className={
        tone === 'warning'
          ? 'rounded-lg border border-warning/30 bg-warning-soft/40 p-4'
          : 'rounded-lg border border-border bg-muted/30 p-4'
      }
    >
      <p className="mb-1 flex items-center gap-1.5 text-xs font-semibold uppercase tracking-[0.1em] text-muted-foreground">
        <ArrowRight className="h-3 w-3" aria-hidden />
        {label}
      </p>
      {children}
    </div>
  );
}
