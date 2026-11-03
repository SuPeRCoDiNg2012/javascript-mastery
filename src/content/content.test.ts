import { describe, expect, it } from 'vitest';
import { allExercises, lessons, weeks, weeks as courseWeeks } from './index';

/**
 * Content contract: 12 weeks × 8 lessons, each lesson with four fading
 * exercises, a quiz with per-option feedback and one self-explanation.
 */
describe('course content', () => {
  it('has 12 weeks with eight lessons each', () => {
    expect(courseWeeks).toHaveLength(12);
    for (const week of weeks) {
      expect(week.lessons, week.id).toHaveLength(8);
    }
    expect(lessons).toHaveLength(96);
  });

  it('uses unique ids everywhere', () => {
    expect(new Set(lessons.map((lesson) => lesson.id)).size).toBe(lessons.length);
    expect(new Set(allExercises.map((exercise) => exercise.id)).size).toBe(allExercises.length);
    const quizzes = lessons.flatMap((lesson) => lesson.quizzes);
    expect(new Set(quizzes.map((quiz) => quiz.id)).size).toBe(quizzes.length);
  });

  it('gives every lesson the full pedagogical cycle', () => {
    const shortFeedback: string[] = [];
    for (const lesson of lessons) {
      expect(lesson.exercises.length, lesson.id).toBeGreaterThanOrEqual(3);
      expect(lesson.contrasts.length, lesson.id).toBeGreaterThanOrEqual(1);
      expect(lesson.explains.length, lesson.id).toBeGreaterThanOrEqual(1);
      expect(lesson.quizzes.length, lesson.id).toBeGreaterThanOrEqual(2);
      expect(lesson.activation.question.length, lesson.id).toBeGreaterThan(10);
      expect(lesson.recap.next.length, lesson.id).toBeGreaterThan(10);
      for (const exercise of lesson.exercises) {
        expect(exercise.hints.filter(Boolean).length, exercise.id).toBeGreaterThanOrEqual(2);
        expect(exercise.solution.length, exercise.id).toBeGreaterThan(0);
        expect(exercise.explanation.length, exercise.id).toBeGreaterThan(10);
      }
      for (const quiz of lesson.quizzes) {
        expect(quiz.correctIndex).toBeGreaterThanOrEqual(0);
        expect(quiz.correctIndex).toBeLessThan(quiz.options.length);
        for (const option of quiz.options) {
          // Every wrong answer must explain itself, not just say "no".
          if (option.feedback.trim().length <= 5) shortFeedback.push(`${quiz.id}: "${option.feedback}"`);
        }
      }
    }
    expect(shortFeedback).toEqual([]);
  });

  it('keeps every week within three new concepts per lesson', () => {
    for (const lesson of lessons) {
      expect(lesson.concepts.length, lesson.id).toBeLessThanOrEqual(3);
    }
  });
});
