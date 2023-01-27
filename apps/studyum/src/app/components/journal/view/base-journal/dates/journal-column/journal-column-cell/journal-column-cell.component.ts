import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  ElementRef,
  Input,
  OnInit,
  ViewChild,
} from "@angular/core"
import {JournalService} from "../../../../../../../services/shared/journal/journal.service"
import {
  JournalCellService,
  Key,
} from "../../../../../../../services/shared/journal/journal.cell.service"
import {JournalCollapseService} from "../../../../../../../services/shared/journal/journal-collapse.service"
import {JournalDisplayModeService} from "../../../../../../../services/shared/journal/journal-display-mode.service"
import {DialogService} from "../../../../../../../services/ui/dialog.service"
import {LessonType, StudyPlace} from "../../../../../../../models/general"
import {Entry} from "../../../base-journal-cell/journal-cell.component"
import {JournalMarksService} from "../../../../../../../services/shared/journal/journal-marks.service"
import {JournalCell} from "../../../../../../../models/journal"
import {KeyboardService} from "../../../../../../../services/shared/keyboard.service"

@Component({
  selector: "app-journal-column-cell",
  templateUrl: "./journal-column-cell.component.html",
  styleUrls: ["./journal-column-cell.component.scss"],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class JournalColumnCellComponent implements OnInit {
  @Input() cell: JournalCell

  @ViewChild("lessonInfoTemplate", {static: true}) lessonInfoRef: ElementRef
  @ViewChild("selectMarkTemplate", {static: true}) selectMarkRef: ElementRef

  key: Key

  isSelected = false
  isLastSelected = false

  entries: Entry[]
  color: string

  constructor(
    private journalService: JournalService,
    private cellService: JournalCellService,
    private collapseService: JournalCollapseService,
    private modeService: JournalDisplayModeService,
    private modalService: DialogService,
    private marksService: JournalMarksService,
    private keyboardService: KeyboardService,
    private cdr: ChangeDetectorRef
  ) {}

  get studyPlace(): StudyPlace {
    return this.journalService.journal.info.studyPlace
  }

  get lessonType(): LessonType | undefined {
    return this.studyPlace.lessonTypes.find(
      (v) => !!this.cell.type?.includes(v.type)
    )
  }

  get marks(): string[] {
    return this.lessonType?.marks?.map((m) => m.mark) ?? []
  }

  get standaloneMarks(): string[] {
    return this.lessonType?.standaloneMarks?.map((m) => m.mark) ?? []
  }

  get editable(): boolean {
    return this.journalService.journal.info.editable
  }

  onCellClick(e: any): void {
    this.cellService.selectDate(null)
    this.cellService.addPoint(this.cell.point!!)
  }

  clearSelectedPoints = () => this.cellService.clearPoints()

  isPopupOpen = () => this.modalService.openedModalRef !== null

  openLessonInfoPopup(): boolean {
    let openResult = this.modalService.openOnMinWidth(this.lessonInfoRef)
    if (openResult === null) return true

    openResult.subscribe({
      next: (_) => this.clearSelectedPoints(),
    })
    return true
  }

  openMarkPopup(): boolean {
    let openResult = this.modalService.openOnMinWidth(this.selectMarkRef)
    if (openResult === null) return true

    openResult.subscribe({
      next: (_) => this.clearSelectedPoints(),
    })
    return true
  }

  ngOnInit(): void {
    this.entries = this.modeService.getEntries(this.cell)
    this.color = this.modeService.cellColor(this.cell)

    this.marksService.refresh$.subscribe({
      next: (cell) => {
        if (
          this.cell.point?.x === cell.point?.x &&
          this.cell.point?.y === cell.point?.y
        ) {
          this.cell = cell

          this.entries = this.modeService.getEntries(cell)
          this.color = this.modeService.cellColor(cell)
          this.cdr.detectChanges()
        }
      },
    })

    this.keyboardService.key$.subscribe({
      next: (key) => {
        this.key = key

        if (!this.isLastSelected) return
        this.cdr.detectChanges()
      },
    })

    this.cellService.points$.subscribe({
      next: (points) => {
        let i = points.findIndex(
          (p) => p.y === this.cell.point?.y && p.x === this.cell.point?.x
        )
        if (i === -1 && !this.isSelected) return

        if (
          !(
            (i === -1 && this.isSelected) ||
            (i !== points.length - 1 && this.isLastSelected) ||
            (i === points.length - 1 && this.isSelected) ||
            (i !== -1 && !this.isSelected)
          )
        )
          return

        this.isSelected = i !== -1
        this.isLastSelected = this.isSelected && i === points.length - 1
        this.cdr.detectChanges()
      },
    })

    this.modeService.mode$.subscribe({next: (_) => this.cdr.detectChanges()})
  }
}
