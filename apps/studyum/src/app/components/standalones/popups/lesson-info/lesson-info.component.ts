import {Component, EventEmitter, Input, OnInit, Output} from "@angular/core"
import {JournalDisplayModeService} from "../../../../services/shared/journal/journal-display-mode.service"
import {Entry} from "../../../journal/view/base-journal/base-journal-cell/journal-cell.component"
import {JournalLessonService} from "../../../../services/shared/journal/journal-lesson.service"
import {Observable} from "rxjs"
import {Lesson} from "../../../../models/schedule"

@Component({
  selector: "app-lesson-info",
  templateUrl: "./lesson-info.component.html",
  styleUrls: ["./lesson-info.component.scss"]
})
export class LessonInfoComponent implements OnInit {
  @Input() lessonID: string
  @Output() close = new EventEmitter<null>()

  lesson$: Observable<Lesson>

  constructor(
    private modeService: JournalDisplayModeService,
    private lessonService: JournalLessonService
  ) {
  }

  getEntries(lesson: Lesson): Entry[] {
    return this.modeService.getEntries(lesson)
  }

  ngOnInit(): void {
    this.lesson$ = this.lessonService.getLesson(this.lessonID)
  }
}
