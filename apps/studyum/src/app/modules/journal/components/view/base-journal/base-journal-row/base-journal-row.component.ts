import {Component, Input} from "@angular/core"
import {JournalCell, JournalRow} from "../../../../../../shared/models/journal"
import {Entry} from "../base-journal-cell/journal-cell.component"
import {SettingsService} from "../../../../../../shared/services/ui/settings.service"
import {JournalColors, MarkType, StudyPlace} from "../../../../../../shared/models/general"
import {
  JournalDisplayModeService,
  JournalMode,
} from "../../../../services/journal-display-mode.service"

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

  get title(): string {
    const i = this.row.cells.flat(3)[0]?.point?.y ?? 0
    return `${i + 1} ${this.row.title}`
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

  get availableMarks(): {text: string; entry: Entry}[] {
    if (this.mode === "absences") return []

    const types = this.studyPlace.lessonTypes
    let marks: MarkType[] =
      this.mode === "general"
        ? types.flatMap((lt) => (lt.marks ?? []).concat(lt.standaloneMarks ?? []))
        : types.flatMap((lt) => lt.standaloneMarks ?? [])

    return marks
      .map((m) => m.mark)
      .filter((m, i, a) => a.indexOf(m) === i) //distinct
      .map((m) => {
        const entry = {
          text: this.row.marksAmount[m]?.toString() ?? "0",
          color: this.colors.general,
        }

        return {entry: entry, text: m}
      })
  }

  asCell = (cell: any): JournalCell => cell as JournalCell
  showColumn = (cell: JournalCell): boolean => this.modeService.showColumn(cell)
  collapsedEntries = (cell: JournalCell): Entry[] => this.modeService.getEntries(cell)
  collapsedColor = (cell: JournalCell): string => this.modeService.cellColor(cell)
}
