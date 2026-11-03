import { describe, expect, it } from 'vitest';
import { getLesson, lessons } from './index';
import { isDense, measureLessonDensity } from '@/features/content/density';

/**
 * The reference lesson is the contract: if it regresses, the format regresses.
 * Lessons not yet migrated are reported below so the migration has a scoreboard.
 */
describe('dense lesson format', () => {
  it('the reference lesson meets every minimum', () => {
    const lesson = getLesson('w1l1');
    expect(lesson).toBeDefined();
    if (!lesson) return;

    const report = measureLessonDensity(lesson);
    expect(report.gaps).toEqual([]);
    expect(report.words).toBeGreaterThanOrEqual(2000);
  });

  it('every migrated lesson respects the contract', () => {
    const migrated = lessons.filter(isDense);
    for (const lesson of migrated) {
      const report = measureLessonDensity(lesson);
      expect(report.gaps, `${lesson.id} → ${report.gaps.join(', ')}`).toEqual([]);
    }
  });

  it('reports migration coverage', () => {
    const migrated = lessons.filter(isDense);
    const remaining = lessons.length - migrated.length;
    // Visible with `npm run content:report`.
    console.info(
      `[densità] ${migrated.length}/${lessons.length} lezioni nel formato denso, ${remaining} da migrare.`,
    );
    expect(migrated.length).toBeGreaterThan(0);
  });
});
