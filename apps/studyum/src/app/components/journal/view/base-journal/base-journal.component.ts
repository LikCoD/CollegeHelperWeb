import {ChangeDetectionStrategy, Component, HostListener, Input} from "@angular/core"
import {Lesson} from "../../../../models/schedule"
import {Journal, JournalRow} from "../../../../models/journal"
import {JournalCellService, Key} from "../../../../services/shared/journal/journal.cell.service"
import {JournalCollapseService} from "../../../../services/shared/journal/journal-collapse.service"
import {JournalDisplayModeService, JournalMode} from "../../../../services/shared/journal/journal-display-mode.service"
import {Entry} from "./base-journal-cell/journal-cell.component"
import {JournalColors} from "../../../../models/general"
import {SettingsService} from "../../../../services/ui/settings.service"
import {DialogService} from "../../../../services/ui/dialog.service"

@Component({
  selector: "app-base-journal",
  templateUrl: "./base-journal.component.html",
  styleUrls: ["./base-journal.component.scss"],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class BaseJournalComponent {

  @Input() journal: Journal
  @Input() showAmount = false

  constructor(
    private cellService: JournalCellService,
    private collapseService: JournalCollapseService,
    private modeService: JournalDisplayModeService,
    private settingService: SettingsService,
    private modalService: DialogService
  ) {
    this.modalService.width = window.innerWidth
  }

  get mode(): JournalMode {
    return this.modeService.mode
  }

  get journalColors(): JournalColors {
    return this.journal.info.studyPlace.journalColors
  }

  @HostListener("document:keyup.shift", ["false", "'shift'"])
  @HostListener("document:keyup.control", ["false", "'control'"])
  @HostListener("document:keyup.meta", ["false", "'control'"])
  @HostListener("document:keydown.shift", ["true", "'shift'"])
  @HostListener("document:keydown.control", ["true", "'control'"])
  @HostListener("document:keydown.meta", ["true", "'control'"])
  keyEvent(down: boolean, key: Key) {
    if (key == "shift") this.collapseService.isShiftPressed = down
    if (key == "control") this.collapseService.isControlPressed = down

    if (down) this.cellService.key = key
    else this.cellService.key = "null"
  }

  @HostListener('window:resize', ['$event.target.innerWidth'])
  resizeEvent(width: number) {
    this.modalService.width = width
  }

  @HostListener("document:keydown.arrowUp", ["0", "-1"])
  @HostListener("document:keydown.arrowRight", ["1", "0"])
  @HostListener("document:keydown.arrowDown", ["0", "1"])
  @HostListener("document:keydown.arrowLeft", ["-1", "0"])
  arrowEvent(x: number, y: number) {
    this.cellService.moveBy(x, y)
  }

  getAverage(row: JournalRow): Entry {
    if (row.numericMarksAmount == 0) return {text: "-", color: this.journalColors.general}

    let locale = this.settingService.localeCode
    return {
      text: (row.numericMarksSum / row.numericMarksAmount).toLocaleString(locale, {minimumFractionDigits: 2}),
      color: this.journalColors.general
    }
  }

  marksAmountText(): string[] {
    let type = this.journal.info.studyPlace.lessonTypes
      .find(t => t.type == this.modeService.selectedStandaloneType?.type)

    let marks = type?.standaloneMarks ? type.standaloneMarks : type?.marks ?? []

    return this.journal.rows[0].marksAmount
      .filter(v => this.mode == "general" || !!marks.find(m => m.mark == v.mark))
      .map(v => v.mark)
  }

  marksAmount(row: JournalRow): Entry[] {
    let type = this.journal.info.studyPlace.lessonTypes
      .find(t => t.type == this.modeService.selectedStandaloneType?.type)

    let marks = type?.standaloneMarks ? type.standaloneMarks : type?.marks ?? []
    let amount = this.collapseService.getCollapseAmount(row.lessons.flat())

    return row.marksAmount
      .filter(v => this.mode == "general" || !!marks.find(m => m.mark == v.mark))
      .map(v => <Entry>{
        text: this.mode === "standalone" ? `${v.amount.toString()}/${amount}` : v.amount.toString(),
        color: this.journalColors.general
      })
  }

  monthLessons(journal: Journal, i: number): Lesson[][][] {
    return journal.rows.map(r => r.lessons[i])
  }
}
