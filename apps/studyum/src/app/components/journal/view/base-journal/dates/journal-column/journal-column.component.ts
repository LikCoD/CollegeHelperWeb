import {Component, Input} from "@angular/core"
import {Lesson} from "../../../../../../models/schedule"
import {JournalCellService, Point} from "../../../../../../services/ui/journal.cell.service"
import {JournalService} from "../../../../../../services/shared/journal.service"
import {LessonType, StudyPlace} from "../../../../../../models/general"
import * as moment from "moment"

@Component({
  selector: "app-journal-column",
  templateUrl: "./journal-column.component.html",
  styleUrls: ["./journal-column.component.scss"]
})
export class JournalColumnComponent {
  @Input() date: Lesson
  @Input() lessons: Lesson[]

  constructor(private cellService: JournalCellService, private journalService: JournalService) {
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

  onCellClick(lesson: Lesson): void {
    this.cellService.selectedDate = null
    this.cellService.addPoint(lesson.point!!)
  }

  isSelected(point: Point): boolean {
    return !!this.cellService.selectedPoints.find(p => p.x === point.x && p.y === point.y)
  }

  mapLesson(lessons: Lesson): string[] {
    return lessons.marks?.map(v => v.mark) ?? []
  }

  clearSelectedPoints() {
    this.cellService.clear()
  }
}
