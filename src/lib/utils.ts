import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

/** Normalises code output so cosmetic whitespace never fails an exercise. */
export function normalizeOutput(value: string) {
  return value
    .replace(/\r\n/g, '\n')
    .split('\n')
    .map((line) => line.replace(/\s+$/g, ''))
    .join('\n')
    .trim();
}

export function pluralize(count: number, singular: string, plural: string) {
  return count === 1 ? singular : plural;
}
