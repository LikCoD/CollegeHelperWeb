import {Lesson} from "./schedule"
import {StudyPlace} from "./general"
import * as moment from "moment"
import {Point} from "../../modules/journal/services/journal.cell.service"

export interface JournalInfo {
  editable: boolean
  studyPlace: StudyPlace
  group: string
  teacher: string
  subject: string
  time: moment.Moment
}

export interface Map {
  [id: string]: number
}

export interface JournalRow {
  id: string
  title: string
  cells: JournalCell[][][]
  color: string
  averageMark: number
  absencesAmount: number
  absencesTime: number
  marksAmount: Map
}

export interface JournalCell {
  id?: string
  type?: string[]
  marks?: Mark[]
  absences?: Absence[]
  journalCellColor?: string

  point: Point
  indexes?: JournalCellIndexes
}

export interface JournalCellIndexes {
  monthIndex: number
  dayIndex: number
  lessonIndex: number
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

export interface CellResponse {
  cell: JournalCell
  average: number
  markAmount: Map
  rowColor: string
}
