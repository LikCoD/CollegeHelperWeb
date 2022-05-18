import {Component, Input, OnInit} from '@angular/core';
import {Subject} from "../../../../data";
import {ViewComponent} from "../view.component";
import * as moment from "moment";
import {FormControl, FormGroup, Validators} from "@angular/forms";

@Component({
  selector: 'app-add-subject-dialog',
  templateUrl: './add-subject-dialog.component.html',
  styleUrls: ['./add-subject-dialog.component.scss']
})
export class AddSubjectDialogComponent implements OnInit {

  subject: Subject | undefined

  @Input() maxDate: string;

  @Input()
  set templateSubject(value: Subject | undefined) {
    if (value == undefined) return

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

  startDate: string = this.currentDate;
  endDate: string = this.currentDate;

  constructor(public parent: ViewComponent) {
  }

  ngOnInit(): void {
    //this.form.get("subject")!!.setValue(this.templateSubject);
  }

  close() {
    this.parent.addSubject = false
  }

  submit() {
    let value = this.form.value

    let s = <Subject>{
      ...value.subject,
      startTime: moment(value.date + ' ' + value.startTime),
      endTime: moment(value.date + ' ' + value.endTime),
    }

    this.parent.addSubjectToSchedule(s)
    // this.close()
  }

}
