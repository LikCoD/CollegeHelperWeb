import {AfterViewInit, Component, ElementRef, EventEmitter, HostListener, Input, Output, ViewChild} from "@angular/core"
import {Lesson} from "../../../../models/schedule"
import {Absence, Mark} from "../../../../models/journal"
import {AbsenceControlComponent} from "./enteries/absence-control.component"
import {JournalMarksService} from "../../../../services/ui/journal-marks.service"
import {Point} from "../../../../services/ui/journal.cell.service"

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
  @Input() absenceMark: string

  @Input() showAllMarks: boolean
  @Input() showStandaloneMarks: boolean
  @Input() showAbsence: boolean

  @Output() close = new EventEmitter<null>()

  addMarkEl = <Mark>{mark: "+"}
  removeMarkEl = <Mark>{mark: "🗑"}

  selectedMark = this.addMarkEl

  @ViewChild("markInput") markInput: ElementRef<HTMLInputElement>
  @ViewChild("absence") absence: AbsenceControlComponent

  constructor(private service: JournalMarksService) {
  }

  get point(): Point {
    return this.lesson.point!!
  }

  ngAfterViewInit(): void {
    this.focusInput()
  }

  @HostListener("document:keydown.enter", [])
  confirmInput(): void {
    console.log("asdsakdsndfdbhs")

    this.confirm()
    this.markInput.nativeElement.value = ""
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
    this.service.addMark(this.point, mark)
  }

  editMark(mark_: string): void {
    if (this.selectedMark == undefined) return

    this.selectedMark!!.mark = mark_
    this.service.editMark(this.point, this.selectedMark)

    this.selectedMark = this.addMarkEl
  }

  removeMark(): void {
    if (this.selectedMark == undefined) return

    this.service.deleteMark(this.point, this.selectedMark.id!!)

    this.selectedMark = this.addMarkEl
  }

  confirm(): void {
    let mark = this.markInput?.nativeElement?.value
    if (this.marks.includes(mark)) {
      this.addMark(mark)
      return
    }

    this.absence.confirm()
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
    if (mark == this.removeMarkEl) this.service.truncate(this.point, this.lesson.marks ?? [])

    this.selectedMark = mark
  }

  addAbsence(time: number | null): void {
    let absence = <Absence>{time: time, lessonID: this.lesson.id, studentID: ""}
    this.service.addAbsence(this.point, absence)
  }

  editAbsence(time: number | null): void {
    let id = this.lesson.absences!![0].id
    let absence = <Absence>{id: id, time: time, lessonID: this.lesson.id, studentID: ""}
    this.service.editAbsence(this.point, absence)
  }

  deleteAbsence(id: string): void {
    this.service.deleteAbsence(this.point, id)
  }
}
