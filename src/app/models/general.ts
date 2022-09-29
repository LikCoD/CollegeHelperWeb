export interface StudyPlace {
  id: string,
  name: string,
  lessonTypes: LessonType[]
}

export interface MarkType {
  mark: string
  standalone: boolean
}

export interface LessonType {
  type: string
  marks: MarkType[]
}
