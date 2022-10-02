import {Component, EventEmitter, Input, Output} from '@angular/core';
import {Lesson} from "../../../../models/schedule";

@Component({
  selector: 'app-absence-add',
  templateUrl: './absence-add.component.html',
  styleUrls: ['./absence-add.component.scss']
})
export class AbsenceAddComponent {

  @Input() lesson: Lesson
  @Input() userId: string

  @Output() minutes = new EventEmitter<string>()
  @Output() absent = new EventEmitter<null>()
  @Output() remove = new EventEmitter<string>()

  @Output() close = new EventEmitter<null>()

  removeAbsent() {
    if (this.lesson.marks?.length != 1) return

    this.remove.emit(this.lesson.marks[0].id)
  }
}
