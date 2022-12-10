import {Component, EventEmitter, Input, Output} from "@angular/core"
import {Lesson} from "../../../../../../models/schedule"

@Component({
  selector: "app-journal-collapse-column",
  templateUrl: "./journal-collapse-column.component.html",
  styleUrls: ["./journal-collapse-column.component.scss"]
})
export class JournalCollapseColumnComponent {
  @Input() date: string
  @Input() lessons: Lesson[]
  @Input() amount: number

  @Output() dateClick = new EventEmitter()

  mapLesson(lessons: Lesson): string[] {
    return lessons.marks?.map(v => v.mark) ?? []
  }
}
