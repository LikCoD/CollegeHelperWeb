import {Component, Input} from "@angular/core"
import {Lesson} from "../../../../../../models/schedule"

@Component({
  selector: "app-journal-column",
  templateUrl: "./journal-column.component.html",
  styleUrls: ["./journal-column.component.scss"],
})
export class JournalColumnComponent {
  @Input() date: Lesson
  @Input() lessons: Lesson[]

  mapLesson(lessons: Lesson): string[] {
    return lessons.marks?.map(v => v.mark) ?? []
  }
}
