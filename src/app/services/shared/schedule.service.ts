import {Injectable} from '@angular/core';
import * as moment from "moment";
import * as Collections from "typescript-collections";
import {Observable, Subject} from "rxjs";
import {Cell, Lesson, Schedule, Types} from "../../models/schedule";
import {ScheduleHttpService} from "../http/schedule-http.service";

@Injectable({providedIn: 'root'})
export class ScheduleService {
  schedule$ = new Subject<Schedule>()
  scale$ = new Subject<number>()

  schedule: Schedule

  constructor(private httpService: ScheduleHttpService) {
  }

  readonly lessonHeight = 90
  minLessonMinutes = 0

  set scaleY(value: number) {
    if (value < this.minYScale) value = this.minYScale
    if (value > this.maxYScale) value = this.maxYScale

    this.scaleY_ = value

    this.scale$.next(value)
  }

  private scaleY_ = 1
  minYScale = 1
  maxYScale = 1

  getCellHeight(cell: Cell): number {
    return cell.endDate.diff(cell.startDate, 'minutes') * this.scaleY_
  }

  getCellWidth(_: Cell): number {
    return 180
  }

  getCellX(cell: Cell): number {
    return cell.startDate.diff(this.schedule.info.startWeekDate, 'days') * 200
  }

  getCellY(cell: Cell): number {
    return this.getTimeY(cell.startDate)
  }

  getTimeY(time: moment.Moment): number {
    return ((time.hours() - this.schedule.info.minTime.hours()) * 60 + time.minutes()) * this.scaleY_
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

      let et = moment(lesson.endDate!!.format("H:m"), ['H:m'])
      if (maxTime < et) maxTime = et
    }

    this.minLessonMinutes = Number.MAX_VALUE

    let maxCellLessonsMinutes = 0
    let maxCellLessons = 0

    for (let cell of cells.values()) {
      let height = cell.endDate.diff(cell.startDate, 'minutes')
      if (this.minLessonMinutes > height) this.minLessonMinutes = height

      if (cell.lessons.length * height > maxCellLessons * maxCellLessonsMinutes) {
        maxCellLessonsMinutes = height
        maxCellLessons = cell.lessons.length
      }
    }

    this.minYScale = this.lessonHeight / this.minLessonMinutes
    this.maxYScale = this.lessonHeight / maxCellLessonsMinutes * maxCellLessons

    this.scaleY_ = this.minYScale

    schedule.info.daysNumber = daysNumber + 1

    schedule.info.maxTime = moment(maxTime, [moment.ISO_8601, 'H'])
    times.add(schedule.info.maxTime)

    schedule.info.minTime = moment(minTime, [moment.ISO_8601, 'H'])
    times.add(schedule.info.minTime)

    schedule.info.times = times.toArray()

    schedule.cells = Array.from(cells.values())

    this.schedule = schedule
    this.schedule$.next(schedule)
  }

  getSchedule(type: string, name: string, studyPlaceID: string): Observable<Schedule> {
    this.httpService.getSchedule(type, name, studyPlaceID).subscribe({
      next: value => this.initSchedule(value)
    })

    return this.schedule$
  }

  addLesson(lesson: Lesson) {
    this.httpService.addLesson(lesson).subscribe(value => {
      this.schedule.lessons.push(value)
      this.initSchedule(this.schedule)
    })
  }

  removeLesson(lesson: Lesson) {
    this.httpService.removeLesson(lesson).subscribe(_ => {
      this.schedule.lessons.splice(this.schedule.lessons.indexOf(lesson), 1)
      this.initSchedule(this.schedule)
    })
  }

  editLesson(lesson: Lesson) {
    this.httpService.updateLesson(lesson).subscribe(value => {
      this.schedule.lessons[this.schedule.lessons.findIndex(l => l.id == lesson.id)] = value
      this.initSchedule(this.schedule)
    })
  }

  makeGeneral() {
    this.httpService.makeGeneral(this.schedule.info.type, this.schedule.info.typeName)
  }

  getTypes(studyPlaceID: string): Observable<Types> {
    return this.httpService.getTypes(studyPlaceID)
  }
}
