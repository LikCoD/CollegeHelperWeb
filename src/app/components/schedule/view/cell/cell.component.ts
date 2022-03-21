import {Component, Input, OnInit} from '@angular/core';
import {Subject} from "../../../../data";

@Component({
  selector: 'app-schedule-cell',
  templateUrl: './cell.component.html',
  styleUrls: ['./cell.component.sass']
})
export class CellComponent implements OnInit {

  @Input() cell: Cell | undefined
  @Input() subject: Subject | undefined

  availableSubjects: Subject[] | undefined = undefined

  selectedSubject: Subject | undefined = undefined
  selectedSubjectIndex = 0

  constructor() {
  }

  ngOnInit(): void {
    if (this.cell) {
      this.availableSubjects = (<Cell>this.cell).subjects
      if (this.availableSubjects)
        this.selectedSubject = this.availableSubjects[this.selectedSubjectIndex]
    }
    if (this.subject){
      this.selectedSubject = this.subject
    }
  }

  nextSubject(): void {
    if (!this.availableSubjects) return

    this.selectedSubjectIndex++
    if (this.selectedSubjectIndex >= this.availableSubjects.length) {
      this.selectedSubjectIndex = 0
    }

    this.selectedSubject = this.availableSubjects[this.selectedSubjectIndex]
  }

  previousSubject(): void {
    if (!this.availableSubjects) return

    this.selectedSubjectIndex--
    if (this.selectedSubjectIndex < 0) {
      this.selectedSubjectIndex = this.availableSubjects.length - 1
    }

    this.selectedSubject = this.availableSubjects[this.selectedSubjectIndex]
  }

}

interface Cell {
  date?: string
  subjects?: Subject[]
}
