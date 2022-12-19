import {Component, EventEmitter, Input, Output} from "@angular/core"
import {Lesson} from "../../../../../../models/schedule"
import {JournalDisplayModeService} from "../../../../../../services/shared/journal/journal-display-mode.service"
import {Entry} from "../../base-journal-cell/journal-cell.component"

@Component({
  selector: "app-journal-collapse-column",
  templateUrl: "./journal-collapse-column.component.html",
  styleUrls: ["./journal-collapse-column.component.scss"]
})
export class JournalCollapseColumnComponent {
  @Input() date: string
  @Input() lessons: Lesson[]
  @Input() amount: number

  @Output() dateClick = new EventEmitter()

  constructor(private modeService: JournalDisplayModeService) {
  }

  entries = (lesson: Lesson): Entry[] => this.modeService.getEntries(lesson)
  lessonColor = (lesson: Lesson): string => this.modeService.lessonColor(lesson, true)
}
