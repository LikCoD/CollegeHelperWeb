import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {Lesson} from "../../../../models/schedule";

@Component({
  selector: 'app-date-property',
  templateUrl: './date-property.component.html',
  styleUrls: ['./date-property.component.scss']
})
export class DatePropertyComponent implements OnInit {

  @Input() lesson: Lesson
  @Input() types: string[] = []
  @Input() visible: boolean = true

  @Output() close = new EventEmitter<Lesson | null>()

  ngOnInit() {
    this.lesson = {...this.lesson}
  }

  confirm() {
    this.close.emit(this.lesson)
  }
}
