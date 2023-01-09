import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  HostListener,
  Input,
  OnDestroy,
  OnInit
} from "@angular/core"
import {Journal, JournalCell, JournalRow} from "../../../../models/journal"
import {JournalCellService, Key} from "../../../../services/shared/journal/journal.cell.service"
import {JournalCollapseService} from "../../../../services/shared/journal/journal-collapse.service"
import {JournalDisplayModeService} from "../../../../services/shared/journal/journal-display-mode.service"
import {Entry} from "./base-journal-cell/journal-cell.component"
import {JournalColors} from "../../../../models/general"
import {SettingsService} from "../../../../services/ui/settings.service"
import {DialogService} from "../../../../services/ui/dialog.service"
import {JournalLessonService} from "../../../../services/shared/journal/journal-lesson.service"

@Component({
  selector: "app-base-journal",
  templateUrl: "./base-journal.component.html",
  styleUrls: ["./base-journal.component.scss"],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class BaseJournalComponent implements OnDestroy, OnInit {
  @Input() journal: Journal
  @Input() showAmount = false
  mode: string

  constructor(
    private cellService: JournalCellService,
    private collapseService: JournalCollapseService,
    private modeService: JournalDisplayModeService,
    private settingService: SettingsService,
    private modalService: DialogService,
    private lessonService: JournalLessonService,
    private cdr: ChangeDetectorRef
  ) {
    this.modalService.width = window.innerWidth
  }

  get journalColors(): JournalColors {
    return this.journal.info.studyPlace.journalColors
  }

  ngOnDestroy(): void {
    this.cellService.clearPoints()
    this.cellService.selectDate(null)

    this.cellService.key = "null"

    this.collapseService.type = "null"
    this.collapseService.collapsed = []
  }

  @HostListener("window:focus", ["'null'"])
  @HostListener("document:keyup.shift", ["'null'"])
  @HostListener("document:keyup.control", ["'null'"])
  @HostListener("document:keyup.meta", ["'null'"])
  @HostListener("document:keydown.shift", ["'shift'"])
  @HostListener("document:keydown.control", ["'control'"])
  @HostListener("document:keydown.meta", ["'control'"])
  keyEvent(key: Key) {
    this.cellService.key = key
    this.collapseService.key = key
  }

  @HostListener("window:resize", ["$event.target.innerWidth"])
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

  @HostListener("document:paste", ["$event"])
  paste(e: ClipboardEvent) {
    let tagName = (e.target as HTMLElement).tagName
    if (this.cellService.selectedDate$.value === null || tagName === "INPUT") return

    this.lessonService.parseTextColumn(e.clipboardData?.getData("text") ?? "")
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
    let amount = this.collapseService.getCollapseAmount(row.cells.flat())

    return row.marksAmount
      .filter(v => this.mode == "general" || !!marks.find(m => m.mark == v.mark))
      .map(v => <Entry>{
        text: this.mode === "standalone" ? `${v.amount.toString()}/${amount}` : v.amount.toString(),
        color: this.journalColors.general
      })
  }

  monthLessons(journal: Journal, i: number): JournalCell[][][] {
    return journal.rows.map(r => r.cells[i])
  }

  ngOnInit(): void {
    this.modeService.mode$.subscribe({
      next: mode => {
        this.mode = mode
        this.cdr.detectChanges()
      }
    })
  }
}
