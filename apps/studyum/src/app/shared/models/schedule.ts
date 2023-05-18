import * as moment from "moment"
import {Absence, Mark} from "./journal"
import {Point} from "../../modules/journal/services/journal.cell.service"

export interface ScheduleTypes {
  [Key: string]: string[]
}

export interface Lesson {
  id?: string
  studyPlaceId?: string
  primaryColor: string
  journalCellColor?: string
  secondaryColor?: string
  endDate: moment.Moment
  startDate: moment.Moment
  lessonIndex: number
  subject: string
  group: string
  teacher: string
  room: string
  type?: string
  marks?: Mark[]
  absences?: Absence[]
  title?: string
  homework?: string
  description?: string
  isGeneral?: boolean
  point?: Point
}

export interface ScheduleInfo {
  studyPlaceID: string
  type: string
  typeName: string
  startDate: moment.Moment
  endDate: moment.Moment
  date: moment.Moment

  indexes: number[]
  minLessonIndex: number
  maxLessonIndex: number

  times: moment.Moment[]
  minTime: moment.Moment
  maxTime: moment.Moment

  daysNumber: number
}

export interface Schedule {
  lessons: Lesson[]
  cells: Cell[]
  info: ScheduleInfo
}

export interface Cell {
  startDate: moment.Moment
  endDate: moment.Moment
  lessonIndex: number
  lessons: Lesson[]
}
