import {Component, Input} from "@angular/core"
import {Lesson} from "../../../../../../models/schedule"
import {JournalCellService, Point} from "../../../../../../services/shared/journal/journal.cell.service"
import {JournalService} from "../../../../../../services/shared/journal/journal.service"
import {LessonType, StudyPlace} from "../../../../../../models/general"
import * as moment from "moment"
import {JournalCollapseService} from "../../../../../../services/shared/journal/journal-collapse.service"
import {JournalDisplayModeService} from "../../../../../../services/shared/journal/journal-display-mode.service"
import {Entry} from "../../base-journal-cell/journal-cell.component"

@Component({
  selector: "app-journal-column",
  templateUrl: "./journal-column.component.html",
  styleUrls: ["./journal-column.component.scss"]
})
export class JournalColumnComponent {
  @Input() date: Lesson
  @Input() lessons: Lesson[]

  constructor(
    private journalService: JournalService,
    private cellService: JournalCellService,
    private collapseService: JournalCollapseService,
    private modeService: JournalDisplayModeService
  ) {
  }

  get shiftPressed() {
    return this.collapseService.isShiftPressed
  }

  get controlPressed() {
    return this.collapseService.isControlPressed
  }

  get selectedDate(): moment.Moment | null {
    return this.cellService.selectedDate
  }

  set selectedDate(date: moment.Moment | null) {
    this.clearSelectedPoints()
    this.cellService.selectedDate = date
  }

  get lastSelectedPoint(): Point {
    return this.cellService.lastSelectedPoint
  }

  get studyPlace(): StudyPlace {
    return this.journalService.journal.info.studyPlace
  }

  get lessonType(): LessonType | undefined {
    return this.studyPlace.lessonTypes.find(v => v.type === this.date.type)
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

  onDateClick(): void {
    this.selectedDate = this.date.startDate
    this.collapseService.click(this.date)
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
}
