import {Component, Input} from "@angular/core"
import {Lesson} from "../../../../../../models/schedule"
import {JournalCellService, Point} from "../../../../../../services/ui/journal.cell.service"

@Component({
  selector: "app-journal-column",
  templateUrl: "./journal-column.component.html",
  styleUrls: ["./journal-column.component.scss"]
})
export class JournalColumnComponent {
  @Input() date: Lesson
  @Input() lessons: Lesson[]

  constructor(private cellService: JournalCellService) {
  }

  onClick(lesson: Lesson): void {
    this.cellService.addPoint(lesson.point!!)
  }

  isSelected(point: Point): boolean {
    return !!this.cellService.selectedPoints.find(p => p.x === point.x && p.y === point.y)
  }

  mapLesson(lessons: Lesson): string[] {
    return lessons.marks?.map(v => v.mark) ?? []
  }
}
