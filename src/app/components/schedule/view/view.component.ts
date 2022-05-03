import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {errorHandler} from "../../../app.component";
import {Schedule, ScheduleLesson, Subject} from "../../../data";
import * as moment from 'moment';
import {ScheduleService} from "../../../services/shared/schedule.service";

@Component({
  selector: 'app-view',
  templateUrl: './view.component.html',
  styleUrls: ['./view.component.scss']
})
export class ViewComponent implements OnInit {
  weekDays: string[] = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"]

  templateSubjects: Subject[] = []
  selectedSubject: Subject | undefined

  maxWidth: number = 0
  maxHeight: number = 0
  days: number[] = []

  minDate: string = ""
  maxDate: string = ""

  isEditMode = false
  addSubject = false

  templatesFilter: string = ""

  constructor(private router: Router, private route: ActivatedRoute, public scheduleService: ScheduleService) {
    this.route.queryParams.subscribe(() => {
      this.scheduleService.getSchedule().subscribe({
        next: schedule => {
          if (schedule == undefined) return

          this.maxWidth = schedule.info.days * 200 + 180
          this.maxHeight = schedule.info.studyHours * 60 * 2
          this.days = new Array(schedule.info.days).fill(0).map((_, i) => i)

          this.maxDate = schedule.info.startWeekDate.clone().add(schedule.info.days, 'days').format('YYYY-MM-DDTHH:mm:ss')
          this.minDate = schedule.info.startWeekDate.format('YYYY-MM-DDTHH:mm:ss')

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
        if (!add || subject.type != "STAY") return

        this.templateSubjects.push(subject)
      })
    })
  }

  ngOnInit(): void {
  }

  x(lesson: ScheduleLesson): string {
    return lesson.startDate.diff(this.scheduleService.schedule!!.info.startWeekDate, 'days') * 200 + 'px'
  }

  y(lesson: ScheduleLesson) {
    return ((lesson.startDate.hours() - this.scheduleService.schedule!!.info.minTime.hours()) * 60 + lesson.startDate.minutes()) * 2 + 'px'
  }

  yTime(time: moment.Moment) {
    return ((time.hours() - this.scheduleService.schedule!!.info.minTime.hours()) * 60 + time.minutes()) * 2
  }

  width(_: ScheduleLesson) {
    return '180px'
  }

  height(lesson: ScheduleLesson) {
    return (((lesson.endDate.hours() * 60 + lesson.endDate.minutes()) - (lesson.startDate.hours() * 60 + lesson.startDate.minutes())) * 2 + 'px')
  }

  add(subject: Subject) {
    this.selectedSubject = subject
    this.addSubject = true
  }

  templateFilter(input: string, subject: Subject): boolean {
    input = input.toLowerCase()

    return subject.subject.toLowerCase().includes(input)
      || subject.group.toLowerCase().includes(input)
      || subject.teacher.toLowerCase().includes(input)
      || subject.room.toLowerCase().includes(input)
  }

  addSubjectToSchedule(subject: Subject, startDate: moment.Moment, endDate: moment.Moment) {
    this.scheduleService.addSubject(subject, startDate, endDate)
  }

  confirmEdit() {
    console.table(this.scheduleService.addedLessons)
    this.scheduleService.confirmEdit()
  }
}
