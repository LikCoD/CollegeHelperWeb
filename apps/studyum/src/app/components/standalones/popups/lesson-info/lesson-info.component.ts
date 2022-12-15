import {Component, EventEmitter, Input, Output} from "@angular/core"
import {Lesson} from "../../../../models/schedule"
import {JournalDisplayModeService} from "../../../../services/ui/journal-display-mode.service"
import {Entry} from "../../../journal/view/base-journal/base-journal-cell/journal-cell.component"

@Component({
  selector: "app-lesson-info",
  templateUrl: "./lesson-info.component.html",
  styleUrls: ["./lesson-info.component.scss"],
})
export class LessonInfoComponent {
  @Input() lesson: Lesson

  @Output() close = new EventEmitter<null>()

  constructor(private modeService: JournalDisplayModeService) {
  }

  get entries(): Entry[] {
    return this.modeService.getEntries(this.lesson)
  }
}
