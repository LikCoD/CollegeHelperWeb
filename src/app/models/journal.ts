import {Lesson} from "./schedule";

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
