import {Component, ElementRef, EventEmitter, Input, OnInit, Output, ViewChild} from '@angular/core';
import {Subject} from "../../../../data";
import * as moment from "moment";

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

    if (this.subjectElement != undefined)
      this.subjectElement.nativeElement.innerText = this.subject.subject
    if (this.groupElement != undefined)
      this.groupElement.nativeElement.innerText = this.subject.group
    if (this.teacherElement != undefined)
      this.teacherElement.nativeElement.innerText = this.subject.teacher
    if (this.roomElement != undefined)
      this.roomElement.nativeElement.innerText = this.subject.room
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
        type: "ADDED"
      }
    }
  }


}
