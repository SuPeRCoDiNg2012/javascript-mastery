export type ThemePreference = 'light' | 'dark' | 'system';
export type FontSizePreference = 'sm' | 'md' | 'lg';
export type StudyTimePreference = 'morning' | 'afternoon' | 'evening';
export type ExerciseStatus = 'in_progress' | 'completed';

export interface ProgressRow {
  /** Composite key: `${weekId}:${lessonId}:${exerciseId}` or `${weekId}:${lessonId}:lesson`. */
  key: string;
  userId: string;
  weekId: string;
  lessonId: string;
  exerciseId: string | null;
  status: ExerciseStatus;
  attempts: number;
  lastAttemptAt: number;
  completedAt: number | null;
  updatedAt: number;
}

export interface QuizResultRow {
  key: string;
  userId: string;
  quizId: string;
  lessonId: string;
  weekId: string;
  answerIndex: number;
  isCorrect: boolean;
  attempts: number;
  answeredAt: number;
  updatedAt: number;
}

export interface ExplainResultRow {
  key: string;
  userId: string;
  explainId: string;
  lessonId: string;
  text: string;
  matchedKeywords: string[];
  completed: boolean;
  updatedAt: number;
}

export interface StreakRow {
  userId: string;
  current: number;
  longest: number;
  lastStudyDate: string | null;
  /** Dates (yyyy-MM-dd) where a freeze covered a missed day. */
  freezesUsed: string[];
  /** Day (yyyy-MM-dd) during which a broken streak can still be recovered. */
  recoveryUntil: string | null;
  recoveryValue: number;
  updatedAt: number;
}

export interface SpacedRepetitionRow {
  key: string;
  userId: string;
  conceptId: string;
  easinessFactor: number;
  intervalDays: number;
  repetitions: number;
  nextReviewAt: number;
  lastReviewedAt: number | null;
  lapses: number;
  updatedAt: number;
}

export interface AchievementRow {
  key: string;
  userId: string;
  achievementId: string;
  earnedAt: number;
}

export interface SessionRow {
  key: string;
  userId: string;
  lessonId: string;
  weekId: string;
  seconds: number;
  lastLessonId: string | null;
  lastScrollRatio: number;
  startedAt: number;
  updatedAt: number;
}

export interface ActivityRow {
  /** yyyy-MM-dd */
  key: string;
  userId: string;
  date: string;
  minutes: number;
  exercisesCompleted: number;
  lessonsCompleted: number;
  updatedAt: number;
}

export interface NoteRow {
  key: string;
  userId: string;
  lessonId: string;
  content: string;
  updatedAt: number;
}

export interface SettingsRow {
  key: string;
  userId: string;
  theme: 'light' | 'dark' | 'system';
  fontSize: 'sm' | 'md' | 'lg';
  sound: boolean;
  reminders: boolean;
  studyTime: 'morning' | 'afternoon' | 'evening' | null;
  onboarded: boolean;
  displayName: string | null;
  updatedAt: number;
}

export type QueueOperation =
  | { type: 'progress'; payload: ProgressRow }
  | { type: 'quiz'; payload: QuizResultRow }
  | { type: 'explain'; payload: ExplainResultRow }
  | { type: 'streak'; payload: StreakRow }
  | { type: 'spaced'; payload: SpacedRepetitionRow }
  | { type: 'achievement'; payload: AchievementRow }
  | { type: 'session'; payload: SessionRow }
  | { type: 'activity'; payload: ActivityRow }
  | { type: 'note'; payload: NoteRow }
  | { type: 'settings'; payload: SettingsRow };

export interface QueueRow {
  id?: number;
  userId: string;
  operation: QueueOperation;
  createdAt: number;
  retries: number;
  lastError: string | null;
}
