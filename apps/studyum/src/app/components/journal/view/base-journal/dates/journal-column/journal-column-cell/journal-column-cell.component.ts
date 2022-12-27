import {Component, ElementRef, Input, ViewChild} from "@angular/core"
import {Lesson} from "../../../../../../../models/schedule"
import {JournalService} from "../../../../../../../services/shared/journal/journal.service"
import {JournalCellService, Point} from "../../../../../../../services/shared/journal/journal.cell.service"
import {JournalCollapseService} from "../../../../../../../services/shared/journal/journal-collapse.service"
import {JournalDisplayModeService} from "../../../../../../../services/shared/journal/journal-display-mode.service"
import {DialogService} from "../../../../../../../services/ui/dialog.service"
import {LessonType, StudyPlace} from "../../../../../../../models/general"
import {Entry} from "../../../base-journal-cell/journal-cell.component"

@Component({
  selector: "app-journal-column-cell",
  templateUrl: "./journal-column-cell.component.html",
  styleUrls: ["./journal-column-cell.component.scss"],
})
export class JournalColumnCellComponent {
  @Input() lesson: Lesson

  @ViewChild('lessonInfoTemplate', { static: true }) lessonInfoRef: ElementRef;
  @ViewChild('selectMarkTemplate', { static: true }) selectMarkRef: ElementRef;

  constructor(
    private journalService: JournalService,
    private cellService: JournalCellService,
    private collapseService: JournalCollapseService,
    private modeService: JournalDisplayModeService,
    private modalService: DialogService
  ) {
  }

  get shiftPressed() {
    return this.collapseService.isShiftPressed
  }

  get controlPressed() {
    return this.collapseService.isControlPressed
  }

  get lastSelectedPoint(): Point {
    return this.cellService.lastSelectedPoint
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

  isLastSelected(point: Point): boolean {
    let last = this.lastSelectedPoint
    return last != null && point.x === last.x && point.y == last.y
  }

  onCellClick(lesson: Lesson): void {
    this.cellService.selectedDate = null
    this.cellService.addPoint(lesson.point!!)
  }

  isSelected(point: Point): boolean {
    return !!this.cellService.selectedPoints.find(p => p.x === point.x && p.y === point.y)
  }

  entries = (lesson: Lesson): Entry[] => this.modeService.getEntries(lesson)
  lessonColor = (lesson: Lesson): string => this.modeService.lessonColor(lesson)
  clearSelectedPoints = () => this.cellService.clear()

  isPopupOpen = () => this.modalService.openedModalRef !== null

  openLessonInfoPopup(): boolean {
    let openResult = this.modalService.openOnMinWidth(this.lessonInfoRef)
    if (openResult === null) return true

    openResult.subscribe({
      next: _ => this.cellService.clear()
    })
    return true
  }

  openMarkPopup(): boolean {
    let openResult = this.modalService.openOnMinWidth(this.selectMarkRef)
    if (openResult === null) return true

    openResult.subscribe({
      next: _ => this.cellService.clear()
    })
    return true
  }
}
