import {Component, OnInit} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {ActivatedRoute, Router} from "@angular/router";
import {AppComponent, errorHandler} from "../../../app.component";
import {Schedule, ScheduleLesson, Subject} from "../../../data";
import * as moment from 'moment';
import * as Collections from 'typescript-collections';

@Component({
  selector: 'app-view',
  templateUrl: './view.component.html',
  styleUrls: ['./view.component.scss']
})
export class ViewComponent implements OnInit {
  schedule: Schedule | undefined = undefined
  weekDays: string[] = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"]

  templateSubjects: Subject[] = []

  times: Collections.Set<moment.Moment> = new Collections.Set();

  maxWidth: number = 0
  maxHeight: number = 0

  minHour: number = 24
  maxHour: number = 0

  isEditMode = false

  constructor(private router: Router, private http: HttpClient, private parent: AppComponent, private route: ActivatedRoute) {
    this.route.queryParams.subscribe(() => {
      http.get<Schedule>("api/schedule/view").subscribe({
        next: schedule => {
          for (let lesson of schedule.lessons) {
            lesson.startTime = new Date(lesson.startTime)
            lesson.endTime = new Date(lesson.endTime)


            lesson.startTime = new Date(lesson.startTime.getTime() + lesson.startTime.getTimezoneOffset() * 60000)
            lesson.endTime = new Date(lesson.endTime.getTime() + lesson.endTime.getTimezoneOffset() * 60000)

            this.times.add(moment(lesson.startTime.toLocaleTimeString(), [moment.ISO_8601, 'HH:mm A']))
            this.times.add(moment(lesson.endTime.toLocaleTimeString(), [moment.ISO_8601, 'HH:mm A']))


            let width = lesson.dayIndex + lesson.weekIndex * 7
            if (this.maxWidth < width) this.maxWidth = width

            let minHour = lesson.startTime.getHours()
            if (this.minHour > minHour) this.minHour = minHour

            let maxHour = lesson.endTime.getHours()
            if (this.maxHour < maxHour) this.maxHour = maxHour
          }
          this.maxHour++

          this.times.add(moment(this.maxHour, [moment.ISO_8601, 'H']))
          this.times.add(moment(this.minHour, [moment.ISO_8601, 'H']))

          this.maxWidth = this.maxWidth * 200 + 180
          this.maxHeight *= 2

          this.initSchedule(schedule)
        },
        error: errorHandler
      })
    });
  }

  initSchedule(schedule: Schedule) {
    schedule.lessons.forEach(lesson => {
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

  x(lesson: ScheduleLesson): string {
    return (lesson.dayIndex + lesson.weekIndex * 7) * 200 + 'px'
  }

  y(lesson: ScheduleLesson) {
    return ((lesson.startTime.getHours() - this.minHour) * 60 + lesson.startTime.getMinutes()) * 2 + 'px'
  }

  yTime(time: moment.Moment) {
    return ((time.hours() - this.minHour) * 60 + time.minutes()) * 2
  }

  width(lesson: ScheduleLesson) {
    return '180px'
  }

  height(lesson: ScheduleLesson) {
    return (((lesson.endTime.getHours() * 60 + lesson.endTime.getMinutes()) - (lesson.startTime.getHours() * 60 + lesson.startTime.getMinutes())) * 2 + 'px')
  }

}
