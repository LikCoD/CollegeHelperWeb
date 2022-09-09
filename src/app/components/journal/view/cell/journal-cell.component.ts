import {Component, EventEmitter, Input, Output} from '@angular/core';
import {NgxPopperjsPlacements, NgxPopperjsTriggers} from "ngx-popperjs";
import {JournalViewComponent} from "../view.component";
import {Lesson} from "../../../../models/schedule";
import {Mark} from "../../../../models/journal";

@Component({
  selector: 'app-journal-cell',
  templateUrl: './journal-cell.component.html',
  styleUrls: ['./journal-cell.component.scss']
})
export class JournalCellComponent {
  popperTrigger = NgxPopperjsTriggers.hover
  popperPlacement = NgxPopperjsPlacements.BOTTOMEND

  @Input() lesson: Lesson
  @Input() userId: string
  @Input() show: boolean = true

  @Input() x: number
  @Input() y: number

  @Output() markAdd: EventEmitter<Mark> = new EventEmitter<Mark>()
  @Output() markEdit: EventEmitter<Mark> = new EventEmitter<Mark>()
  @Output() markDelete: EventEmitter<string> = new EventEmitter<string>()

  constructor(public parent: JournalViewComponent) {
  }
}
