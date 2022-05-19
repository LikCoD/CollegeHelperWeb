import {Component, ElementRef, EventEmitter, Input, OnInit, Output, ViewChild} from '@angular/core';
import {Subject} from "../../../../data";
import {ScheduleSubjectComponent} from "../schedule-subject/schedule-subject.component";
import * as moment from "moment";
import {MatDialog} from "@angular/material/dialog";
import {SelectSubjectDialogComponent} from "./select-subject-dialog/select-subject-dialog.component";
import {ScheduleService} from "../../../../services/shared/schedule.service";
import {Cell, Lesson} from "../../../../models";

@Component({
  selector: 'app-schedule-cell',
  templateUrl: './cell.component.html',
  styleUrls: ['./cell.component.scss']
})
export class CellComponent implements OnInit {
  static readonly oneCellHeight = 90;

  @Input() cell: Cell

  @Input() height: number

  @Input() isEditMode: boolean

  @Output() remove: EventEmitter<Subject> = new EventEmitter<Subject>();

  selectedSubjectIndex = 0

  lessons: Lesson[][] = []

  @ViewChild('subject') subjectElement: ScheduleSubjectComponent | undefined
  @ViewChild('root') root: ElementRef

  constructor(public dialog: MatDialog, private scheduleService: ScheduleService) {
  }

  ngOnInit(): void {
    let fitAmount = Math.floor(this.height / CellComponent.oneCellHeight)

    let lessons: Lesson[][] = []

    for (let i = 0; i < Math.ceil(this.cell.lessons.length / fitAmount); i++) {
      lessons.push([])
    }

    this.cell.lessons.forEach((lesson, i) => {
      lessons[Math.floor(i / fitAmount)].push(lesson)
    });

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

  removeSubjectDialog(): void {
    if (this.cell.lessons.length < 2) {
      this.removeSubject(this.cell.lessons)
      return
    }

    const dialogRef = this.dialog.open(SelectSubjectDialogComponent, {data: this.cell})
    dialogRef.afterClosed().subscribe((subjects: Subject[] | undefined) => {
      if (subjects != undefined) this.removeSubject(subjects)
    })
  }

  removeSubject(subjects: Subject[]): void {
    for (let subject of subjects)
      this.scheduleService.removeLesson(subject, this.cell.startDate, this.cell.endDate)
  }
}
