import {Component, ElementRef, Input, OnInit, ViewChild} from '@angular/core';
import * as moment from 'moment';
import {Subject} from "../../../../data";


@Component({
  selector: 'app-schedule-subject',
  templateUrl: './schedule-subject.component.html',
  styleUrls: ['./schedule-subject.component.scss']
})
export class ScheduleSubjectComponent implements OnInit {
  @Input() subject: Subject | undefined;
  @Input() editable: boolean = false;

  @ViewChild('subjectInput') subjectElement: ElementRef | undefined;
  @ViewChild('groupInput') groupElement: ElementRef | undefined;
  @ViewChild('teacherInput') teacherElement: ElementRef | undefined;
  @ViewChild('roomInput') roomElement: ElementRef | undefined;

  setSubject(subject: Subject) {
    this.subject = subject;
    this.ngAfterViewInit()
  }

  ngAfterViewInit() {
    if (this.subject == undefined) return

    this.subjectElement!!.nativeElement.innerText = this.subject.subject
    this.groupElement!!.nativeElement.innerText = this.subject.group
    this.teacherElement!!.nativeElement.innerText = this.subject.teacher
    this.roomElement!!.nativeElement.innerText = this.subject.room
  }

  ngOnInit(): void {
    if (this.subject == undefined){
      this.subject = {
        date: new Date(),
        description: "",
        group: "GROUP",
        homework: "",
        id: "",
        room: "ROOM",
        subject: "SUBJECT",
        teacher: "TEACHER",
        title: "",
        type: "ADDED",
        startTime: moment(),
        endTime: moment(),
      }
    }
  }


}
