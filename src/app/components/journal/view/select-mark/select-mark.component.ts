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

  @Output() markAdd = new EventEmitter<Mark>()
  @Output() markEdit = new EventEmitter<Mark>()
  @Output() markDelete = new EventEmitter<string>()

  @Output() close = new EventEmitter<null>()

  availableMarks: string[] = ["1", "2", "3", "4", "5", "6", "7", "8", "9", "10", "н", "зч"]

  selectedMark: Mark | undefined = undefined

  @ViewChild('markInput') markInput: ElementRef

  ngAfterViewInit(): void {
    this.markInput.nativeElement.focus()
  }

  closePopup() {
    this.close.emit()
  }

  confirmInput(key: string, mark: string) {
    if (key != "Enter") return

    this.confirm(mark)
  }

  addMark(mark_: string): void {
    if (this.selectedMark != undefined) {
      this.editMark(mark_)
      return
    }

    let mark: Mark = {
      mark: mark_,
      studentID: this.userId,
      lessonId: this.lesson!!.id,
      studyPlaceId: this.lesson!!.studyPlaceId
    }
    this.markAdd.emit(mark)

    this.close.emit()
  }

  editMark(mark_: string) {
    if (this.selectedMark == undefined) return

    this.selectedMark!!.mark = mark_
    this.markEdit.emit(this.selectedMark)

    this.close.emit()
  }

  removeMark() {
    if (this.selectedMark == undefined) return
    this.markDelete.emit(this.selectedMark.id)

    this.close.emit()
  }

  confirm(mark: string): void {
    if (!this.availableMarks.includes(mark)) {
      alert("wrong mark")
      return
    }

    this.addMark(mark)
  }
}
