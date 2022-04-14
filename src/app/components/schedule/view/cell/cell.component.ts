import {Component, Input, OnInit} from '@angular/core';
import {Lesson, ScheduleLesson, Subject} from "../../../../data";

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
  }

  previousSubject(): void {
    if (!this.lesson!!.subjects) return

    this.selectedSubjectIndex--
    if (this.selectedSubjectIndex < 0) {
      this.selectedSubjectIndex = this.lesson!!.subjects.length - 1
    }

    this.selectedSubject = this.lesson!!.subjects[this.selectedSubjectIndex]
  }
}
