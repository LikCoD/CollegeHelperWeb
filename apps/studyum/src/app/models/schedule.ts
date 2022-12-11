import * as moment from "moment"
import {Absence, Mark} from "./journal"
import {StudyPlace} from "./general"
import {Point} from "../services/ui/journal.cell.service"

export interface ScheduleTypes {
  [Key: string]: string[];
}

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
  absences?: Absence[];
  title?: string;
  homework?: string;
  description?: string;
  isGeneral?: boolean;
  point?: Point
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
