import {Component, Injectable, OnInit} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {ActivatedRoute, Router} from "@angular/router";
import {AppComponent} from "../../../app.component";
import {Subject} from "../../../data";

@Component({
  selector: 'app-view',
  templateUrl: './view.component.html',
  styleUrls: ['./view.component.sass']
})

@Injectable()
export class ViewComponent implements OnInit {
  schedule: Schedule | undefined = undefined

  templateSubjects: Subject[] = []

  isEditMode = false

  constructor(private router: Router, private http: HttpClient, private parent: AppComponent, private route: ActivatedRoute) {
    this.route.queryParams.subscribe(() => {


      http.get<Schedule>("api" + router.url, {observe: 'response'}).subscribe(schedule => {
        let error = schedule.headers.get("error")
        if (error != undefined) {
          if (error == "not authorized")
            router.navigateByUrl("login")
          else
            alert(error)

          router.navigateByUrl("schedule/login")

          return
        }

        this.initSchedule(schedule.body!!)
      })
    });
  }

  initSchedule(schedule: Schedule){
    schedule.subjects.forEach(lesson => {
      if (lesson == null) return
      lesson.subjects.forEach(subject => {
        let add = true
        this.templateSubjects.forEach(templateSubject => {
          if (templateSubject.subject == subject.subject
            && templateSubject.group == subject.group
            && templateSubject.room == subject.room
            && templateSubject.teacher == subject.teacher)
            add = false;
        })
        if (add && subject.type == "STAY") {
          this.templateSubjects.push(subject)
        }
      })
    })

    this.schedule = schedule
    this.parent.setupSchedule()
  }

  ngOnInit(): void {
    this.route.fragment.subscribe(fragment => {
      this.isEditMode = fragment == "edit"
    })
  }

}


interface Schedule {
  status: State[]
  subjects: Lesson[],
  info: Info,
  error?: string
}

interface State {
  status: string,
  weekIndex: number,
  dayIndex: number
}

interface Lesson {
  weekIndex: number,
  columnIndex: number,
  rowIndex: number,
  isStay: boolean,
  date: string,
  subjects: Subject[]
}

interface Info {
  weeksCount: number,
  daysCount: number,
  subjectsCount: number,
  type: string,
  name: string,
  educationPlaceId: number,
  educationPlaceName: string
}
