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

  checkAddGeneral(lesson: Lesson, add: boolean): Lesson[] {
    if (this.schedule == undefined) return []

    let dayLessons = this.schedule.lessons.filter(value => value.endDate?.format("YY-MM-DD") == lesson.endDate?.format("YY-MM-DD"))
    dayLessons.forEach(value => this.schedule!!.lessons.splice(this.schedule!!.lessons.indexOf(value), 1))

    if (!add) return []

    return dayLessons
  }

  addLesson(lesson: Lesson, addGeneral: boolean) {
    if (this.schedule == undefined) return

    this.httpService.addLesson(lesson).subscribe(value => {
      this.schedule!!.lessons.push(value)
      this.initSchedule(this.schedule!!)
    })
  }

  removeLesson(lesson: Lesson, addGeneral: boolean) {
    if (this.schedule == undefined) return

    let lessons = this.checkAddGeneral(lesson, addGeneral)
    let i = lessons.indexOf(lesson)
    if (i != -1) {
      lessons.splice(i, 1)
      lessons.forEach(value => this.httpService.addLesson(value).subscribe(value => {
        this.schedule!!.lessons.push(value)
        this.initSchedule(this.schedule!!)
      }))
    } else {
      this.httpService.removeLesson(lesson).subscribe(_ => {
        this.schedule!!.lessons.splice(this.schedule!!.lessons.indexOf(lesson), 1)
        this.initSchedule(this.schedule!!)
      })
    }
  }

  editLesson(oldLessons: Lesson, lesson: Lesson, addGeneral: boolean) {
    if (this.schedule == undefined) return
    lesson.id = oldLessons.id

    let lessons = this.checkAddGeneral(oldLessons, addGeneral)
    let i = lessons.indexOf(oldLessons)
    if (i != -1) {
      lessons[i] = lesson
      lessons.forEach(value => this.httpService.addLesson(value).subscribe(value => {
        this.schedule!!.lessons.push(value)
        this.initSchedule(this.schedule!!)
      }))
    } else {
      this.httpService.updateLesson(lesson).subscribe(value => {
        this.schedule!!.lessons[this.schedule!!.lessons.indexOf(oldLessons)] = value
        this.initSchedule(this.schedule!!)
      })
    }
  }

  makeGeneral() {
    if (this.schedule == undefined) return

    this.httpService.makeGeneral(this.schedule!!.info.type, this.schedule!!.info.typeName)
  }
}
