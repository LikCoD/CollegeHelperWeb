import { Lesson } from '../schedule';

export interface DataPoint<D> {
  x: number;
  y: number;
  data: D;
}

export interface JournalPointData {
  lesson: Lesson;
  studentID: string;
}
