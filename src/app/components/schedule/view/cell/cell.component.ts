import {Component, ElementRef, EventEmitter, Input, OnInit, Output, ViewChild} from '@angular/core';
import {ScheduleLesson, Subject} from "../../../../data";
import {ScheduleSubjectComponent} from "../schedule-subject/schedule-subject.component";
import * as moment from "moment";
import {MatDialog} from "@angular/material/dialog";
import {SelectSubjectDialogComponent} from "./select-subject-dialog/select-subject-dialog.component";
import {ScheduleService} from "../../../../services/shared/schedule.service";

@Component({
  selector: 'app-schedule-cell',
  templateUrl: './cell.component.html',
  styleUrls: ['./cell.component.scss']
})
export class CellComponent implements OnInit {
  static readonly oneCellHeight = 90;

  @Input() lesson: ScheduleLesson
  @Input() height: number

  @Input() isEditMode: boolean

  @Output() remove: EventEmitter<Subject> = new EventEmitter<Subject>();

  selectedSubjectIndex = 0

  cellSubjects: Subject[][] = []

  @ViewChild('subject') subjectElement: ScheduleSubjectComponent | undefined
  @ViewChild('root') root: ElementRef

  constructor(public dialog: MatDialog, private scheduleService: ScheduleService) {
  }

  ngOnInit(): void {
    let fitAmount = Math.floor(this.height / CellComponent.oneCellHeight)

    let cellSubjects: Subject[][] = []

    for (let i = 0; i < Math.ceil(this.lesson.subjects.length / fitAmount); i++) {
      cellSubjects.push([])
    }

    this.lesson.subjects.forEach((subject, i) => {
      cellSubjects[Math.floor(i / fitAmount)].push(subject)
    });

    this.cellSubjects = cellSubjects
  }

  showEditControls(): boolean {
    return this.isEditMode && moment().utc(true).isBefore(this.lesson.startDate)
  }

  nextSubject(): void {
    this.selectedSubjectIndex++
    if (this.selectedSubjectIndex >= this.cellSubjects.length) {
      this.selectedSubjectIndex = 0
    }
  }

  previousSubject(): void {
    this.selectedSubjectIndex--
    if (this.selectedSubjectIndex < 0) {
      this.selectedSubjectIndex = this.cellSubjects.length - 1
    }
  }

  removeSubjectDialog(): void {
    if (this.lesson.subjects.length < 2) {
      this.removeSubject(this.lesson.subjects)
      return
    }

    const dialogRef = this.dialog.open(SelectSubjectDialogComponent, {data: this.lesson})
    dialogRef.afterClosed().subscribe((subjects: Subject[] | undefined) => {
      if (subjects != undefined) this.removeSubject(subjects)
    })
  }

  removeSubject(subjects: Subject[]): void {
    for (let subject of subjects)
      this.scheduleService.removeLesson(subject, this.lesson.startDate, this.lesson.endDate)
  }
}
