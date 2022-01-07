import {Component, Input, OnInit} from '@angular/core';

@Component({
  selector: 'app-cell',
  templateUrl: './cell.component.html',
  styleUrls: ['./cell.component.css']
})
export class CellComponent implements OnInit {

  @Input() cell: Cell | undefined

  availableSubjects: Subject[] | undefined = undefined

  selectedSubject: Subject | undefined = undefined
  selectedSubjectIndex = 0

  constructor() {
  }

  ngOnInit(): void {
    if (this.cell) {
      this.availableSubjects = this.cell.subjects
      if (this.availableSubjects)
        this.selectedSubject = this.availableSubjects[this.selectedSubjectIndex]
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

interface Subject {
  subject?: string
  teacher?: string
  room?: string
  group?: string
  type?: string
}

interface Cell {
  subjects?: Subject[]
}
