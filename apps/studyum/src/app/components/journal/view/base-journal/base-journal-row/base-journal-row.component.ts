import {Component, Input} from "@angular/core"
import {JournalCell, JournalRow} from "../../../../../models/journal"
import {Entry} from "../base-journal-cell/journal-cell.component"
import {SettingsService} from "../../../../../services/ui/settings.service"
import {JournalColors, MarkType, StudyPlace} from "../../../../../models/general"
import {
  JournalDisplayModeService,
  JournalMode,
} from "../../../../../services/shared/journal/journal-display-mode.service"

@Component({
  selector: "app-base-journal-row",
  templateUrl: "./base-journal-row.component.html",
  styleUrls: ["./base-journal-row.component.scss"],
})
export class BaseJournalRowComponent {
  @Input() studyPlace: StudyPlace
  @Input() row: JournalRow

  @Input() mode: JournalMode
  @Input() showAmount: boolean

  get colors(): JournalColors {
    return this.studyPlace.journalColors
  }

  constructor(
    private settingsService: SettingsService,
    private modeService: JournalDisplayModeService
  ) {}

  get average(): Entry {
    let locale = this.settingsService.localeCode
    return {
      text: this.row.averageMark.toLocaleString(locale, {minimumFractionDigits: 2}),
      color: this.studyPlace.journalColors.general,
    }
  }

  get availableMarks(): Entry[] {
    if (this.mode === "absences") return []

    const types = this.studyPlace.lessonTypes
    let marks: MarkType[] =
      this.mode === "general"
        ? types.flatMap((lt) => (lt.marks ?? []).concat(lt.standaloneMarks ?? []))
        : types.flatMap((lt) => lt.standaloneMarks ?? [])

    return marks
      .map((m) => m.mark)
      .filter((m, i, a) => a.indexOf(m) === i) //distinct
      .map(
        (m) =>
          <Entry>{
            text: this.row.marksAmount[m]?.toString() ?? "0",
            color: this.colors.general,
          }
      )
  }

  asCell = (cell: any): JournalCell => cell as JournalCell
  showColumn = (cell: JournalCell): boolean => this.modeService.showColumn(cell)
  collapsedEntries = (cell: JournalCell): Entry[] => this.modeService.getEntries(cell)
  collapsedColor = (cell: JournalCell): string => this.modeService.cellColor(cell)
}
