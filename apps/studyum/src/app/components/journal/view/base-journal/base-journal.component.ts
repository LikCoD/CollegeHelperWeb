import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  HostListener,
  Input,
  OnDestroy,
  OnInit,
} from "@angular/core"
import {Journal, JournalCell, JournalRow} from "../../../../models/journal"
import {
  JournalCellService,
  Key,
} from "../../../../services/shared/journal/journal.cell.service"
import {JournalCollapseService} from "../../../../services/shared/journal/journal-collapse.service"
import {JournalDisplayModeService} from "../../../../services/shared/journal/journal-display-mode.service"
import {Entry} from "./base-journal-cell/journal-cell.component"
import {JournalColors, MarkType} from "../../../../models/general"
import {SettingsService} from "../../../../services/ui/settings.service"
import {DialogService} from "../../../../services/ui/dialog.service"
import {JournalLessonService} from "../../../../services/shared/journal/journal-lesson.service"
import {JournalMarksService} from "../../../../services/shared/journal/journal-marks.service"

@Component({
  selector: "app-base-journal",
  templateUrl: "./base-journal.component.html",
  styleUrls: ["./base-journal.component.scss"],
  changeDetection: ChangeDetectionStrategy.OnPush,
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
    private marksService: JournalMarksService,
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
    if (this.cellService.selectedDate$.value === null || tagName === "INPUT")
      return

    this.lessonService.parseTextColumn(e.clipboardData?.getData("text") ?? "")
  }

  getAverage(row: JournalRow): Entry {
    let locale = this.settingService.localeCode
    return {
      text: row.averageMark.toLocaleString(locale, {minimumFractionDigits: 2}),
      color: this.journalColors.general,
    }
  }

  availableMarks(): string[] {
    if (this.modeService.mode === "absences") return []

    const types = this.journal.info.studyPlace.lessonTypes
    let marks: MarkType[] =
      this.modeService.mode === "general"
        ? types.flatMap((lt) =>
            (lt.marks ?? []).concat(lt.standaloneMarks ?? [])
          )
        : types.flatMap((lt) => lt.standaloneMarks ?? [])

    return marks.map((m) => m.mark).filter((m, i, a) => a.indexOf(m) === i) //distinct
  }

  marksAmount(row: JournalRow, mark: string): Entry {
    return {
      text: row.marksAmount[mark]?.toString() ?? "0",
      color: this.journal.info.studyPlace.journalColors.general,
    }
  }

  monthLessons(journal: Journal, i: number): JournalCell[][][] {
    return journal.rows.map((r) => r.cells[i])
  }

  ngOnInit(): void {
    this.modeService.mode$.subscribe({
      next: (mode) => {
        this.mode = mode
        this.cdr.detectChanges()
      },
    })
  }
}
