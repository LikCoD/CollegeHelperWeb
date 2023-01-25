import {Lesson} from "./schedule"
import {StudyPlace} from "./general"
import * as moment from "moment"
import {Point} from "../services/shared/journal/journal.cell.service"

export interface JournalInfo {
  editable: boolean
  studyPlace: StudyPlace
  group: string
  teacher: string
  subject: string
  time: moment.Moment
}

export interface JournalRow {
  id: string
  title: string
  cells: JournalCell[][][]
  color: string
  averageMark: number
  numericMarksSum: number
  numericMarksAmount: number
  absencesAmount: number
  absencesTime: number
  marksAmount: MarkAmount[]
}

export interface JournalCell {
  id?: string
  type?: string[]
  marks?: Mark[]
  absences?: Absence[]
  journalCellColor?: string

  point: Point
}

export interface MarkAmount {
  mark: string
  amount: number
}

export interface Journal {
  dates: Lesson[][][]
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
  mark: string
  studentID: string
  lessonID?: string
  studyPlaceID?: string
  id?: string
}

export interface Absence {
  time?: number
  studentID: string
  lessonID: string
  studyPlaceID?: string
  id?: string
}
