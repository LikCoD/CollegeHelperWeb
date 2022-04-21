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
      http.get<Schedule>(`api/schedule/view${this.router.url.substring(9)}`).subscribe({
        next: schedule => {
          schedule.info.startWeekDate = moment.utc(schedule.info.startWeekDate)
          schedule.info.date = moment.utc(schedule.info.date)

          for (let lesson of schedule.lessons) {
            lesson.startDate = moment.utc(lesson.startDate)
            lesson.endDate = moment.utc(lesson.endDate)

            this.times.add(moment(lesson.startDate.format("HH:mm A"), [moment.ISO_8601, 'HH:mm A']))
            this.times.add(moment(lesson.endDate.format("HH:mm A"), [moment.ISO_8601, 'HH:mm A']))


            let width = lesson.startDate.diff(schedule.info.startWeekDate, 'days')
            if (this.maxWidth < width) this.maxWidth = width

            let minHour = lesson.startDate.hours()
            if (this.minHour > minHour) this.minHour = minHour

            let maxHour = lesson.endDate.hours()
            if (this.maxHour < maxHour) this.maxHour = maxHour
          }
          this.maxHour++

          this.times.add(moment(this.maxHour, [moment.ISO_8601, 'H']))
          this.times.add(moment(this.minHour, [moment.ISO_8601, 'H']))

          this.maxWidth = this.maxWidth * 200 + 180
          this.maxHeight = (this.maxHour - this.minHour) * 60 * 2

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
    return lesson.startDate.diff(this.schedule!!.info.startWeekDate, 'days') * 200 + 'px'
  }

  y(lesson: ScheduleLesson) {
    return ((lesson.startDate.hours() - this.minHour) * 60 + lesson.startDate.minutes()) * 2 + 'px'
  }

  yTime(time: moment.Moment) {
    return ((time.hours() - this.minHour) * 60 + time.minutes()) * 2
  }

  width(lesson: ScheduleLesson) {
    return '180px'
  }

  height(lesson: ScheduleLesson) {
    return (((lesson.endDate.hours() * 60 + lesson.endDate.minutes()) - (lesson.startDate.hours() * 60 + lesson.startDate.minutes())) * 2 + 'px')
  }

}
