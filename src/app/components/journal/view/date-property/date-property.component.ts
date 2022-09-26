import {Component, EventEmitter, Input, Output} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import * as moment from "moment";
import {Lesson} from "../../../../models/schedule";

@Component({
  selector: 'app-date-property',
  templateUrl: './date-property.component.html',
  styleUrls: ['./date-property.component.scss']
})
export class DatePropertyComponent {

  @Input() lesson: Lesson | undefined
  @Input() types: string[] = []
  @Input() visible: boolean = true

  @Output() close = new EventEmitter<null>()

  constructor(private http: HttpClient) {
  }

  confirm() {
    if (this.lesson == undefined) return

    this.http.put<Lesson>(`api/schedule`, this.lesson!!).subscribe({
      next: lesson => {
        lesson!!.startDate = moment.utc(lesson!!.startDate)
        this.lesson!! = lesson!
      },
    })

    this.close.emit()
  }
}
