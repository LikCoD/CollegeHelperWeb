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
  subjects: Subject[]
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
  id: string
  email: string
  verifiedEmail: string
  login: string
  name: string
  picture: string
  type: string
  typeName: string
  studyPlaceId: number
  studyPlace: string
  permissions: string[]
  accepted: boolean
}

export function userStatus(user: User): string {
  if (user.type == "") return "Not add info"
  else if (user.accepted) return "Confirmed"
  else return "Not confirmed"
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


export interface Schedule {
  lessons: ScheduleLesson[],
  info: Info
}

export interface ScheduleLesson {
  subjects: Subject[]
  weekIndex: number,
  dayIndex: number,
  date: string,
  startTime: Date,
  endTime: Date,
  description: string,
  title: string,
  homework: string,
  studyPlaceId: number,
}

export interface Info {
  weeksCount: number,
  daysCount: number,
  subjectsCount: number,
  type: string,
  name: string,
  educationPlaceId: number,
  educationPlaceName: string
}
