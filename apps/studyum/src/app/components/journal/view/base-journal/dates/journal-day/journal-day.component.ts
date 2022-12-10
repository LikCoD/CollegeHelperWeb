import {Component, Input} from "@angular/core"
import {Lesson} from "../../../../../../models/schedule"
import {JournalCollapseService} from "../../../../../../services/ui/journal-collapse.service"

@Component({
  selector: "app-journal-day",
  templateUrl: "./journal-day.component.html",
  styleUrls: ["./journal-day.component.scss"]
})
export class JournalDayComponent {
  @Input() day: Lesson[]
  @Input() dayLessons: Lesson[][]

  constructor(private service: JournalCollapseService) {
  }

  get collapsed(): boolean {
    return this.service.getLessonCollapseType(this.day[0]) === "day"
  }

  mapDay(i: number): Lesson[] {
    return this.dayLessons.map(d => d[i])
  }

  mapCollapse(): Lesson[] {
    return this.dayLessons.map(d => d[0])
  }

  dateClick(): void {
    return this.service.click(this.day[0])
  }
}
