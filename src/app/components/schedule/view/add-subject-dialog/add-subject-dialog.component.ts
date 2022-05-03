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
  @Input() minDate: string;
  @Input() maxDate: string;

  currentDate: string = moment().format('YYYY-MM-DDTHH:mm');

  startDate: string = this.currentDate;
  endDate: string = this.currentDate;

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

  addSubject(subject: Subject) {
    if (subject == undefined) {
      return
    }

    this.parent.addSubjectToSchedule(subject, moment.utc(this.startDate), moment.utc(this.endDate))
    this.close()
  }

}
