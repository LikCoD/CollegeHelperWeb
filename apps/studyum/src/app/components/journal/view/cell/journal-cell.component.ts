import {Component, Input} from '@angular/core';
import {JournalViewComponent} from "../view.component";
import {Lesson} from "../../../../models/schedule";

@Component({
  selector: 'app-journal-cell',
  templateUrl: './journal-cell.component.html',
  styleUrls: ['./journal-cell.component.scss']
})
export class JournalCellComponent {
  @Input() lesson: Lesson
  @Input() userId: string
  @Input() show: boolean = true

  @Input() x: number
  @Input() y: number

  constructor(public parent: JournalViewComponent) {
  }
}
