import {Injectable} from '@angular/core';
import {HttpService} from "../http/http.service";
import * as moment from "moment";
import * as Collections from "typescript-collections";
import * as rxjs from "rxjs";
import {Cell, Lesson, Schedule} from "../../models";

@Injectable({
  providedIn: 'root'
})
export class ScheduleService {
  schedule: Schedule | undefined;
  cells: Cell[]

  addedLessons: Lesson[] = [];
  removedLessons: Lesson[] = [];
  private currentAddId = 1;

  scheduleChange: rxjs.Subject<Schedule> = new rxjs.Subject<Schedule>()

  constructor(private httpService: HttpService) {

  }

  initSchedule(schedule: Schedule) {
    let cells = new Map<string, Cell>()

    let minHours = 24
    let maxHours = 0

    let times = new Collections.Set<moment.Moment>()
    let daysNumber = 0

    for (let lesson of schedule.lessons) {
      let key = lesson.endDate!!.format() + lesson.startDate!!.format()
      let cell = cells.get(key)
      if (cell == null) cells.set(key, {
        endDate: lesson.endDate!!,
        lessons: [lesson],
        startDate: lesson.startDate!!,
        updated: lesson.updated
      })
      else cell.lessons.push(lesson)

      times.add(moment(lesson.startDate!!.format("HH:mm"), [moment.ISO_8601, 'HH:mm']))
      times.add(moment(lesson.endDate!!.format("HH:mm"), [moment.ISO_8601, 'HH:mm']))

      let days = lesson.startDate!!.diff(schedule.info.startWeekDate, 'days')
      if (daysNumber < days) daysNumber = days

      let minHour = lesson.startDate!!.hours()
      if (minHours > minHour) minHours = minHour

      let maxHour = lesson.endDate!!.hours()
      if (maxHours < maxHour) maxHours = maxHour
    }
    maxHours++

    schedule.info.daysNumber = daysNumber + 1

    schedule.info.maxTime = moment(maxHours, [moment.ISO_8601, 'H'])
    times.add(schedule.info.maxTime)

    schedule.info.minTime = moment(minHours, [moment.ISO_8601, 'H'])
    times.add(schedule.info.minTime)

    schedule.info.times = times.toArray()

    this.schedule = schedule
    this.cells = Array.from(cells.values())

    this.scheduleChange.next(schedule)
  }

  getSchedule(): rxjs.Subject<Schedule> {
    this.httpService.getSchedule().subscribe(this.initSchedule.bind(this));

    return this.scheduleChange
  }

  addLesson(lesson: Lesson) {
    if (this.schedule == undefined) return

    lesson.id = this.currentAddId.toString()
    this.currentAddId += 1

    this.addedLessons.push(lesson)
    this.schedule.lessons.push(lesson)

    this.initSchedule(this.schedule)
  }

  removeLesson(lesson: Lesson) {
    if (this.schedule == undefined) return

    this.removedLessons.push(lesson)
    this.schedule.lessons.splice(this.schedule.lessons.indexOf(lesson), 1)

    this.initSchedule(this.schedule)
  }

  confirmEdit() {
    this.addedLessons.forEach(value =>
      this.httpService.addLessons(value).subscribe((s) => {
        console.log(s)
      })
    )

    this.getSchedule()
  }
}
