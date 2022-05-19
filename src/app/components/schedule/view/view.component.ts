import {Component} from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {errorHandler} from "../../../app.component";
import * as moment from 'moment';
import {ScheduleService} from "../../../services/shared/schedule.service";
import {AddSubjectDialogComponent} from "./add-subject-dialog/add-subject-dialog.component";
import {MatDialog} from "@angular/material/dialog";
import {Cell, Lesson, Schedule} from "../../../models";
import {groupBy} from "../../../utils";

@Component({
  selector: 'app-view',
  templateUrl: './view.component.html',
  styleUrls: ['./view.component.scss']
})
export class ViewComponent {
  weekDays: string[] = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"]

  templateSubjects: Lesson[] = []

  maxWidth: number = 0
  maxHeight: number = 0
  days: number[] = []

  maxDate: string = ""

  isEditMode = false

  schedule: Schedule | undefined
  cells: Cell[] = []

  templatesFilter: string = ""

  constructor(private router: Router, private route: ActivatedRoute, public scheduleService: ScheduleService, public dialog: MatDialog) {
    this.route.queryParams.subscribe(() => {
      this.scheduleService.getSchedule().subscribe({
        next: schedule => {
          this.maxWidth = schedule.info.daysNumber * 200 + 180
          this.maxHeight = schedule.info.maxTime.hours() - schedule.info.minTime.hours()
          this.days = new Array(schedule.info.daysNumber).fill(0).map((_, i) => i)

          this.maxDate = schedule.info.startWeekDate.clone().add(schedule.info.daysNumber, 'days').format('YYYY-MM-DD')

          this.cells = groupBy(schedule.lessons, lesson => lesson.startDate!!.format() + lesson.endDate!!.format())
            .map((value: Lesson[]) => <Cell>{
                startDate: value[0].startDate,
                endDate: value[0].endDate,
                updated: value[0].updated,
                lessons: value
              }
            )

          this.initSchedule(schedule)

          this.schedule = schedule
        },
        error: errorHandler
      })
    });
  }

  initSchedule(schedule: Schedule) {
    schedule.lessons.forEach(lesson => {
      let add = true
      this.templateSubjects.forEach(templateSubject => {
        if (templateSubject.subject == lesson.subject
          && templateSubject.group == lesson.group
          && templateSubject.room == lesson.room
          && templateSubject.teacher == lesson.teacher)
          add = false;
      })
      if (!add || lesson.type != "STAY") return

      this.templateSubjects.push(lesson)
    })
  }

  x(lesson: Cell): number {
    return lesson.startDate.diff(this.scheduleService.schedule!!.info.startWeekDate, 'days') * 200
  }

  y(lesson: Cell): number {
    return ((lesson.startDate.hours() - this.scheduleService.schedule!!.info.minTime.hours()) * 60 + lesson.startDate.minutes()) * 2
  }

  yTime(time: moment.Moment): number {
    return ((time.hours() - this.scheduleService.schedule!!.info.minTime.hours()) * 60 + time.minutes()) * 2
  }

  width(_: Cell): number {
    return 180
  }

  height(lesson: Cell): number {
    return ((lesson.endDate.hours() * 60 + lesson.endDate.minutes()) - (lesson.startDate.hours() * 60 + lesson.startDate.minutes())) * 2
  }

  add(lesson: Lesson | undefined = undefined) {
    const dialogRef = this.dialog.open(AddSubjectDialogComponent, {data: lesson})
    dialogRef.afterClosed().subscribe((lesson: Lesson) => this.addSubjectToSchedule(lesson))
  }

  templateFilter(input: string, lesson: Lesson): boolean {
    input = input.toLowerCase()

    return lesson.subject.toLowerCase().includes(input)
      || lesson.group.toLowerCase().includes(input)
      || lesson.teacher.toLowerCase().includes(input)
      || lesson.room.toLowerCase().includes(input)
  }

  //removeSubjectFromSchedule(subject: Subject) {
    //this.scheduleService.removeLesson(subject)
  //}

  addSubjectToSchedule(lesson: Lesson) {
    this.scheduleService.addLesson(lesson)
  }

  confirmEdit() {
    this.scheduleService.confirmEdit()
  }
}
