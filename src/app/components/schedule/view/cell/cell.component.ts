import {Component, ElementRef, Input, OnInit, ViewChild} from '@angular/core';
import {Lesson, ScheduleLesson, Subject} from "../../../../data";
import {ScheduleSubjectComponent} from "../schedule-subject/schedule-subject.component";

@Component({
  selector: 'app-schedule-cell',
  templateUrl: './cell.component.html',
  styleUrls: ['./cell.component.sass']
})
export class CellComponent implements OnInit {

  @Input()
  lesson: ScheduleLesson | undefined

  selectedSubject: Subject | undefined = undefined
  selectedSubjectIndex = 0

  @ViewChild('subject') subjectElement: ScheduleSubjectComponent | undefined

  ngOnInit(): void {
    if (this.lesson!!.subjects.length > 0)
      this.selectedSubject = this.lesson!!.subjects[0]
  }

  nextSubject(): void {
    if (!this.lesson!!.subjects) return

    this.selectedSubjectIndex++
    if (this.selectedSubjectIndex >= this.lesson!!.subjects.length) {
      this.selectedSubjectIndex = 0
    }

    this.selectedSubject = this.lesson!!.subjects[this.selectedSubjectIndex]
    this.subjectElement!!.setSubject(this.selectedSubject)
  }

  previousSubject(): void {
    if (!this.lesson!!.subjects) return

    this.selectedSubjectIndex--
    if (this.selectedSubjectIndex < 0) {
      this.selectedSubjectIndex = this.lesson!!.subjects.length - 1
    }

    this.selectedSubject = this.lesson!!.subjects[this.selectedSubjectIndex]
    this.subjectElement!!.setSubject(this.selectedSubject)
  }
}
