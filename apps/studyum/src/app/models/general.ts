export interface StudyPlace {
  id: string,
  name: string,
  lessonTypes: LessonType[]
  absenceMark: string
  journalColors: JournalColors
}

export interface MarkType {
  mark: string
  workOutTime: number
}

export interface LessonType {
  type: string
  marks: MarkType[]
  standaloneMarks: MarkType[]
}

export interface JournalColors {
  general: string
  warning: string
  danger: string
}

export type JournalMode = ("general" | "standalone" | "absences");
