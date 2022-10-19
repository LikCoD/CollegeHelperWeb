import { Component, ElementRef, EventEmitter, Input, Output, ViewChild } from "@angular/core"
import { Lesson } from "../../../../../models/schedule"

@Component({
  selector: "app-absence-control",
  template: `
    <input #minutesInput class="form-control" [placeholder]="'journal.view.absentMinutes' | translate">
    <button [appMiniSelectBtn]="isAbsent()" (click)="click()">{{isAbsent() ? '🗑' : absentMark}}</button>
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
  @Input() absentMark: string
  @Input() lesson: Lesson

  @Output() add = new EventEmitter<number | null>()
  @Output() edit = new EventEmitter<number | null>()
  @Output() delete = new EventEmitter<string>()

  @ViewChild("minutesInput") minutesInput: ElementRef<HTMLInputElement>

  click() {
    this.minutesInput.nativeElement.value = ""

    let absence = this.lesson.marks?.find(m => m.time != null || m.mark == this.absentMark)
    if (absence == undefined) {
      this.add.emit(null)
      return
    }

    if (absence.mark == this.absentMark) {
      this.delete.emit(absence.id)
      return
    }

    this.edit.emit(null)
  }

  isAbsent() {
    return this.lesson.marks?.find(m => m.mark == this.absentMark) != undefined
  }

  confirm() {
    let minutes = this.minutesInput.nativeElement.value

    let absence = this.lesson.marks?.find(m => m.time != null || m.mark == this.absentMark)
    if (absence == undefined) {
      this.add.emit(Number.parseInt(minutes))
      return
    }

    if (minutes == "" && absence.mark != this.absentMark) {
      this.delete.emit(absence.id)
      return
    }

    this.edit.emit(Number.parseInt(minutes))
  }
}
