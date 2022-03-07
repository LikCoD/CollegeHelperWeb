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

  @Input() subject: Subject | undefined
  @Input() userId: string | undefined

  marks: any[] = []
  selectMarkPopup: boolean = false

  constructor(private http: HttpClient) {
  }

  ngOnInit(): void {
    this.http.get<any>("api/journal/teachers/getMark?group=" + this.subject!!.group + "&subject=" + this.subject!!.subject + "&date=" + this.subject!!.date.toLocaleDateString() + "&userId=" + this.userId, {observe: 'response'}).subscribe(any => {
      if (any.body == null) return

      this.marks = any.body
    })
  }

  onMarkClick(): void {
    this.selectMarkPopup = !this.selectMarkPopup
  }
}

interface Subject {
  subject: string
  teacher: string
  room: string
  group: string
  type: string
  date: Date
}
