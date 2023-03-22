import {Component, ElementRef, EventEmitter, Input, OnInit, Output, ViewChild} from "@angular/core"
import {Cell, Lesson} from "../../../../../apps/studyum/src/app/shared/models/schedule"
import {Observable} from "rxjs"
import {Key} from "../../../../../apps/studyum/src/app/modules/journal/services/journal.cell.service"
import {ScheduleSubjectComponent} from "../../../../../apps/studyum/src/app/modules/schedule/components/schedule-subject/schedule-subject.component"
import {DialogService} from "../../../../../apps/studyum/src/app/shared/services/ui/dialog.service"
import {ScheduleService} from "../../../../../apps/studyum/src/app/modules/schedule/servieces/schedule.service"
import {KeyboardService} from "../../../../../apps/studyum/src/app/shared/services/core/keyboard.service"

@Component({
  selector: "schdl-cell",
  templateUrl: "./cell.component.html",
  styleUrls: ["./cell.component.scss"],
})
export class CellComponent implements OnInit {
  @Input() cell: Cell
  @Input() isEditMode: boolean

  @Output() delete = new EventEmitter<null>()
  @Output() edit = new EventEmitter<null>()

  height: number

  selectedSubjectIndex = 0

  lessons: Lesson[][] = []

  key$: Observable<Key>

  @ViewChild("subject") subjectElement: ScheduleSubjectComponent | undefined

  constructor(
    private dialog: DialogService,
    private scheduleService: ScheduleService,
    private elRef: ElementRef,
    private keyboardService: KeyboardService
  ) {}

  ngOnInit(): void {
    this.update()

    this.key$ = this.keyboardService.key$

    this.scheduleService.scale$.subscribe({
      next: (_) => this.update(),
    })
  }

  update() {
    let height = this.elRef.nativeElement.clientHeight
    let fitAmount = Math.floor(height / this.scheduleService.lessonHeight)
    if (fitAmount < 1) fitAmount = 1

    let lessons: Lesson[][] = []

    for (let i = 0; i < this.cell.lessons.length; i += fitAmount) {
      const chunk = this.cell.lessons.slice(i, i + fitAmount)
      lessons.push(chunk)
    }

    this.lessons = lessons
  }

  nextSubject(): void {
    this.selectedSubjectIndex++
    if (this.selectedSubjectIndex >= this.lessons.length) {
      this.selectedSubjectIndex = 0
    }
  }

  previousSubject(): void {
    this.selectedSubjectIndex--
    if (this.selectedSubjectIndex < 0) {
      this.selectedSubjectIndex = this.lessons.length - 1
    }
  }
}
