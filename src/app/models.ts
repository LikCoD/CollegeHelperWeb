import * as moment from "moment";
import {StudyPlace} from "./data";

export interface Lesson {
  id: string
  studyPlaceId: string
  updated: boolean
  type: string
  endDate: moment.Moment
  startDate: moment.Moment
  subject: string
  group: string
  teacher: string
  room: string
  title: string
  homework: string
  description: string
}

export interface ScheduleInfo {
  type: string
  typeName: string
  studyPlace: StudyPlace
  startWeekDate: moment.Moment
  date: moment.Moment

  times: moment.Moment[]
  maxTime: moment.Moment
  minTime: moment.Moment
  daysNumber: number
}

export interface Schedule {
  lessons: Lesson[]
  info: ScheduleInfo
}

export interface Cell {
  startDate: moment.Moment
  endDate: moment.Moment
  updated: boolean
  lessons: Lesson[]
}
