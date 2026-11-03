import { dayKey } from '@/features/gamification/streak';

export type QuestMetric = 'exercises' | 'lessons' | 'minutes' | 'reviews' | 'explains';

export interface DailyQuest {
  id: string;
  metric: QuestMetric;
  target: number;
  title: string;
  description: string;
  rewardXp: number;
}

/** Small, finishable in a few minutes, never a second job. */
export const questPool: DailyQuest[] = [
  {
    id: 'one-exercise',
    metric: 'exercises',
    target: 1,
    title: 'Un esercizio',
    description: 'Completa almeno un esercizio oggi.',
    rewardXp: 20,
  },
  {
    id: 'three-exercises',
    metric: 'exercises',
    target: 3,
    title: 'Tre esercizi',
    description: 'Tre esercizi completati: ritmo tranquillo, progresso reale.',
    rewardXp: 40,
  },
  {
    id: 'read-lesson',
    metric: 'lessons',
    target: 1,
    title: 'Una lezione',
    description: 'Porta a termine una lezione, anche in modalità 5 minuti.',
    rewardXp: 50,
  },
  {
    id: 'review-one',
    metric: 'reviews',
    target: 1,
    title: 'Un ripasso',
    description: 'Ripassa un concetto in scadenza: 3 minuti bastano.',
    rewardXp: 30,
  },
  {
    id: 'explain',
    metric: 'explains',
    target: 1,
    title: 'Spiega con parole tue',
    description: 'Scrivi una spiegazione: è il modo più veloce per accorgersi di cosa manca.',
    rewardXp: 35,
  },
  {
    id: 'ten-minutes',
    metric: 'minutes',
    target: 10,
    title: 'Dieci minuti',
    description: 'Dieci minuti di studio concentrato.',
    rewardXp: 30,
  },
];

/** Deterministic per day, so the quest does not reshuffle on every render. */
export function questForDate(date = new Date()): DailyQuest {
  const key = dayKey(date);
  const seed = key.split('-').reduce((acc, part) => acc + Number(part), 0);
  return questPool[seed % questPool.length] ?? questPool[0]!;
}

export interface QuestProgressInput {
  exercises: number;
  lessons: number;
  minutes: number;
  reviews: number;
  explains: number;
}

export function questProgress(quest: DailyQuest, input: QuestProgressInput) {
  const value = input[quest.metric] ?? 0;
  return { value, target: quest.target, done: value >= quest.target };
}
