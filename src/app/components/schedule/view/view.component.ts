import {Component} from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {errorHandler} from "../../../app.component";
import {Schedule, ScheduleLesson, Subject} from "../../../data";
import * as moment from 'moment';
import {ScheduleService} from "../../../services/shared/schedule.service";
import {AddSubjectDialogComponent} from "./add-subject-dialog/add-subject-dialog.component";
import {MatDialog} from "@angular/material/dialog";

@Component({
  selector: 'app-view',
  templateUrl: './view.component.html',
  styleUrls: ['./view.component.scss']
})
export class ViewComponent {
  weekDays: string[] = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"]

  templateSubjects: Subject[] = []

  maxWidth: number = 0
  maxHeight: number = 0
  days: number[] = []

  maxDate: string = ""

  isEditMode = false

  schedule: Schedule | undefined

  templatesFilter: string = ""

  constructor(private router: Router, private route: ActivatedRoute, public scheduleService: ScheduleService, public dialog: MatDialog) {
    this.route.queryParams.subscribe(() => {
      this.scheduleService.getSchedule().subscribe({
        next: schedule => {
          this.maxWidth = schedule.info.days * 200 + 180
          this.maxHeight = schedule.info.studyHours * 60 * 2
          this.days = new Array(schedule.info.days).fill(0).map((_, i) => i)

          this.maxDate = schedule.info.startWeekDate.clone().add(schedule.info.days, 'days').format('YYYY-MM-DD')

          this.initSchedule(schedule)

          this.schedule = schedule
        },
        error: errorHandler
      })
    });
  }

  initSchedule(schedule: Schedule) {
    schedule.lessons.forEach(lesson => {
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

  x(lesson: ScheduleLesson): number {
    return lesson.startDate.diff(this.scheduleService.schedule!!.info.startWeekDate, 'days') * 200
  }

  y(lesson: ScheduleLesson): number {
    return ((lesson.startDate.hours() - this.scheduleService.schedule!!.info.minTime.hours()) * 60 + lesson.startDate.minutes()) * 2
  }

  yTime(time: moment.Moment) {
    return ((time.hours() - this.scheduleService.schedule!!.info.minTime.hours()) * 60 + time.minutes()) * 2
  }

  width(_: ScheduleLesson): number {
    return 180
  }

  height(lesson: ScheduleLesson): number {
    return ((lesson.endDate.hours() * 60 + lesson.endDate.minutes()) - (lesson.startDate.hours() * 60 + lesson.startDate.minutes())) * 2
  }

  add(subject: Subject | undefined = undefined) {
    const dialogRef = this.dialog.open(AddSubjectDialogComponent, { data: subject })
    dialogRef.afterClosed().subscribe((subject: Subject) => this.addSubjectToSchedule(subject))
  }

  templateFilter(input: string, subject: Subject): boolean {
    input = input.toLowerCase()

    return subject.subject.toLowerCase().includes(input)
      || subject.group.toLowerCase().includes(input)
      || subject.teacher.toLowerCase().includes(input)
      || subject.room.toLowerCase().includes(input)
  }

  removeSubjectFromSchedule(subject: Subject){
    //this.scheduleService.removeLesson(subject)
  }

  addSubjectToSchedule(subject: Subject) {
    this.scheduleService.addSubject(subject)
  }

  confirmEdit() {
    this.scheduleService.confirmEdit()
  }
}
