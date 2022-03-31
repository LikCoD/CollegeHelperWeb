export interface Subject {
  id: string
  subject: string
  teacher: string
  room: string
  group: string
  type: string
  date: Date
}

export interface Options {
  subject: string
  teacher: string
  group: string
  editable: boolean
}


export interface Lesson {
  id: string
  studyPlaceId: number
  subject: string
  teacher: string
  room: string
  group: string
  type: string
  date: Date
  weekIndex: number,
  columnIndex: number,
  rowIndex: number,
  isStay: boolean
  marks: Mark[]
  homework: string,
  smallDescription: string,
  description: string,
  userId: string
}

export class Mark {
  constructor(
    public mark: string,
    public userId: string = "",
    public subjectId: string = "",
    public studyPlaceId: number = 0,
    public id: string = "") {
  }
}

export interface GroupMember {
  id: string
  fullName: string
  lessons: Lesson[]
}

export interface User {
  name: string
  type: string
  login: string
}

interface Row {
  id: string
  subject: string,
  group: string,
  title: string,
  userType: string,
  lessons: Lesson[]
}

export interface JournalInfo {
  editable: boolean,
  studyPlaceId: number
  group: string
  teacher: string
  subject: string
}

export interface Journal {
  dates: Lesson[]
  rows: Row[]
  info: JournalInfo
}
