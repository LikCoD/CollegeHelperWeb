import {AfterViewInit, Component, ElementRef, Input, OnInit, ViewChild} from '@angular/core';
import {Lesson, ScheduleLesson, Subject} from "../../../../data";
import {ScheduleSubjectComponent} from "../schedule-subject/schedule-subject.component";
import * as moment from "moment";

@Component({
  selector: 'app-schedule-cell',
  templateUrl: './cell.component.html',
  styleUrls: ['./cell.component.scss']
})
export class CellComponent implements OnInit {
  static readonly oneCellHeight = 90;

  @Input() lesson: ScheduleLesson
  @Input() height: number

  @Input() isEditMode: boolean

  selectedSubjectIndex = 0

  cellSubjects: Subject[][] = []

  @ViewChild('subject') subjectElement: ScheduleSubjectComponent | undefined
  @ViewChild('root') root: ElementRef

  ngOnInit(): void {
    let fitAmount = Math.floor(this.height / CellComponent.oneCellHeight)

    let cellSubjects: Subject[][] = []

    for (let i = 0; i < Math.ceil(this.lesson.subjects.length / fitAmount); i++) {
      cellSubjects.push([])
    }

    this.lesson.subjects.forEach((subject, i) => {
      cellSubjects[Math.floor(i / fitAmount)].push(subject)
    });

    this.cellSubjects = cellSubjects
  }

  showEditControls(): boolean {
    return this.isEditMode && moment().utc(true).isBefore(this.lesson.startDate)
  }

  nextSubject(): void {
    this.selectedSubjectIndex++
    if (this.selectedSubjectIndex >= this.cellSubjects.length) {
      this.selectedSubjectIndex = 0
    }
  }

  previousSubject(): void {
    this.selectedSubjectIndex--
    if (this.selectedSubjectIndex < 0) {
      this.selectedSubjectIndex = this.cellSubjects.length - 1
    }
  }
}
