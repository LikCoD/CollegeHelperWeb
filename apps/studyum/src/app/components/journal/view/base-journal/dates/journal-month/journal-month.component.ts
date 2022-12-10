import {Component, Input} from "@angular/core"
import {Lesson} from "../../../../../../models/schedule"
import {JournalCollapseService} from "../../../../../../services/ui/journal-collapse.service"

@Component({
  selector: "app-journal-month",
  templateUrl: "./journal-month.component.html",
  styleUrls: ["./journal-month.component.scss"]
})
export class JournalMonthComponent {
  @Input() month: Lesson[][]
  @Input() monthLessons: Lesson[][][]

  constructor(private service: JournalCollapseService) {
  }

  get collapsed(): boolean {
    return this.service.getLessonCollapseType(this.month[0][0]) === "month"
  }

  get collapseAmount(): number {
    return this.month.reduce((s, m) => s + m.length, 0)
  }

  mapMonth(monthLesson: Lesson[][][], i: number): Lesson[][] {
    return monthLesson.map(l => l[i])
  }

  mapCollapse(): Lesson[] {
    return this.monthLessons.map(d => d[0][0])
  }

  dateClick(): void {
    return this.service.click(this.month[0][0])
  }
}
