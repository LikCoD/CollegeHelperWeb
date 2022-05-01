import {Component, Input, OnInit} from '@angular/core';
import {Subject} from "../../../../data";
import {ViewComponent} from "../view.component";
import * as moment from "moment";

@Component({
  selector: 'app-add-subject-dialog',
  templateUrl: './add-subject-dialog.component.html',
  styleUrls: ['./add-subject-dialog.component.scss']
})
export class AddSubjectDialogComponent implements OnInit {

  @Input() templateSubject: Subject | undefined;
  currentDate: string = moment().format('YYYY-MM-DDTHH:mm');

  constructor(public parent: ViewComponent) {
  }

  ngOnInit(): void {
    this.templateSubject = {
      id: "",
      date: new Date(),
      subject: this.templateSubject?.subject || "Subject",
      group: this.templateSubject?.group || "Group",
      teacher: this.templateSubject?.teacher || "Teacher",
      room: this.templateSubject?.room || "Room",
      description: "",
      homework: "",
      title: "",
      type: "ADDED",
      startTime: moment(),
      endTime: moment()
    }
  }

  close() {
    this.parent.addSubject = false
  }

  log(e: any | undefined) {
    console.log(e)
  }

  addSubject(subject: Subject, startDate: string, endDate: string) {
    if (subject == undefined) {
      return
    }

    this.parent.addSubjectToSchedule(subject, moment.utc(startDate), moment.utc(endDate ))
    this.close()
  }

}
