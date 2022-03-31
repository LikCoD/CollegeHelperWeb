import {Component, Input, OnInit} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Lesson} from "../../../../data";

@Component({
  selector: 'app-date-property',
  templateUrl: './date-property.component.html',
  styleUrls: ['./date-property.component.sass']
})
export class DatePropertyComponent implements OnInit {

  @Input() lesson: Lesson | undefined
  @Input() types: string[] = []

  visible = false

  constructor(private http: HttpClient) {
  }

  onClick() {
    this.visible = !this.visible
  }

  ngOnInit(): void {

  }

  closePopup() {
    this.visible = false
  }

  confirm() {
    if (this.lesson == undefined) return

    this.http.put<Lesson>(`api/journal/teachers/info`, this.lesson!!).subscribe({
      next: lesson => {
        lesson!!.date = new Date(lesson!!.date)
        this.lesson!! = lesson!
      },
      error: this.onError
    })

    this.closePopup()
  }

  onError(error: any){
    console.log(error)
  }
}
