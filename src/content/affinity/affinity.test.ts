import { describe, expect, it } from 'vitest';
import { affinityCourse } from '@/content';

/**
 * Affinity Mastery has its own contract: practical lessons, manual drills and
 * enough structure to be studied without a video. It is deliberately not
 * measured with the JavaScript density rules (no code samples by design).
 */
describe('Affinity Mastery content', () => {
  const weeks = affinityCourse.weeks;
  const lessons = weeks.flatMap((week) => week.lessons);

  it('has ten weeks with eight lessons each', () => {
    expect(weeks).toHaveLength(10);
    for (const week of weeks) {
      expect(week.lessons, week.id).toHaveLength(8);
    }
    expect(lessons).toHaveLength(80);
  });

  it('uses unique ids and three concepts at most', () => {
    expect(new Set(lessons.map((lesson) => lesson.id)).size).toBe(lessons.length);
    for (const lesson of lessons) {
      expect(lesson.concepts.length, lesson.id).toBeLessThanOrEqual(3);
    }
  });

  it('gives every lesson the practical cycle', () => {
    for (const lesson of lessons) {
      expect(lesson.sections?.length ?? 0, lesson.id).toBeGreaterThanOrEqual(6);
      expect(lesson.errors?.length ?? 0, lesson.id).toBeGreaterThanOrEqual(2);
      expect(lesson.exercises.length, lesson.id).toBeGreaterThanOrEqual(3);
      expect(lesson.quizzes.length, lesson.id).toBeGreaterThanOrEqual(2);
      expect(lesson.explains.length, lesson.id).toBeGreaterThanOrEqual(1);
      expect(lesson.project, lesson.id).toBeDefined();
      expect(lesson.consolidate, lesson.id).toBeTruthy();
      for (const exercise of lesson.exercises) {
        expect(exercise.check.kind, exercise.id).toBe('manual');
        expect(exercise.check.kind === 'manual' && exercise.check.checklist.length, exercise.id).toBeGreaterThanOrEqual(2);
      }
    }
  });
});
