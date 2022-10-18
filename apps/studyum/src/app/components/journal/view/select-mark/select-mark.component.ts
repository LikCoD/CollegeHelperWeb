import { AfterViewInit, Component, ElementRef, EventEmitter, Input, Output, ViewChild } from "@angular/core"
import { Lesson } from "../../../../models/schedule"
import { Mark } from "../../../../models/journal"

@Component({
  selector: "app-select-mark",
  templateUrl: "./select-mark.component.html",
  styleUrls: ["./select-mark.component.scss"]
})
export class SelectMarkComponent implements AfterViewInit {

  @Input() lesson: Lesson
  @Input() userId: string

  @Input() marks: string[]
  @Input() standaloneMarks?: string[]
  @Input() absentMark: string

  @Input() showAllMarks: boolean
  @Input() showAbsents: boolean

  @Output() markAdd = new EventEmitter<Mark>()
  @Output() markEdit = new EventEmitter<Mark>()
  @Output() markDelete = new EventEmitter<string>()

  @Output() absenceAdd = new EventEmitter<number | null>()
  @Output() absenceEdit = new EventEmitter<number | null>()
  @Output() absenceDelete = new EventEmitter<string>()

  @Output() truncateCell = new EventEmitter<null>()

  @Output() close = new EventEmitter<null>()

  addMarkEl = <Mark>{ mark: "+" }
  removeMarkEl = <Mark>{ mark: "🗑" }

  selectedMark = this.addMarkEl

  @ViewChild("markInput") markInput: ElementRef


  ngAfterViewInit(): void {
    this.focusInput()
  }

  confirmInput(key: string, mark: HTMLInputElement, minutes: HTMLInputElement) {
    if (key != "Enter") return

    this.confirm(mark.value, minutes.value)
    mark.value = ""
  }

  addMark(mark_: string): void {
    if (this.selectedMark != this.addMarkEl) {
      this.editMark(mark_)
      return
    }

    let mark: Mark = {
      mark: mark_,
      studentID: this.userId,
      lessonID: this.lesson!!.id,
      studyPlaceID: this.lesson!!.studyPlaceId
    }
    this.markAdd.emit(mark)
  }

  editMark(mark_: string) {
    if (this.selectedMark == undefined) return

    this.selectedMark!!.mark = mark_
    this.markEdit.emit(this.selectedMark)

    this.selectedMark = this.addMarkEl
  }

  removeMark() {
    if (this.selectedMark == undefined) return

    this.markDelete.emit(this.selectedMark.id)

    this.selectedMark = this.addMarkEl
  }

  confirm(mark: string, minutes: string): void {
    if (this.marks.includes(mark)) this.addMark(mark)

    let absence = this.lesson.marks?.find(m => m.time != null || m.mark == this.absentMark)
    if (absence == undefined) {
      this.absenceAdd.emit(Number.parseInt(minutes))
      return
    }

    if (minutes == "" && absence.mark != this.absentMark) {
      this.absenceDelete.emit(absence.id)
      return
    }

    this.absenceEdit.emit(Number.parseInt(minutes))
  }

  focusInput() {
    this.markInput.nativeElement.focus()
  }

  actionButtons() {
    return (this.lesson.marks ?? []).concat(this.addMarkEl, this.removeMarkEl).map(v => {
      v.toString = () => v.mark
      return v
    })
  }

  actionSelect(mark: Mark) {
    if (mark == this.removeMarkEl) this.truncateCell.emit()

    this.selectedMark = mark
  }

  absenceClick() {
    let absence = this.lesson.marks?.find(m => m.time != null || m.mark == this.absentMark)
    if (absence == undefined) {
      this.absenceAdd.emit(null)
      return
    }

    if (absence.mark == this.absentMark) {
      this.absenceDelete.emit(absence.id)
      return
    }

    this.absenceEdit.emit(null)
  }

  isAbsent() {
    return this.lesson.marks?.find(m => m.mark == this.absentMark) != undefined
  }
}
