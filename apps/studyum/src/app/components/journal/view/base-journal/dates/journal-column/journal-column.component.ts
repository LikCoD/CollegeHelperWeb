import {Component, ElementRef, Input, ViewChild} from "@angular/core"
import {Lesson} from "../../../../../../models/schedule"
import {JournalCellService} from "../../../../../../services/shared/journal/journal.cell.service"
import {JournalService} from "../../../../../../services/shared/journal/journal.service"
import {LessonType, StudyPlace} from "../../../../../../models/general"
import * as moment from "moment"
import {JournalCollapseService} from "../../../../../../services/shared/journal/journal-collapse.service"
import {JournalDisplayModeService} from "../../../../../../services/shared/journal/journal-display-mode.service"
import {Entry} from "../../base-journal-cell/journal-cell.component"
import {DialogService} from "../../../../../../services/ui/dialog.service"

@Component({
  selector: "app-journal-column",
  templateUrl: "./journal-column.component.html",
  styleUrls: ["./journal-column.component.scss"]
})
export class JournalColumnComponent {
  @Input() date: Lesson
  @Input() lessons: Lesson[]

  @ViewChild('lessonDataTemplate', { static: true }) lessonDataRef: ElementRef;

  constructor(
    private journalService: JournalService,
    private cellService: JournalCellService,
    private collapseService: JournalCollapseService,
    private modeService: JournalDisplayModeService,
    private modalService: DialogService
  ) {
  }

  get selectedDate(): moment.Moment | null {
    return this.cellService.selectedDate
  }

  set selectedDate(date: moment.Moment | null) {
    this.clearSelectedPoints()
    this.cellService.selectedDate = date
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

  get editable(): boolean {
    return this.journalService.journal.info.editable
  }

  onDateClick(): void {
    this.selectedDate = this.date.startDate
    this.collapseService.click(this.date)
  }

  entries = (lesson: Lesson): Entry[] => this.modeService.getEntries(lesson)
  clearSelectedPoints = () => this.cellService.clear()

  isPopupOpen = () => this.modalService.openedModalRef !== null

  openLessonDataPopup(): boolean {
    let openResult = this.modalService.open(this.lessonDataRef)
    if (openResult === null) return true

    openResult.subscribe({
      next: _ => this.selectedDate = null
    })
    return true
  }
}
