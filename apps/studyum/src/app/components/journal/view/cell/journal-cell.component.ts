import {Component, Input} from "@angular/core"
import {JournalViewComponent} from "../view.component"
import {Lesson} from "../../../../models/schedule"

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

  @Input() x: number
  @Input() y: number

  constructor(public parent: JournalViewComponent) {
  }

  getEntries() {
    let marks = this.lesson.marks?.map(value => <Entry>{
      title: value.mark,
      studentID: value.studentID,
      lessonID: value.lessonID,
      studyPlaceID: value.studyPlaceID,
      id: value.id
    }) ?? []

    let absences = this.lesson.absences?.map(value => <Entry>{
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
