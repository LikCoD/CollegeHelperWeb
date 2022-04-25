import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {AppComponent, errorHandler} from "../../../app.component";
import {Schedule, ScheduleLesson, Subject} from "../../../data";
import * as moment from 'moment';
import {HttpService} from "../../../services/http/http.service";

@Component({
  selector: 'app-view',
  templateUrl: './view.component.html',
  styleUrls: ['./view.component.scss']
})
export class ViewComponent implements OnInit {
  schedule: Schedule | undefined
  weekDays: string[] = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"]

  templateSubjects: Subject[] = []

  maxWidth: number = 0
  maxHeight: number = 0
  days: number[] = []

  isEditMode = false

  constructor(private router: Router, private parent: AppComponent, private route: ActivatedRoute, private httpService: HttpService) {
    this.route.queryParams.subscribe(() => {
      this.httpService.getSchedule().subscribe({
        next: schedule => {
          this.maxWidth = schedule.info.days * 200 + 180
          this.maxHeight = (schedule.info.maxTime.hours() - schedule.info.minTime.hours()) * 60 * 2
          this.days = new Array(schedule.info.days).fill(0).map((_, i) => i)

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
    return ((lesson.startDate.hours() - this.schedule!!.info.minTime.hours()) * 60 + lesson.startDate.minutes()) * 2 + 'px'
  }

  yTime(time: moment.Moment) {
    return ((time.hours() - this.schedule!!.info.minTime.hours()) * 60 + time.minutes()) * 2
  }

  width(_: ScheduleLesson) {
    return '180px'
  }

  height(lesson: ScheduleLesson) {
    return (((lesson.endDate.hours() * 60 + lesson.endDate.minutes()) - (lesson.startDate.hours() * 60 + lesson.startDate.minutes())) * 2 + 'px')
  }

}
