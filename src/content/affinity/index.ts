import type { Week } from '@/types/course';
import { affWeek } from './authoring';
import { week01 } from './week-01';
import { week02 } from './week-02';
import { week03 } from './week-03';
import { week04 } from './week-04';
import { week05 } from './week-05';
import { week06 } from './week-06';
import { week07 } from './week-07';
import { week08 } from './week-08';
import { week09 } from './week-09';
import { week10 } from './week-10';

export const affinityWeeks: Week[] = [
  week01,
  week02,
  week03,
  week04,
  week05,
  week06,
  week07,
  week08,
  week09,
  week10,
];

export { affWeek };
