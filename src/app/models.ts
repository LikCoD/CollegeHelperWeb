import * as moment from "moment";

export interface Lesson {
  id?: string
  studyPlaceId?: string
  primaryColor: string
  secondaryColor?: string
  endDate?: moment.Moment
  startDate?: moment.Moment
  subject: string
  group: string
  teacher: string
  room: string
  marks?: Mark[]
  title?: string
  homework?: string
  description?: string
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
  lessons: Lesson[]
}

export interface User {
  email: string
  login: string
  name: string
  type: string
  typeName: string
  studyPlaceId: string
  password: string
  passwordRepeat: string
  studyPlace: string,
  permissions: string[],
  accepted: boolean,
  id: string,
  verifiedEmail: boolean,
  picture: string,
}

export interface StudyPlace {
  id: string,
  name: string
}

export type Types = Map<string, string[]>

export interface JournalInfo {
  editable: boolean,
  studyPlaceId: string
  group: string
  teacher: string
  subject: string
}

interface JournalRow {
  id: string
  subject: string,
  group: string,
  title: string,
  userType: string,
  lessons: Lesson[]
}

export interface Journal {
  dates: Lesson[]
  rows: JournalRow[]
  info: JournalInfo
}

export interface JournalOption {
  subject: string
  teacher: string
  group: string
  editable: boolean
}

export interface Mark {
  mark: string,
  studentID?: string,
  lessonId?: string,
  studyPlaceId?: string,
  id?: string
}
