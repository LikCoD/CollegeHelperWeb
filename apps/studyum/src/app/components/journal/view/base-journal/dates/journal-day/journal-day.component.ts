import {ChangeDetectionStrategy, Component, Input} from "@angular/core"
import {Lesson} from "../../../../../../models/schedule"
import {JournalCollapseService} from "../../../../../../services/shared/journal/journal-collapse.service"
import {JournalDisplayModeService} from "../../../../../../services/shared/journal/journal-display-mode.service"

@Component({
  selector: "app-journal-day",
  templateUrl: "./journal-day.component.html",
  styleUrls: ["./journal-day.component.scss"],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class JournalDayComponent {
  @Input() day: Lesson[]
  @Input() dayLessons: Lesson[][]

  constructor(private service: JournalCollapseService, private modeService: JournalDisplayModeService) {
  }

  get collapsed(): boolean {
    return this.service.getLessonCollapseType(this.day[0]) === "day"
  }

  get collapseAmount(): number {
    return this.service.getCollapseAmount(this.day)
  }

  mapDay(i: number): Lesson[] {
    return this.dayLessons.map(d => d[i])
  }

  mapCollapse = (): Lesson[] => this.service.buildLessons(this.dayLessons)

  dateClick(): void {
    return this.service.click(this.day[0])
  }

  showColumn = (date: Lesson) => this.modeService.showColumn(date)
}
