export interface StudyPlace {
  id: string,
  name: string,
  lessonTypes: LessonType[]
}

export interface MarkType {
  mark: string
  workOutTime: bigint
}

export interface LessonType {
  type: string
  marks: MarkType[]
  standaloneMarks: MarkType[]
}
