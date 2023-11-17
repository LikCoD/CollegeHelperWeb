import { Schedule, ScheduleLesson } from '@schedule/entities/schedule';

export interface Row {
  title: string;
  y: number;
  height?: number;
}

export interface MarkupEntry {
  y: number;
}

export interface IModeCalculator {
  rows: Row[];
  markup: MarkupEntry[];
  instantRouting: boolean;

  init(schedule: Schedule): void;

  height(lessons: ScheduleLesson[]): number;

  width(lessons: ScheduleLesson[]): number;

  y(lessons: ScheduleLesson[]): number;

  x(lessons: ScheduleLesson[]): number;

  styles(lessons: ScheduleLesson[]): any;
}
