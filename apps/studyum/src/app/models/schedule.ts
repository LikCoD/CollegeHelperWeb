import * as moment from 'moment';
import { Mark } from './journal';
import { StudyPlace } from './general';

export type Types = Map<string, string[]>

export interface Lesson {
  id?: string;
  studyPlaceId?: string;
  primaryColor: string;
  journalCellColor?: string;
  secondaryColor?: string;
  endDate: moment.Moment;
  startDate: moment.Moment;
  subject: string;
  group: string;
  teacher: string;
  room: string;
  type?: string;
  marks?: Mark[];
  title?: string;
  homework?: string;
  description?: string;
  isGeneral?: boolean;
  collapsed?: boolean;
  collapsedType?: moment.unitOfTime.StartOf;
}

export interface ScheduleInfo {
  type: string;
  typeName: string;
  studyPlace: StudyPlace;
  startWeekDate: moment.Moment;
  date: moment.Moment;

  times: moment.Moment[];
  maxTime: moment.Moment;
  minTime: moment.Moment;
  daysNumber: number;
}

export interface Schedule {
  lessons: Lesson[];
  cells: Cell[];
  info: ScheduleInfo;
}

export interface Cell {
  startDate: moment.Moment;
  endDate: moment.Moment;
  lessons: Lesson[];
}
