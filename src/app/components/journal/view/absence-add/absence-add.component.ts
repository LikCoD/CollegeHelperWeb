import {Component, ElementRef, EventEmitter, Input, Output, ViewChild} from '@angular/core';
import {Lesson} from "../../../../models/schedule";
import {Mark} from "../../../../models/journal";

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
}
