import {Component, Input} from "@angular/core"
import {Lesson} from "../../../../../models/schedule"
import {
  JournalDisplayModeService,
  JournalMode,
} from "../../../../../services/shared/journal/journal-display-mode.service"
import {MarkType, StudyPlace} from "../../../../../models/general"

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

  availableMarks(): string[] {
    if (this.modeService.mode === "absences") return []

    const types = this.studyPlace.lessonTypes
    let marks: MarkType[] =
      this.modeService.mode === "general"
        ? types.flatMap((lt) => (lt.marks ?? []).concat(lt.standaloneMarks ?? []))
        : types.flatMap((lt) => lt.standaloneMarks ?? [])

    return marks.map((m) => m.mark).filter((m, i, a) => a.indexOf(m) === i) //distinct
  }
}
