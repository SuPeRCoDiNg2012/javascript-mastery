export const lessonKey = (userId: string, weekId: string, lessonId: string) =>
  `${userId}:${weekId}:${lessonId}`;

export const progressKey = (
  userId: string,
  weekId: string,
  lessonId: string,
  exerciseId: string | null,
) => `${userId}:${weekId}:${lessonId}:${exerciseId ?? 'lesson'}`;

export const quizKey = (userId: string, quizId: string) => `${userId}:${quizId}`;
export const explainKey = (userId: string, explainId: string) => `${userId}:${explainId}`;
export const conceptKey = (userId: string, conceptId: string) => `${userId}:${conceptId}`;
export const achievementKey = (userId: string, achievementId: string) =>
  `${userId}:${achievementId}`;
export const activityKey = (userId: string, date: string) => `${userId}:${date}`;
export const noteKey = (userId: string, lessonId: string) => `${userId}:${lessonId}`;
export const sessionKey = (userId: string, lessonId: string) => `${userId}:${lessonId}`;
export const WEEK_TEST_EXERCISE_ID = 'week-test';
