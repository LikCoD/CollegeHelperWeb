import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  HostListener,
  Input,
  OnDestroy,
  OnInit,
} from "@angular/core"
import {Journal} from "../../../../../shared/models/journal"
import {JournalCellService} from "../../../services/journal.cell.service"
import {JournalCollapseService} from "../../../services/journal-collapse.service"
import {
  JournalDisplayModeService,
  JournalMode,
} from "../../../services/journal-display-mode.service"
import {SettingsService} from "../../../../../shared/services/ui/settings.service"
import {DialogService} from "../../../../../shared/services/ui/dialog.service"
import {JournalLessonService} from "../../../services/journal-lesson.service"
import {JournalMarksService} from "../../../services/journal-marks.service"
import {KeyboardService} from "../../../../../shared/services/core/keyboard.service"

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

  ngOnInit(): void {
    this.modeService.mode$.subscribe({
      next: (mode) => {
        this.mode = mode
        this.cdr.detectChanges()
      },
    })
  }
}
