import {Component, EventEmitter, Input, Output} from "@angular/core"
import {Lesson} from "../../../../../../models/schedule"
import {JournalDisplayModeService} from "../../../../../../services/ui/journal-display-mode.service"

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

  mapLesson = (lessons: Lesson): string[] => this.modeService.getEntries(lessons)
}
