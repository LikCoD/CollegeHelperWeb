import {Component, ElementRef, Input, OnInit, ViewChild} from "@angular/core"
import {Cell, Lesson, Schedule} from "../../../../shared/models/schedule"
import {ScheduleService} from "../../servieces/schedule.service"
import {DialogService} from "../../../../shared/services/ui/dialog.service"

@Component({
  selector: "app-base-schedule",
  templateUrl: "./base-schedule.component.html",
  styleUrls: ["./base-schedule.component.scss"]
})
export class BaseScheduleComponent implements OnInit {
  @Input() schedule: Schedule
  @Input() isEditMode: boolean

  days: number[]

  multiSelect: boolean
  cell: Cell
  selectedLesson: Lesson

  @ViewChild("selectSubjectTemplate", {static: true})
  selectSubjectRef: ElementRef
  @ViewChild("manageSubjectTemplate", {static: true})
  manageSubjectRef: ElementRef

  constructor(public scheduleService: ScheduleService, private dialog: DialogService) {
  }

  ngOnInit(): void {
    this.days = new Array(this.schedule.info.daysNumber).fill(0).map((_, i) => i)
  }

  cellAction(cell: Cell, multi: boolean, callback: (lessons: Lesson[]) => void): void {
    this.cell = cell
    this.multiSelect = multi
    this.showSelectLessonDialog(cell, callback.bind(this))
  }

  private showSelectLessonDialog(cell: Cell, callback: (lessons: Lesson[]) => void): void {
    if (cell.lessons.length === 1) return callback(cell.lessons)

    this.dialog.open<Lesson[]>(this.selectSubjectRef).subscribe({
      next: (value) => callback(value)
    })
  }

  removeSubject(lessons: Lesson[]): void {
    for (let lesson of lessons) this.scheduleService.removeLesson(lesson)
  }

  editLesson(lessons: Lesson[]): void {
    if (!lessons[0]) return
    this.selectedLesson = lessons[0]
    this.dialog.open<Lesson>(this.manageSubjectRef).subscribe({
      next: (lesson) => this.scheduleService.editLesson(lesson)
    })
  }
}
