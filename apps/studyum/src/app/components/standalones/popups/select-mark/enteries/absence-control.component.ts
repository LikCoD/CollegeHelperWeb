import { Component, ElementRef, EventEmitter, Input, Output, ViewChild } from "@angular/core"
import { Lesson } from "../../../../../models/schedule"

@Component({
  selector: "app-absence-control",
  template: `
    <input #minutesInput class="form-control" [placeholder]="'journal.view.absenceMinutes' | translate">
    <button [appMiniSelectBtn]="isAbsence()" (click)="click()">{{isAbsence() ? '🗑' : absenceMark}}</button>
  `,
  styles: [`
    input {
      width: 90px !important;
      height: 30px !important;
    }
  `],
  host: { "[class]": "\"input-group input-group-sm\"" }
})
export class AbsenceControlComponent {
  @Input() absenceMark: string
  @Input() lesson: Lesson

  @Output() add = new EventEmitter<number | null>()
  @Output() edit = new EventEmitter<number | null>()
  @Output() delete = new EventEmitter<string>()

  @ViewChild("minutesInput") minutesInput: ElementRef<HTMLInputElement>

  click() {
    this.minutesInput.nativeElement.value = ""

    if (!this.lesson.absences?.length) {
      this.add.emit(null)
      return
    }

    let absence = this.lesson.absences![0]
    if (!absence.time) {
      this.delete.emit(absence.id)
      return
    }

    this.edit.emit(null)
  }

  isAbsence() {
    return this.lesson.absences?.length == 1 && !this.lesson.absences[0].time
  }

  confirm() {
    let minutes = this.minutesInput.nativeElement.value

    if (!this.lesson.absences?.length) {
      this.add.emit(Number.parseInt(minutes))
      return
    }

    let absence = this.lesson.absences![0]
    if (minutes == "" && !absence.time) {
      this.delete.emit(absence.id)
      return
    }

    this.edit.emit(Number.parseInt(minutes))
  }
}
