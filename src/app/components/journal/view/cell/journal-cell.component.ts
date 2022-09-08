import {Component, ElementRef, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {NgxPopperjsPlacements, NgxPopperjsTriggers} from "ngx-popperjs";
import {JournalViewComponent} from "../view.component";
import {Lesson} from "../../../../models/schedule";
import {Mark} from "../../../../models/journal";

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

  @Input() x: number
  @Input() y: number

  @Output() markAdd: EventEmitter<Mark> = new EventEmitter<Mark>()
  @Output() markEdit: EventEmitter<Mark> = new EventEmitter<Mark>()
  @Output() markDelete: EventEmitter<string> = new EventEmitter<string>()

  selectMarkPopup = false

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
