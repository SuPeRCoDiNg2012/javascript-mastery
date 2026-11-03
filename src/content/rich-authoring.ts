import type {
  LessonCodeSample,
  LessonError,
  LessonProject,
  LessonSection,
  LessonTable,
  SectionKind,
} from '@/types/course';

/**
 * Helpers for the dense lesson format. Content files stay declarative:
 * a section is a title, a few short paragraphs, and the artefacts that make the
 * idea concrete (code, table, trace, misconception).
 */

export function code(sample: LessonCodeSample): LessonCodeSample {
  return sample;
}

export function table(headers: string[], rows: string[][], caption?: string): LessonTable {
  return { headers, rows, caption };
}

interface SectionInput {
  id: string;
  title: string;
  kind?: SectionKind;
  paragraphs: string[];
  code?: LessonCodeSample[];
  table?: LessonTable;
  steps?: string[];
  wrongIdea?: string;
  whyWrong?: string;
  correctCode?: string;
  tip?: string;
}

export function section({
  id,
  title,
  kind = 'theory',
  ...rest
}: SectionInput): LessonSection {
  return { id, title, kind, ...rest };
}

export function errorCase(input: LessonError): LessonError {
  return input;
}

export function project(input: LessonProject): LessonProject {
  return input;
}
