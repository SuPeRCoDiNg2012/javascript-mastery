import { useEffect, useState } from 'react';
import { cn } from '@/lib/utils';

export interface TocItem {
  id: string;
  label: string;
}

interface LessonTocProps {
  items: TocItem[];
  className?: string;
  onNavigate?: () => void;
}

/**
 * Scrollspy table of contents. Uses IntersectionObserver instead of scroll
 * listeners so it stays cheap, and marks the section closest to the top.
 */
export function LessonToc({ items, className, onNavigate }: LessonTocProps) {
  const [active, setActive] = useState(items[0]?.id ?? '');

  useEffect(() => {
    const elements = items
      .map((item) => document.getElementById(item.id))
      .filter((element): element is HTMLElement => Boolean(element));

    if (elements.length === 0) return;

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top)[0];
        if (visible?.target.id) setActive(visible.target.id);
      },
      { rootMargin: '-88px 0px -65% 0px', threshold: [0, 1] },
    );

    for (const element of elements) observer.observe(element);
    return () => observer.disconnect();
  }, [items]);

  return (
    <nav className={cn('text-sm', className)} aria-label="Indice della lezione">
      <p className="mb-3 text-xs font-semibold uppercase tracking-[0.12em] text-muted-foreground">
        In questa lezione
      </p>
      <ol className="space-y-1 border-l border-border">
        {items.map((item) => (
          <li key={item.id}>
            <a
              href={`#${item.id}`}
              onClick={onNavigate}
              className={cn(
                '-ml-px block border-l-2 py-1.5 pl-3 leading-snug transition-colors',
                active === item.id
                  ? 'border-primary font-medium text-foreground'
                  : 'border-transparent text-muted-foreground hover:border-border hover:text-foreground',
              )}
            >
              {item.label}
            </a>
          </li>
        ))}
      </ol>
    </nav>
  );
}
