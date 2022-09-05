import {Component, ElementRef, Input, OnInit} from '@angular/core';
import {NgxPopperjsPlacements, NgxPopperjsTriggers} from "ngx-popperjs";
import {JournalViewComponent} from "../view.component";
import {Lesson} from "../../../../models/schedule";

@Component({
  selector: 'app-journal-cell',
  templateUrl: './journal-cell.component.html',
  styleUrls: ['./journal-cell.component.sass']
})
export class JournalCellComponent implements OnInit {
  popperTrigger = NgxPopperjsTriggers.hover
  popperPlacement = NgxPopperjsPlacements.BOTTOMEND

  @Input() lesson: Lesson
  @Input() userId: string
  @Input() show: boolean = true

  selectMarkPopup: boolean = false

  constructor(public parent: JournalViewComponent, private elRef: ElementRef) {
  }

  ngOnInit(): void {

  }

  closePopup() {
    this.selectMarkPopup = false

    this.elRef.nativeElement.parentElement.focus()
  }

  onMarkClick() {
    if (!this.show) return

    this.selectMarkPopup = !this.selectMarkPopup
  }
}
