import {Component, ElementRef, Input, OnInit, ViewChild} from "@angular/core"
import {ScheduleSubjectComponent} from "../schedule-subject/schedule-subject.component"
import {ScheduleService} from "../../servieces/schedule.service"
import {Cell, Lesson} from "../../../../shared/models/schedule"
import {DialogService} from "../../../../shared/services/ui/dialog.service"
import {KeyboardService} from "../../../../shared/services/core/keyboard.service"
import {Observable} from "rxjs"
import {Key} from "../../../journal/services/journal.cell.service"

@Component({
  selector: "app-schedule-cell",
  templateUrl: "./cell.component.html",
  styleUrls: ["./cell.component.scss"],
})
export class CellComponent implements OnInit {
  @Input() cell: Cell
  @Input() isEditMode: boolean

  height: number

  selectedSubjectIndex = 0

  lessons: Lesson[][] = []

  selectedLessons: Lesson[] | null
  multiSelect: boolean = false

  key$: Observable<Key>

  @ViewChild("selectSubjectTemplate", {static: true})
  selectSubjectRef: ElementRef
  @ViewChild("manageSubjectTemplate", {static: true})
  manageSubjectRef: ElementRef

  @ViewChild("subject") subjectElement: ScheduleSubjectComponent | undefined
  @ViewChild("root") root: ElementRef

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

  showSelectLessonDialog(callback: any): void {
    if (this.cell.lessons.length < 2) {
      callback(this.cell.lessons)
      return
    }

    this.dialog.open<Lesson[]>(this.selectSubjectRef).subscribe({
      next: (value) => callback(value),
    })
  }

  removeLessonDialog(): void {
    this.multiSelect = true
    this.showSelectLessonDialog(this.removeSubject.bind(this))
  }

  editLessonDialog(): void {
    this.multiSelect = false
    this.showSelectLessonDialog(this.editLesson.bind(this))
  }

  removeSubject(lessons: Lesson[]): void {
    for (let lesson of lessons) this.scheduleService.removeLesson(lesson)
  }

  editLesson(lessons: Lesson[]): void {
    this.selectedLessons = lessons
    this.dialog.open<Lesson>(this.manageSubjectRef).subscribe({
      next: (lesson) => this.scheduleService.editLesson(lesson),
    })
  }
}
