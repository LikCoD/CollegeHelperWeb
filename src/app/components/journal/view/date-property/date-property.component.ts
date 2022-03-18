import {Component, Input, OnInit} from '@angular/core';
import {HttpClient} from "@angular/common/http";

@Component({
  selector: 'app-date-property',
  templateUrl: './date-property.component.html',
  styleUrls: ['./date-property.component.sass']
})
export class DatePropertyComponent implements OnInit {

  @Input() lesson: Lesson | undefined

  types = ["Laboratory", "Practice", "General"]

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

  confirm(type: string, homework: string, smallDescription: string, description: string) {
    this.http.get<Lesson>(`api/journal/teachers/editInfo?lessonId=${this.lesson!!.id}&type=${type}&homework=${homework}&smallDescription=${smallDescription}&description=${description}`, {observe: 'response'}).subscribe(lesson => {
      let error = lesson.headers.get("error")
      if (error != undefined) {
        if (error == "not authorized")
          alert(error)
        else
          alert(error)

        return
      }

      this.lesson!!.homework = lesson.body!!.homework
      this.lesson!!.smallDescription = lesson.body!!.smallDescription
      this.lesson!!.description = lesson.body!!.description

      console.log(this.lesson)
    })

    this.closePopup()
  }
}
