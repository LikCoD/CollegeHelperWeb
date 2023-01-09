import {Component, EventEmitter, Input, OnInit, Output} from "@angular/core"
import {JournalDisplayModeService} from "../../../../services/shared/journal/journal-display-mode.service"
import {Entry} from "../../../journal/view/base-journal/base-journal-cell/journal-cell.component"
import {JournalLessonService} from "../../../../services/shared/journal/journal-lesson.service"
import {Observable, tap} from "rxjs"
import {Lesson} from "../../../../models/schedule"
import {JournalCell} from "../../../../models/journal"

@Component({
  selector: "app-lesson-info",
  templateUrl: "./lesson-info.component.html",
  styleUrls: ["./lesson-info.component.scss"]
})
export class LessonInfoComponent implements OnInit {
  @Input() lessonID: string
  @Output() close = new EventEmitter<null>()

  lessons$: Observable<Lesson[]>
  selectedLesson: Lesson | null

  constructor(
    private modeService: JournalDisplayModeService,
    private lessonService: JournalLessonService
  ) {
  }

  ngOnInit(): void {
    this.lessons$ = this.lessonService.getLessons(this.lessonID).pipe(tap(l => this.selectedLesson = l[0]))
  }

  getEntries(lesson: Lesson): Entry[] {
    return this.modeService.getEntries(lesson as JournalCell)
  }

  buttonBorderColor(lesson: Lesson) {
    return lesson.secondaryColor == "transparent" ? "black" : lesson.secondaryColor ?? 'black'
  }
}
