import * as moment from "moment";
import * as Collections from "typescript-collections";

export interface Subject {
  id?: string
  subject: string
  teacher: string
  room: string
  group: string
  type: string
  date?: Date
  description?: string,
  title?: string,
  homework?: string,
  startTime?: moment.Moment,
  endTime?: moment.Moment
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

export class User {
  constructor(
    public email: string,
    public login: string,
    public name: string,
    public type: string,
    public typeName: string,
    public studyPlaceId: number,
    public password: string,
    public passwordRepeat: string,
    public studyPlace: string = "",
    public permissions: string[] = [],
    public accepted: boolean = false,
    public id: string = "",
    public verifiedEmail: boolean = false,
    public picture: string = "",
  ) {
  }
}

export function userStatus(user: User): string {
  if (user.type == "") return "Not add info"
  else if (user.accepted) return "Confirmed"
  else return "Not confirmed"
}




export interface Schedule {
  schedule: any;
  lessons: ScheduleLesson[],
  info: Info
}

export interface ScheduleLesson {
  subjects: Subject[]
  startDate: moment.Moment,
  endDate: moment.Moment,
  updated: boolean,
  studyPlaceId: number,
}

export interface Info {
  type: string,
  typeName: string,
  studyPlace: StudyPlace,
  startWeekDate: moment.Moment,
  date: moment.Moment,
  times: Collections.Set<moment.Moment>
  minTime: moment.Moment,
  maxTime: moment.Moment,
  days: number,
  studyHours: number,
}

export interface StudyPlace {
  id: number,
  name: string
}

export class Types {
  constructor(
    public groups: string[] = [],
    public teachers: string[] = [],
    public subjects: string[] = [],
    public rooms: string[] = []
  ) {
  }
}
