import {Component, ElementRef, Input, OnInit} from '@angular/core';
import {NgxPopperjsPlacements, NgxPopperjsTriggers} from "ngx-popperjs";
import { Lesson } from 'src/app/data';
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
    this.selectMarkPopup = !this.selectMarkPopup
  }
}
