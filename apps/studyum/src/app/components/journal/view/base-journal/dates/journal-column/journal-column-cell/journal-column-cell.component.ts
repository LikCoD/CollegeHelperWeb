import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  ElementRef,
  Input,
  OnInit,
  ViewChild
} from "@angular/core"
import {Lesson} from "../../../../../../../models/schedule"
import {JournalService} from "../../../../../../../services/shared/journal/journal.service"
import {JournalCellService, Key} from "../../../../../../../services/shared/journal/journal.cell.service"
import {JournalCollapseService} from "../../../../../../../services/shared/journal/journal-collapse.service"
import {JournalDisplayModeService} from "../../../../../../../services/shared/journal/journal-display-mode.service"
import {DialogService} from "../../../../../../../services/ui/dialog.service"
import {LessonType, StudyPlace} from "../../../../../../../models/general"
import {Entry} from "../../../base-journal-cell/journal-cell.component"

@Component({
  selector: "app-journal-column-cell",
  templateUrl: "./journal-column-cell.component.html",
  styleUrls: ["./journal-column-cell.component.scss"],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class JournalColumnCellComponent implements OnInit {
  @Input() lesson: Lesson

  @ViewChild("lessonInfoTemplate", {static: true}) lessonInfoRef: ElementRef
  @ViewChild("selectMarkTemplate", {static: true}) selectMarkRef: ElementRef

  key: Key

  isSelected = false
  isLastSelected = false

  constructor(
    private journalService: JournalService,
    private cellService: JournalCellService,
    private collapseService: JournalCollapseService,
    private modeService: JournalDisplayModeService,
    private modalService: DialogService,
    private cdr: ChangeDetectorRef
  ) {
  }

  get studyPlace(): StudyPlace {
    return this.journalService.journal.info.studyPlace
  }

  get lessonType(): LessonType | undefined {
    return this.studyPlace.lessonTypes.find(v => v.type === this.lesson.type)
  }

  get marks(): string[] {
    return this.lessonType?.marks?.map(m => m.mark) ?? []
  }

  get standaloneMarks(): string[] {
    return this.lessonType?.standaloneMarks?.map(m => m.mark) ?? []
  }

  get editable(): boolean {
    return this.journalService.journal.info.editable
  }

  onCellClick(lesson: Lesson): void {
    this.cellService.selectDate(null)
    this.cellService.addPoint(lesson.point!!)
  }

  entries = (lesson: Lesson): Entry[] => this.modeService.getEntries(lesson)
  lessonColor = (lesson: Lesson): string => this.modeService.lessonColor(lesson)
  clearSelectedPoints = () => this.cellService.clearPoints()

  isPopupOpen = () => this.modalService.openedModalRef !== null

  openLessonInfoPopup(): boolean {
    let openResult = this.modalService.openOnMinWidth(this.lessonInfoRef)
    if (openResult === null) return true

    openResult.subscribe({
      next: _ => this.clearSelectedPoints()
    })
    return true
  }

  openMarkPopup(): boolean {
    let openResult = this.modalService.openOnMinWidth(this.selectMarkRef)
    if (openResult === null) return true

    openResult.subscribe({
      next: _ => this.clearSelectedPoints()
    })
    return true
  }

  ngOnInit(): void {
    this.cellService.key$.subscribe({
      next: key => {
        this.key = key

        if (!this.isLastSelected) return
        this.cdr.detectChanges()
      }
    })

    this.cellService.points$.subscribe({
      next: points => {
        let i = points.findIndex(p => p.y === this.lesson.point?.y && p.x === this.lesson.point?.x)
        if (i === -1 && !this.isSelected) return

        if (!(
          (i === -1 && this.isSelected) ||
          (i !== points.length - 1 && this.isLastSelected) ||
          (i === points.length - 1 && this.isSelected) ||
          (i !== -1 && !this.isSelected)
        )) return

        this.isSelected = i !== -1
        this.isLastSelected = this.isSelected && i === points.length - 1
        this.cdr.detectChanges()
      }
    })

    this.modeService.mode$.subscribe({next: _ => this.cdr.detectChanges()})
  }
}
