import {Component, Input} from "@angular/core"
import {JournalViewComponent} from "../view.component"
import {Lesson} from "../../../../models/schedule"
import {JournalMode, LessonType} from "../../../../models/general"

@Component({
  selector: "app-journal-cell",
  templateUrl: "./journal-cell.component.html",
  styleUrls: ["./journal-cell.component.scss"]
})
export class JournalCellComponent {
  @Input() lesson: Lesson
  @Input() userId: string
  @Input() absenceMark: string
  @Input() show: boolean = true
  @Input() mode: JournalMode
  @Input() lessonTypes: LessonType[]

  @Input() x: number
  @Input() y: number

  constructor(public parent: JournalViewComponent) {
  }

  getType() {
    return this.lessonTypes.find(v => v.type == this.lesson.type)
  }

  getEntries() {
    let type = this.getType()!!

    let marks = this.lesson.marks
      ?.filter(v => this.mode == "general" || (this.mode == "standalone" && type.standaloneMarks.find(t => t.mark == v.mark)))
      ?.map(value => <Entry>{
        title: value.mark,
        studentID: value.studentID,
        lessonID: value.lessonID,
        studyPlaceID: value.studyPlaceID,
        id: value.id
      }) ?? []

    if (this.mode == "standalone") return marks

    let absences = this.lesson.absences
      ?.map(value => <Entry>{
        title: value.time ?? this.absenceMark,
        studentID: value.studentID,
        lessonID: value.lessonID,
        studyPlaceID: value.studyPlaceID,
        id: value.id
      }) ?? []

    return marks.concat(absences)
  }
}

interface Entry {
  title: string;
  studentID: string;
  lessonID: string;
  studyPlaceID: string;
  id?: string;
}
