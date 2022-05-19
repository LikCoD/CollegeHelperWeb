import {Component, Inject} from '@angular/core';
import * as moment from "moment";
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
import {Lesson} from "../../../../models";

@Component({
  selector: 'app-add-subject-dialog',
  templateUrl: './add-subject-dialog.component.html',
  styleUrls: ['./add-subject-dialog.component.scss']
})
export class AddSubjectDialogComponent {

  lesson: Lesson | undefined

  set templateSubject(value: Lesson | undefined) {
    if (value == undefined) value = {
      group: "GROUP",
      room: "ROOM",
      teacher: "TEACHER",
      subject: "SUBJECT",
      type: "ADDED",
      updated: true
    }

    this.lesson = value
    this.lesson.type = "ADDED"

    this.form.get("subject")!!.setValue(this.lesson);
  }

  form = new FormGroup({
    date: new FormControl(moment().format("YYYY-MM-DD"), Validators.required),
    startTime: new FormControl(moment().format("hh:mm"), Validators.required),
    endTime: new FormControl(moment().add(1, "hour").format("hh:mm"), Validators.required),
    subject: new FormControl(undefined),
  })

  currentDate: string = moment().format('YYYY-MM-DD');

  constructor(public dialogRef: MatDialogRef<AddSubjectDialogComponent>, @Inject(MAT_DIALOG_DATA) public data: Lesson) {
    this.templateSubject = data
  }

  close() {
    this.dialogRef.close()
  }

  submit() {
    let value = this.form.value

    let lesson = <Lesson>{
      ...value.subject,
      startTime: moment(value.date + ' ' + value.startTime),
      endTime: moment(value.date + ' ' + value.endTime),
    }

    this.dialogRef.close(lesson)
  }

}
