import {Component} from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import * as moment from 'moment';
import {ScheduleService} from "../../../services/shared/schedule.service";
import {AddSubjectDialogComponent} from "./add-subject-dialog/add-subject-dialog.component";
import {MatDialog} from "@angular/material/dialog";
import {Cell, Lesson, Schedule} from "../../../models";
import {groupBy} from "../../../utils";
import {map, Observable} from "rxjs";

@Component({
  selector: 'app-view',
  templateUrl: './view.component.html',
  styleUrls: ['./view.component.scss']
})
export class ViewComponent {
  weekDays: string[] = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"]

  templateLessons: Lesson[] = []

  maxWidth: number = 0
  maxHeight: number = 0
  days: number[] = []

  maxDate: string = ""

  isEditMode = false

  schedule$: Observable<Schedule>
  cells: Cell[] = []

  templatesFilter: string = ""

  constructor(private router: Router, private route: ActivatedRoute, public scheduleService: ScheduleService, public dialog: MatDialog) {
    this.route.queryParams.subscribe(() => {
      this.schedule$ = this.scheduleService.getSchedule().pipe(
        map(schedule => {
          this.maxWidth = schedule.info.daysNumber * 200 + 180
          this.maxHeight = ( schedule.info.maxTime.hours() - schedule.info.minTime.hours()) * 60 * 2
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

          return schedule
        })
      )
    });
  }

  initSchedule(schedule: Schedule) {
    schedule.lessons.forEach(lesson => {
      let add = true
      this.templateLessons.forEach(templateSubject => {
        if (templateSubject.subject == lesson.subject
          && templateSubject.group == lesson.group
          && templateSubject.room == lesson.room
          && templateSubject.teacher == lesson.teacher)
          add = false;
      })
      if (!add || lesson.type != "STAY") return

      this.templateLessons.push(lesson)
    })
  }

  yTime(time: moment.Moment): number {
    return ((time.hours() - this.scheduleService.schedule!!.info.minTime.hours()) * 60 + time.minutes()) * 2
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
