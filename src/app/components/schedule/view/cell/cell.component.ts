import {AfterViewInit, Component, ElementRef, Input, OnInit, ViewChild} from '@angular/core';
import {Lesson, ScheduleLesson, Subject} from "../../../../data";
import {ScheduleSubjectComponent} from "../schedule-subject/schedule-subject.component";

@Component({
  selector: 'app-schedule-cell',
  templateUrl: './cell.component.html',
  styleUrls: ['./cell.component.scss']
})
export class CellComponent implements OnInit, AfterViewInit {
  static readonly oneCellHeight = 90;

  @Input() lesson: ScheduleLesson
  @Input() height: number

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

  ngAfterViewInit(): void {
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
