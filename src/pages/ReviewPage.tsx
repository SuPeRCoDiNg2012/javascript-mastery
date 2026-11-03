import { Link } from 'react-router-dom';
import { toast } from 'sonner';
import { useAppStore } from '@/app/store';
import { useStats } from '@/app/selectors';
import { reviewConceptNow } from '@/app/progress';
import { formatDueIn } from '@/features/spaced-repetition/sm2';

export default function ReviewPage() {
  const userId = useAppStore((state) => state.userId);
  const stats = useStats(userId);

  const review = async (conceptId: string, quality: 2 | 5) => {
    const achievements = await reviewConceptNow(userId, conceptId, quality);
    toast.success(quality === 5 ? 'Registrato: lo sai.' : 'Registrato: tornerà presto.');
    for (const achievement of achievements) {
      toast.success(`Traguardo: ${achievement.title}`);
    }
  };

  return (
    <div>
      <h1 className="text-2xl font-semibold tracking-tight">Ripassi</h1>
      <p className="mt-2 max-w-lg text-sm leading-relaxed text-muted-foreground">
        I concetti tornano dopo 1, 3, 7, 14, 30 e 90 giorni. Rispondi a memoria, poi controlla.
      </p>

      {stats.due.length === 0 ? (
        <div className="mt-8 border-t border-border pt-6">
          <p className="text-sm text-muted-foreground">Niente in scadenza.</p>
          <Link to="/course" className="mt-2 inline-block text-sm underline underline-offset-4">
            Vai al percorso
          </Link>
        </div>
      ) : (
        <ul className="mt-8 border-t border-border">
          {stats.due.map((item) => {
            const lesson = item.lessons[0];
            return (
              <li key={item.conceptId} className="border-b border-border py-4">
                <div className="flex items-baseline justify-between gap-4">
                  <p className="text-sm font-medium">{item.conceptId}</p>
                  <span className="shrink-0 text-xs text-muted-foreground">
                    {formatDueIn(item.nextReviewAt)} · {item.repetitions} ripassi
                  </span>
                </div>
                {lesson && (
                  <Link
                    to={`/lesson/${lesson.id}`}
                    className="mt-1 inline-block text-xs text-muted-foreground underline underline-offset-4"
                  >
                    {lesson.title}
                  </Link>
                )}
                <div className="mt-3 flex gap-4 text-xs">
                  <button
                    type="button"
                    onClick={() => void review(item.conceptId, 5)}
                    className="underline underline-offset-4"
                  >
                    Lo sapevo
                  </button>
                  <button
                    type="button"
                    onClick={() => void review(item.conceptId, 2)}
                    className="text-muted-foreground underline underline-offset-4"
                  >
                    Da rivedere
                  </button>
                </div>
              </li>
            );
          })}
        </ul>
      )}
    </div>
  );
}
