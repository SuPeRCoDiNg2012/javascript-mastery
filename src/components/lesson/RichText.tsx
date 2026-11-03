import { Fragment, type ReactNode } from 'react';

/**
 * Tiny inline formatter for lesson prose: **bold**, `code`, *italic*.
 * Deliberately not a Markdown parser — content is authored data, and this keeps
 * the renderer predictable (and dependency-free).
 */
export function RichText({ text, className }: { text: string; className?: string }) {
  const parts = text.split(/(\*\*[^*]+\*\*|`[^`]+`|\*[^*]+\*)/g);

  return (
    <span className={className}>
      {parts.map((part, index) => {
        if (part.startsWith('**') && part.endsWith('**')) {
          return (
            <strong key={index} className="font-semibold text-foreground">
              {part.slice(2, -2)}
            </strong>
          );
        }
        if (part.startsWith('`') && part.endsWith('`')) {
          return (
            <code
              key={index}
              className="rounded bg-muted px-1.5 py-0.5 font-mono text-[0.85em] text-foreground"
            >
              {part.slice(1, -1)}
            </code>
          );
        }
        if (part.startsWith('*') && part.endsWith('*') && part.length > 2) {
          return (
            <em key={index} className="italic">
              {part.slice(1, -1)}
            </em>
          );
        }
        return <Fragment key={index}>{part}</Fragment>;
      })}
    </span>
  );
}

export function RichParagraphs({ paragraphs }: { paragraphs: string[] }): ReactNode {
  return (
    <>
      {paragraphs.map((paragraph, index) => (
        <p key={index} className="text-[0.9875rem] leading-[1.75] text-foreground/85">
          <RichText text={paragraph} />
        </p>
      ))}
    </>
  );
}
