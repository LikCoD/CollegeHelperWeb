import {Component, ElementRef, Input, OnInit, ViewChild} from '@angular/core';
import {ScheduleSubjectComponent} from "../schedule-subject/schedule-subject.component";
import {MatDialog} from "@angular/material/dialog";
import {SelectSubjectDialogComponent} from "./select-subject-dialog/select-subject-dialog.component";
import {ScheduleService} from "../../../../services/shared/schedule.service";
import {AddSubjectDialogComponent} from "../edit/add-subject-dialog/add-subject-dialog.component";
import {Cell, Lesson} from "../../../../models/schedule";

@Component({
  selector: 'app-schedule-cell',
  templateUrl: './cell.component.html',
  styleUrls: ['./cell.component.scss']
})
export class CellComponent implements OnInit {
  @Input() cell: Cell
  @Input() isEditMode: boolean

  height: number

  selectedSubjectIndex = 0

  lessons: Lesson[][] = []

  @ViewChild('subject') subjectElement: ScheduleSubjectComponent | undefined
  @ViewChild('root') root: ElementRef

  constructor(public dialog: MatDialog, private scheduleService: ScheduleService, private elRef: ElementRef) {
  }

  ngOnInit(): void {
    this.update()

    this.scheduleService.scale$.subscribe({
      next: _ => this.update()
    })
  }

  update() {
    let height = this.elRef.nativeElement.clientHeight
    let fitAmount = Math.floor(height / this.scheduleService.lessonHeight)
    if (fitAmount < 1) fitAmount = 1

    let lessons: Lesson[][] = []

    for (let i = 0; i < this.cell.lessons.length; i += fitAmount) {
      const chunk = this.cell.lessons.slice(i, i + fitAmount);
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

    const dialogRef = this.dialog.open(SelectSubjectDialogComponent, {data: this.cell})
    dialogRef.afterClosed().subscribe((lessons: Lesson[] | undefined) => {
      if (lessons != undefined) callback(lessons)
    })
  }

  removeLessonDialog(): void {
    this.showSelectLessonDialog(this.removeSubject.bind(this))
  }

  editLessonDialog(): void {
    this.showSelectLessonDialog(this.editLesson.bind(this))
  }

  removeSubject(lessons: Lesson[]): void {
    for (let lesson of lessons) this.scheduleService.removeLesson(lesson)
  }

  editLesson(lessons: Lesson[]): void {
    const dialogRef = this.dialog.open(AddSubjectDialogComponent, {
      data: {
        lesson: lessons[0]
      }
    })
    dialogRef.afterClosed().subscribe((lesson: Lesson | undefined) => {
      if (lesson != undefined) this.scheduleService.editLesson(lesson)
    })
  }
}
