import {Component, Inject} from '@angular/core';
import {Subject} from "../../../../data";
import * as moment from "moment";
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';

@Component({
  selector: 'app-add-subject-dialog',
  templateUrl: './add-subject-dialog.component.html',
  styleUrls: ['./add-subject-dialog.component.scss']
})
export class AddSubjectDialogComponent {

  subject: Subject | undefined

  set templateSubject(value: Subject | undefined) {
    if (value == undefined) value = {
      group: "GROUP",
      room: "ROOM",
      teacher: "TEACHER",
      subject: "SUBJECT",
      type: "ADDED"
    }

    this.subject = value
    this.subject.type = "ADDED"

    this.form.get("subject")!!.setValue(this.subject);
  }

  form = new FormGroup({
    date: new FormControl(moment().format("YYYY-MM-DD"), Validators.required),
    startTime: new FormControl(moment().format("hh:mm"), Validators.required),
    endTime: new FormControl(moment().add(1, "hour").format("hh:mm"), Validators.required),
    subject: new FormControl(undefined),
  })

  currentDate: string = moment().format('YYYY-MM-DD');

  constructor(public dialogRef: MatDialogRef<AddSubjectDialogComponent>, @Inject(MAT_DIALOG_DATA) public data: Subject) {
    this.templateSubject = data
  }

  close() {
    this.dialogRef.close()
  }

  submit() {
    let value = this.form.value

    let s = <Subject>{
      ...value.subject,
      startTime: moment(value.date + ' ' + value.startTime),
      endTime: moment(value.date + ' ' + value.endTime),
    }

    //this.parent.addSubjectToSchedule(s)
    this.dialogRef.close(s)
  }

}
