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
    }

    this.lesson = {...value}
    this.lesson.type = "ADDED"

    this.form.get("subject")!!.setValue(this.lesson);
    this.form.get("startTime")!!.setValue(this.lesson.startDate?.format("HH:mm"))
    this.form.get("endTime")!!.setValue(this.lesson.endDate?.format("HH:mm"))
  }

  form = new FormGroup({
    date: new FormControl(moment().add(1, "days").format("YYYY-MM-DD"), Validators.required),
    startTime: new FormControl(moment().format("HH:mm"), Validators.required),
    endTime: new FormControl(moment().add(1, "hour").format("HH:mm"), Validators.required),
    subject: new FormControl(undefined),
  })

  currentDate: string = moment().format('YYYY-MM-DD');

  constructor(public dialogRef: MatDialogRef<AddSubjectDialogComponent>, @Inject(MAT_DIALOG_DATA) public data: any) {
    this.templateSubject = data.lesson
    if (data.date != undefined) this.form.get("date")!!.setValue(data.date.format("YYYY-MM-DD"))
  }

  close() {
    this.dialogRef.close()
  }

  submit() {
    let value = this.form.value

    let lesson = <Lesson>{
      ...value.subject,
      startDate: moment.utc(value.date + ' ' + value.startTime),
      endDate: moment.utc(value.date + ' ' + value.endTime),
    }

    this.dialogRef.close(lesson)
  }

}
