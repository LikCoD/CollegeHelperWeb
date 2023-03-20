import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  ElementRef,
  Input,
  OnInit,
  ViewChild,
} from "@angular/core"
import {Lesson} from "../../../../../../../shared/models/schedule"
import {JournalCellService} from "../../../../../services/journal.cell.service"
import {JournalService} from "../../../../../services/journal.service"
import {LessonType, StudyPlace} from "../../../../../../../shared/models/general"
import {JournalCollapseService} from "../../../../../services/journal-collapse.service"
import {JournalDisplayModeService} from "../../../../../services/journal-display-mode.service"
import {DialogService} from "../../../../../../../shared/services/ui/dialog.service"
import {JournalCell} from "../../../../../../../shared/models/journal"

@Component({
  selector: "app-base-journal-date",
  templateUrl: "./base-journal-date.component.html",
  styleUrls: ["./base-journal-date.component.scss"],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class BaseJournalDateComponent implements OnInit {
  @Input() date: Lesson
  @Input() lessons: JournalCell[]

  @ViewChild("lessonDataTemplate", {static: true}) lessonDataRef: ElementRef

  dateSelected = false

  constructor(
    private journalService: JournalService,
    private cellService: JournalCellService,
    private collapseService: JournalCollapseService,
    private modeService: JournalDisplayModeService,
    private modalService: DialogService,
    private cdr: ChangeDetectorRef
  ) {}

  get studyPlace(): StudyPlace {
    return this.journalService.journal.info.studyPlace
  }

  get lessonType(): LessonType | undefined {
    return this.studyPlace.lessonTypes.find((v) => v.type === this.date.type)
  }

  get marks(): string[] {
    return this.lessonType?.marks?.map((m) => m.mark) ?? []
  }

  get editable(): boolean {
    return this.journalService.journal.info.editable
  }

  ngOnInit(): void {
    this.cellService.selectedDate$.subscribe({
      next: (date) => {
        if (
          (date?.startDate === this.date.startDate && this.dateSelected) ||
          (date?.startDate !== this.date.startDate && !this.dateSelected)
        )
          return

        this.dateSelected = date?.startDate === this.date.startDate
        this.cdr.detectChanges()
      },
    })
  }

  onDateClick(): void {
    this.cellService.selectDate(this.date)
    this.collapseService.click(this.date.point!)
  }

  clearSelectedPoints = () => this.cellService.clearPoints()

  isPopupOpen = () => this.modalService.openedModalRef !== null

  openLessonDataPopup(): boolean {
    let openResult = this.modalService.openOnMinWidth(this.lessonDataRef)
    if (openResult === null) return true

    openResult.subscribe({
      next: (_) => this.clearSelectedPoints(),
    })
    return true
  }

  closeDatePopup(): void {
    this.cellService.selectDate(null)
  }
}
