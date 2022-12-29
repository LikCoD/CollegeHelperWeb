import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  ElementRef,
  Input,
  OnInit,
  ViewChild
} from "@angular/core"
import {Lesson} from "../../../../../../models/schedule"
import {JournalCellService} from "../../../../../../services/shared/journal/journal.cell.service"
import {JournalService} from "../../../../../../services/shared/journal/journal.service"
import {LessonType, StudyPlace} from "../../../../../../models/general"
import {JournalCollapseService} from "../../../../../../services/shared/journal/journal-collapse.service"
import {JournalDisplayModeService} from "../../../../../../services/shared/journal/journal-display-mode.service"
import {Entry} from "../../base-journal-cell/journal-cell.component"
import {DialogService} from "../../../../../../services/ui/dialog.service"

@Component({
  selector: "app-journal-column",
  templateUrl: "./journal-column.component.html",
  styleUrls: ["./journal-column.component.scss"],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class JournalColumnComponent implements OnInit {
  @Input() date: Lesson
  @Input() lessons: Lesson[]

  @ViewChild("lessonDataTemplate", {static: true}) lessonDataRef: ElementRef

  dateSelected = false

  constructor(
    private journalService: JournalService,
    private cellService: JournalCellService,
    private collapseService: JournalCollapseService,
    private modeService: JournalDisplayModeService,
    private modalService: DialogService,
    private cdr: ChangeDetectorRef
  ) {
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

  ngOnInit(): void {
    this.cellService.selectedDate$.subscribe({
      next: date => {
        if (
          (date === this.date.startDate && this.dateSelected) ||
          (date !== this.date.startDate && !this.dateSelected)
        ) return

        this.dateSelected = date === this.date.startDate
        this.cdr.detectChanges()
      }
    })
  }

  onDateClick(): void {
    this.cellService.selectDate(this.date.startDate)
    this.collapseService.click(this.date)
  }

  entries = (lesson: Lesson): Entry[] => this.modeService.getEntries(lesson)
  clearSelectedPoints = () => this.cellService.clearPoints()

  isPopupOpen = () => this.modalService.openedModalRef !== null

  openLessonDataPopup(): boolean {
    let openResult = this.modalService.openOnMinWidth(this.lessonDataRef)
    if (openResult === null) return true

    openResult.subscribe({
      next: _ => this.clearSelectedPoints()
    })
    return true
  }

  closeDatePopup(): void {
    this.cellService.selectDate(null)
  }
}
