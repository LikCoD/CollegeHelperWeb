import {Component, Input} from "@angular/core"
import {Lesson} from "../../../../../../models/schedule"

@Component({
  selector: "app-journal-month",
  templateUrl: "./journal-month.component.html",
  styleUrls: ["./journal-month.component.scss"]
})
export class JournalMonthComponent {
  @Input() month: Lesson[][]
  @Input() monthLessons: Lesson[][][]

  mapMonth(monthLesson: Lesson[][][], i: number): Lesson[][] {
    return monthLesson.map(l => l[i])
  }
}
