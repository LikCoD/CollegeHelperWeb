import {Injectable} from '@angular/core';
import {HttpService} from "../http/http.service";
import * as moment from "moment";
import * as Collections from "typescript-collections";
import * as rxjs from "rxjs";
import {Observable} from "rxjs";
import {Cell, Lesson, Schedule, Types} from "../../models/schedule";

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

    let minTime = moment('24:00', ['H:m'])
    let maxTime = moment('00:00', ['H:m'])

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

      let st = moment(lesson.startDate!!.format("H:m"), ['H:m'])
      if (minTime > st) minTime = st

      let et = moment(lesson.startDate!!.format("H:m"), ['H:m'])
      if (maxTime < et) maxTime = et
    }
    schedule.info.daysNumber = daysNumber + 1

    schedule.info.maxTime = moment(maxTime, [moment.ISO_8601, 'H'])
    times.add(schedule.info.maxTime)

    schedule.info.minTime = moment(minTime, [moment.ISO_8601, 'H'])
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
    if (!this.schedule || !lesson) return

    this.httpService.addLesson(lesson).subscribe(value => {
      this.schedule!!.lessons.push(value)
      this.initSchedule(this.schedule!!)
    })
  }

  removeLesson(lesson: Lesson) {
    if (this.schedule == undefined) return

    this.httpService.removeLesson(lesson).subscribe(_ => {
      this.schedule!!.lessons.splice(this.schedule!!.lessons.indexOf(lesson), 1)
      this.initSchedule(this.schedule!!)
    })
  }

  editLesson(oldLessons: Lesson, lesson: Lesson) {
    if (this.schedule == undefined) return
    lesson.id = oldLessons.id

    this.httpService.updateLesson(lesson).subscribe(value => {
      this.schedule!!.lessons[this.schedule!!.lessons.indexOf(oldLessons)] = value
      this.initSchedule(this.schedule!!)
    })
  }

  makeGeneral() {
    if (this.schedule == undefined) return

    this.httpService.makeGeneral(this.schedule!!.info.type, this.schedule!!.info.typeName)
  }

  getTypes(studyPlaceID: string): Observable<Types> {
    return this.httpService.getTypes(studyPlaceID)
  }
}
