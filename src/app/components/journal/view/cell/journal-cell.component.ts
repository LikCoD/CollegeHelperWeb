import {Component, Input, OnInit} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {NgxPopperjsPlacements, NgxPopperjsTriggers} from "ngx-popperjs";

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

  selectMarkPopup: boolean = false

  constructor(private http: HttpClient) {
  }

  ngOnInit(): void {

  }

  onMarkClick(): void {
    this.selectMarkPopup = !this.selectMarkPopup
  }
}
