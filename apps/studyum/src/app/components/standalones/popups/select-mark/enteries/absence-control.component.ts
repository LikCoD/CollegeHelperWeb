import {Component, ElementRef, EventEmitter, Input, Output, ViewChild} from "@angular/core"
import {JournalCell} from "../../../../../models/journal"

@Component({
  selector: "app-absence-control",
  template: `
    <input
      #minutesInput
      uiInput
      [placeholder]="'journal.view.absenceMinutes' | translate"
      [value]="minutes()"
    />
    <button
      [uiToggleDarkButton]="isAbsence()"
      [text]="absenceMark"
      selectedText="🗑"
      (click)="click()"
    ></button>
  `,
  styles: [
    `
      input {
        width: 90px !important;
        height: 30px !important;
      }

      button {
        width: 30px;
        height: 30px;
        padding: 0;
        margin: 0;
        align-items: center;
      }
    `,
  ],
})
export class AbsenceControlComponent {
  @Input() absenceMark: string
  @Input() lesson: JournalCell

  @Output() add = new EventEmitter<number | null>()
  @Output() edit = new EventEmitter<number | null>()
  @Output() delete = new EventEmitter<string>()

  @ViewChild("minutesInput") minutesInput: ElementRef<HTMLInputElement>

  minutes(): string | null {
    if (this.lesson.absences?.length != 1 || !this.lesson.absences[0].time) return null

    return this.lesson.absences[0].time.toString()
  }

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
