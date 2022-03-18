interface Subject {
  id: string
  subject: string
  teacher: string
  room: string
  group: string
  type: string
  date: Date
}

interface Lesson {
  id: string
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
  description: string
}

interface Mark {
  id: string
  mark: string
}

interface GroupMember {
  id: string
  fullName: string
  lessons: Lesson[]
}
