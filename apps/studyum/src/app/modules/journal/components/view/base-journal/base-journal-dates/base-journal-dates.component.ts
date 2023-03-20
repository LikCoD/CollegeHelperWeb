import {Component, Input} from "@angular/core"
import {Lesson} from "../../../../../../shared/models/schedule"
import {
  JournalDisplayModeService,
  JournalMode,
} from "../../../../services/journal-display-mode.service"
import {MarkType, StudyPlace} from "../../../../../../shared/models/general"
import {JournalCell} from "../../../../../../shared/models/journal"
import {CollapseType} from "../../../../services/journal-collapse.service"

@Component({
  selector: "app-base-journal-dates",
  templateUrl: "./base-journal-dates.component.html",
  styleUrls: ["./base-journal-dates.component.scss"],
})
export class BaseJournalDatesComponent {
  @Input() studyPlace: StudyPlace
  @Input() dates: Lesson[][][]

  @Input() mode: JournalMode
  @Input() showAmount: boolean

  constructor(private modeService: JournalDisplayModeService) {}

  showColumn = (date: Lesson) => this.modeService.showColumn(date as JournalCell)

  availableMarks(): string[] {
    if (this.modeService.mode === "absences") return []

    const types = this.studyPlace.lessonTypes
    let marks: MarkType[] =
      this.modeService.mode === "general"
        ? types.flatMap((lt) => (lt.marks ?? []).concat(lt.standaloneMarks ?? []))
        : types.flatMap((lt) => lt.standaloneMarks ?? [])

    return marks.map((m) => m.mark).filter((m, i, a) => a.indexOf(m) === i) //distinct
  }

  asLesson = (cell: any): Lesson => cell as Lesson

  displayDate(type: CollapseType): string {
    switch (type) {
      case "day":
        return "MMM[\r\n]dd DD"
      case "month":
        return "MMM"
      default:
        return "MMM[\r\n]DD YY"
    }
  }
}
