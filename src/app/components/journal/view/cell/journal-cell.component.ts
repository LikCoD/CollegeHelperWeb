import {Component, Input, OnInit} from '@angular/core';
import {NgxPopperjsPlacements, NgxPopperjsTriggers} from "ngx-popperjs";
import {JournalViewComponent} from "../view.component";

@Component({
  selector: 'app-journal-cell',
  templateUrl: './journal-cell.component.html',
  styleUrls: ['./journal-cell.component.sass']
})
export class JournalCellComponent implements OnInit {
  popperTrigger = NgxPopperjsTriggers.hover
  popperPlacement = NgxPopperjsPlacements.BOTTOMEND

  @Input() lesson: Lesson | undefined
  @Input() userId: string | undefined

  @Input() x: number | undefined
  @Input() y: number | undefined

  selectMarkPopup: boolean = false

  constructor(public parent: JournalViewComponent) {
  }

  ngOnInit(): void {

  }

  closePopup() {
    this.selectMarkPopup = false
    if (this.x != undefined && this.y != undefined)
      this.parent.focusCell(this.x, this.y)
  }

  onMarkClick(): void {
    this.selectMarkPopup = !this.selectMarkPopup
  }
}
