import { useMemo } from 'react';
import { motion, useReducedMotion } from 'framer-motion';
import { ArrowRight, PartyPopper } from 'lucide-react';
import { Button, Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from '@/components/ui';

interface CelebrationProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  title: string;
  description: string;
  stats: { label: string; value: string }[];
  actionLabel?: string;
  onAction?: () => void;
}

/**
 * Small, tasteful celebration: a handful of dots, no full-screen confetti storm,
 * and nothing auto-dismisses the learner's sense of progress.
 */
export function Celebration({
  open,
  onOpenChange,
  title,
  description,
  stats,
  actionLabel,
  onAction,
}: CelebrationProps) {
  const reduceMotion = useReducedMotion();
  const dots = useMemo(
    () =>
      Array.from({ length: 14 }, (_, index) => ({
        id: index,
        x: Math.cos((index / 14) * Math.PI * 2) * (60 + (index % 4) * 22),
        y: Math.sin((index / 14) * Math.PI * 2) * (40 + (index % 3) * 18),
        delay: (index % 5) * 0.03,
        color: ['bg-foreground', 'bg-foreground/60', 'bg-muted-foreground'][index % 3] ?? 'bg-foreground',
      })),
    [],
  );

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="text-center">
        <div className="relative mx-auto mb-2 flex h-16 w-16 items-center justify-center">
          {!reduceMotion &&
            dots.map((dot) => (
              <motion.span
                key={dot.id}
                className={`absolute h-1.5 w-1.5 rounded-full ${dot.color}`}
                initial={{ opacity: 0, x: 0, y: 0 }}
                animate={{ opacity: [0, 1, 0], x: dot.x, y: dot.y }}
                transition={{ duration: 1.1, delay: dot.delay, ease: 'easeOut' }}
                aria-hidden
              />
            ))}
          <span className="flex h-14 w-14 items-center justify-center rounded-full bg-primary-soft text-primary">
            <PartyPopper className="h-6 w-6" aria-hidden />
          </span>
        </div>

        <DialogHeader>
          <DialogTitle className="text-center text-xl">{title}</DialogTitle>
          <DialogDescription className="text-center">{description}</DialogDescription>
        </DialogHeader>

        <dl className="mx-auto my-4 grid grid-cols-3 gap-2">
          {stats.map((stat) => (
            <div key={stat.label} className="rounded-md bg-muted/60 px-2 py-3">
              <dt className="text-[0.65rem] uppercase tracking-wide text-muted-foreground">{stat.label}</dt>
              <dd className="mt-1 text-base font-semibold tabular-nums">{stat.value}</dd>
            </div>
          ))}
        </dl>

        <div className="flex flex-col gap-2 sm:flex-row sm:justify-center">
          <Button variant="outline" onClick={() => onOpenChange(false)}>
            Resta qui un momento
          </Button>
          {actionLabel && onAction && (
            <Button
              onClick={() => {
                onOpenChange(false);
                onAction();
              }}
            >
              {actionLabel}
              <ArrowRight className="h-4 w-4" aria-hidden />
            </Button>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
}
