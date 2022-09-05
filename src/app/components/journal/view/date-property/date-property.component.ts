import {Component, Input, OnInit} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import * as moment from "moment";
import {Lesson} from "../../../../models/schedule";

@Component({
  selector: 'app-date-property',
  templateUrl: './date-property.component.html',
  styleUrls: ['./date-property.component.sass']
})
export class DatePropertyComponent implements OnInit {

  @Input() lesson: Lesson | undefined
  @Input() types: string[] = []
  @Input() show: boolean = true

  visible = false

  constructor(private http: HttpClient) {
  }

  onClick() {
    if (!this.show) return

    this.visible = !this.visible
  }

  ngOnInit(): void {

  }

  closePopup() {
    this.visible = false
  }

  confirm() {
    if (this.lesson == undefined) return

    this.http.put<Lesson>(`api/schedule`, this.lesson!!).subscribe({
      next: lesson => {
        lesson!!.startDate = moment.utc(lesson!!.startDate)
        this.lesson!! = lesson!
      },
      error: this.onError
    })

    this.closePopup()
  }

  onError(error: any) {
    console.log(error)
  }
}
