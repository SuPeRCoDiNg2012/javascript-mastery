export interface AchievementContext {
  lessonsCompleted: number;
  weeksCompleted: number;
  exercisesCompleted: number;
  quizzesCorrect: number;
  explainsCompleted: number;
  currentStreak: number;
  longestStreak: number;
  totalMinutes: number;
  lessonCompletedAtNight: boolean;
  projectWeeksCompleted: number;
  testsPassed: number;
}

export interface AchievementDefinition {
  id: string;
  title: string;
  description: string;
  icon: 'flag' | 'book' | 'flame' | 'dumbbell' | 'trophy' | 'brain' | 'moon' | 'hammer' | 'shield';
  /** Achievements are intentionally sparse: roughly 1–2 per week of study. */
  isEarned: (ctx: AchievementContext) => boolean;
}

export const achievements: AchievementDefinition[] = [
  {
    id: 'first-lesson',
    title: 'Prima lezione',
    description: 'Hai completato la tua prima lezione.',
    icon: 'flag',
    isEarned: (ctx) => ctx.lessonsCompleted >= 1,
  },
  {
    id: 'first-week',
    title: 'Una settimana intera',
    description: 'Hai chiuso la Settimana 1.',
    icon: 'book',
    isEarned: (ctx) => ctx.weeksCompleted >= 1,
  },
  {
    id: 'exercises-25',
    title: '25 esercizi',
    description: 'Venticinque esercizi completati: la pratica sta diventando abitudine.',
    icon: 'dumbbell',
    isEarned: (ctx) => ctx.exercisesCompleted >= 25,
  },
  {
    id: 'exercises-100',
    title: '100 esercizi',
    description: 'Cento esercizi: la pratica sta diventando abitudine.',
    icon: 'trophy',
    isEarned: (ctx) => ctx.exercisesCompleted >= 100,
  },
  {
    id: 'streak-7',
    title: '7 giorni di fila',
    description: 'Una settimana di studio consecutivo.',
    icon: 'flame',
    isEarned: (ctx) => ctx.longestStreak >= 7,
  },
  {
    id: 'streak-30',
    title: '30 giorni di fila',
    description: 'Un mese di costanza.',
    icon: 'flame',
    isEarned: (ctx) => ctx.longestStreak >= 30,
  },
  {
    id: 'first-project',
    title: 'Primo progetto',
    description: 'Il tuo primo progetto è iniziato.',
    icon: 'hammer',
    isEarned: (ctx) => ctx.weeksCompleted >= 2,
  },
  {
    id: 'self-explainer',
    title: 'Spiegare per capire',
    description: 'Hai completato 10 spiegazioni con parole tue.',
    icon: 'brain',
    isEarned: (ctx) => ctx.explainsCompleted >= 10,
  },
  {
    id: 'night-owl',
    title: 'Studio notturno',
    description: 'Una lezione completata dopo le 22.',
    icon: 'moon',
    isEarned: (ctx) => ctx.lessonCompletedAtNight,
  },
  {
    id: 'test-master',
    title: 'Checkpoint superato',
    description: 'Hai superato un test di fine settimana.',
    icon: 'shield',
    isEarned: (ctx) => ctx.testsPassed >= 1,
  },
  {
    id: 'halfway',
    title: 'Metà strada',
    description: 'Sei settimane completate su dodici.',
    icon: 'trophy',
    isEarned: (ctx) => ctx.weeksCompleted >= 6,
  },
  {
    id: 'course-complete',
    title: 'Corso completato',
    description: 'Un percorso completo, un progetto reale, una competenza in mano.',
    icon: 'trophy',
    isEarned: (ctx) => ctx.weeksCompleted >= 12,
  },
];

export function earnedAchievements(ctx: AchievementContext) {
  return achievements.filter((achievement) => achievement.isEarned(ctx));
}

export function achievementById(id: string) {
  return achievements.find((achievement) => achievement.id === id);
}
