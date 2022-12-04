import {Component, Input} from "@angular/core"
import {Lesson} from "../../../../../../models/schedule"

@Component({
  selector: "app-journal-day",
  templateUrl: "./journal-day.component.html",
  styleUrls: ["./journal-day.component.scss"]
})
export class JournalDayComponent {
  @Input() day: Lesson[]
  @Input() dayLessons: Lesson[][]

  mapDay(day: Lesson[][], i: number): Lesson[] {
    return day.map(d => d[i])
  }
}
