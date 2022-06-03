import {Component, ElementRef, EventEmitter, Input, OnInit, Output, ViewChild} from '@angular/core';
import {ScheduleSubjectComponent} from "../schedule-subject/schedule-subject.component";
import * as moment from "moment";
import {MatDialog} from "@angular/material/dialog";
import {SelectSubjectDialogComponent} from "./select-subject-dialog/select-subject-dialog.component";
import {ScheduleService} from "../../../../services/shared/schedule.service";
import {Cell, Lesson} from "../../../../models";
import {AddSubjectDialogComponent} from "../add-subject-dialog/add-subject-dialog.component";

@Component({
  selector: 'app-schedule-cell',
  templateUrl: './cell.component.html',
  styleUrls: ['./cell.component.scss']
})
export class CellComponent implements OnInit {
  static readonly oneCellHeight = 90;

  @Input() cell: Cell

  height: number

  @Input() isEditMode: boolean

  @Output() remove: EventEmitter<Lesson> = new EventEmitter<Lesson>();

  selectedSubjectIndex = 0

  lessons: Lesson[][] = []

  @ViewChild('subject') subjectElement: ScheduleSubjectComponent | undefined
  @ViewChild('root') root: ElementRef

  constructor(public dialog: MatDialog, private scheduleService: ScheduleService, private elRef: ElementRef) {
  }

  ngOnInit(): void {
    let height = this.elRef.nativeElement.clientHeight
    let fitAmount = Math.floor(height / CellComponent.oneCellHeight)

    let lessons: Lesson[][] = []

    for (let i = 0; i < this.cell.lessons.length; i += fitAmount) {
      const chunk = this.cell.lessons.slice(i, i + fitAmount);
      lessons.push(chunk)
    }

    this.lessons = lessons
  }

  showEditControls(): boolean {
    return this.isEditMode && moment().utc(true).isBefore(this.cell.startDate)
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
      console.log(lessons)
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
    for (let lesson of lessons) this.scheduleService.removeLesson(lesson, true)
  }

  editLesson(lessons: Lesson[]): void {
    const dialogRef = this.dialog.open(AddSubjectDialogComponent, {
      data: {
        lesson: lessons[0],
        date: lessons[0].startDate
      }
    })
    dialogRef.afterClosed().subscribe((lesson: Lesson | undefined) => {
      if (lesson != undefined) this.scheduleService.editLesson(lessons[0], lesson, true)
    })
  }
}
