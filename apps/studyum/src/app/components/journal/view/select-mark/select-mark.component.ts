import {AfterViewInit, Component, ElementRef, EventEmitter, Input, Output, ViewChild} from '@angular/core';
import {Lesson} from "../../../../models/schedule";
import {Mark} from "../../../../models/journal";

@Component({
  selector: 'app-select-mark',
  templateUrl: './select-mark.component.html',
  styleUrls: ['./select-mark.component.scss']
})
export class SelectMarkComponent implements AfterViewInit {

  @Input() lesson: Lesson
  @Input() userId: string
  @Input() marks: string[]

  @Output() markAdd = new EventEmitter<Mark>()
  @Output() markEdit = new EventEmitter<Mark>()
  @Output() markDelete = new EventEmitter<string>()

  @Output() close = new EventEmitter<null>()


  selectedMark: Mark | undefined = undefined

  @ViewChild('markInput') markInput: ElementRef

  ngAfterViewInit(): void {
    this.markInput.nativeElement.focus()
  }

  confirmInput(key: string, mark: HTMLInputElement) {
    if (key != "Enter") return

    this.confirm(mark.value)
    mark.value = ""
  }

  addMark(mark_: string): void {
    if (this.selectedMark != undefined) {
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

    this.selectedMark = undefined
  }

  removeMark() {
    if (this.selectedMark == undefined) return

    this.markDelete.emit(this.selectedMark.id)

    this.selectedMark = undefined
  }

  confirm(mark: string): void {
    if (!this.marks.includes(mark)) {
      return
    }

    this.addMark(mark)
  }
}