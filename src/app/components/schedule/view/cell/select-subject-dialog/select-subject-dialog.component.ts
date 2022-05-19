import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import {ScheduleLesson, Subject} from "../../../../../data";
import {AddSubjectDialogComponent} from "../../add-subject-dialog/add-subject-dialog.component";

@Component({
  selector: 'app-select-subject-dialog',
  templateUrl: './select-subject-dialog.component.html',
  styleUrls: ['./select-subject-dialog.component.scss']
})
export class SelectSubjectDialogComponent {

  lessons: Subject[]

  constructor(public dialogRef: MatDialogRef<AddSubjectDialogComponent>, @Inject(MAT_DIALOG_DATA) public data: ScheduleLesson) {
    this.lessons = data.subjects
  }

  select(lesson: Subject) {
    this.dialogRef.close([lesson])
  }

  selectAll() {
    this.dialogRef.close(this.lessons)
  }

  close() {
    this.dialogRef.close()
  }
}
