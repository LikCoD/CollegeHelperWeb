import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  HostListener,
  Input,
  OnDestroy,
  OnInit,
} from "@angular/core"
import {Journal, JournalCell} from "../../../../models/journal"
import {JournalCellService} from "../../../../services/shared/journal/journal.cell.service"
import {JournalCollapseService} from "../../../../services/shared/journal/journal-collapse.service"
import {
  JournalDisplayModeService,
  JournalMode,
} from "../../../../services/shared/journal/journal-display-mode.service"
import {MarkType} from "../../../../models/general"
import {SettingsService} from "../../../../services/ui/settings.service"
import {DialogService} from "../../../../services/ui/dialog.service"
import {JournalLessonService} from "../../../../services/shared/journal/journal-lesson.service"
import {JournalMarksService} from "../../../../services/shared/journal/journal-marks.service"
import {KeyboardService} from "../../../../services/shared/keyboard.service"

@Component({
  selector: "app-base-journal",
  templateUrl: "./base-journal.component.html",
  styleUrls: ["./base-journal.component.scss"],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class BaseJournalComponent implements OnDestroy, OnInit {
  @Input() journal: Journal
  @Input() showAmount = false
  mode: JournalMode
  showTitle: boolean = true

  constructor(
    private cellService: JournalCellService,
    private collapseService: JournalCollapseService,
    private modeService: JournalDisplayModeService,
    private settingService: SettingsService,
    private modalService: DialogService,
    private lessonService: JournalLessonService,
    private marksService: JournalMarksService,
    private keyboardService: KeyboardService,
    private cdr: ChangeDetectorRef
  ) {
    this.modalService.width = window.innerWidth
  }

  ngOnDestroy(): void {
    this.cellService.clearPoints()
    this.cellService.selectDate(null)

    this.keyboardService.key = "null"
    this.collapseService.type = "null"
    this.collapseService.collapsed = []
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

  availableMarks(): string[] {
    if (this.modeService.mode === "absences") return []

    const types = this.journal.info.studyPlace.lessonTypes
    let marks: MarkType[] =
      this.modeService.mode === "general"
        ? types.flatMap((lt) => (lt.marks ?? []).concat(lt.standaloneMarks ?? []))
        : types.flatMap((lt) => lt.standaloneMarks ?? [])

    return marks.map((m) => m.mark).filter((m, i, a) => a.indexOf(m) === i) //distinct
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
