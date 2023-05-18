import {Injectable} from "@angular/core"
import * as moment from "moment"
import * as Collections from "typescript-collections"
import {BehaviorSubject, filter, map, Observable, Subject} from "rxjs"
import {Cell, Lesson, Schedule, ScheduleTypes} from "../../../shared/models/schedule"
import {ScheduleHttpService} from "./http/schedule-http.service"

@Injectable({providedIn: "root"})
export class ScheduleService {
  schedule$ = new BehaviorSubject<Schedule | undefined>(undefined)
  scale$ = new Subject<number>()
  timeViewMode$ = new Subject<boolean>()

  schedule: Schedule
  readonly lessonHeight = 90
  minLessonMinutes = 0
  minYScale = 1
  maxYScale = 10
  preferredMaxYSScale = 1
  isTimeMode = true
  private scaleY_ = 1

  constructor(private httpService: ScheduleHttpService) {
  }

  get scaleY(): number {
    return this.scaleY_
  }

  set scaleY(value: number) {
    if (value < this.minYScale) value = this.minYScale
    if (value > this.maxYScale) value = this.maxYScale

    this.scaleY_ = value

    this.scale$.next(value)
  }

  getCellHeight(cell: Cell): number {
    return (this.isTimeMode ? cell.endDate.diff(cell.startDate, "minutes") : 45) * this.scaleY_
  }

  getCellWidth(_: Cell): number {
    return 180
  }

  getCellX(cell: Cell): number {
    return cell.startDate.diff(this.schedule.info.startDate, "days") * 200
  }

  getCellY(cell: Cell): number {
    return this.isTimeMode ? this.getTimeY(cell.startDate) : this.getLessonIndexY(cell.lessonIndex)
  }

  getLessonIndexY(index: number): number {
    return (index - this.schedule.info.minLessonIndex) * 55 * this.scaleY_
  }

  getTimeY(time: moment.Moment): number {
    return (
      ((time.hours() - this.schedule.info.minTime.hours()) * 60 + time.minutes()) * this.scaleY_
    )
  }

  initSchedule(schedule: Schedule) {
    let cells = new Map<string, Cell>()

    let minLessonIndex = Number.MAX_VALUE
    let maxLessonIndex = Number.MIN_VALUE

    let times = new Collections.Set<moment.Moment>()
    let minTime = moment("24:00", ["H:m"])
    let maxTime = moment("00:00", ["H:m"])

    let daysNumber = 0

    for (let lesson of schedule.lessons) {
      let key = lesson.endDate!!.format() + lesson.startDate!!.format()
      let cell = cells.get(key)
      if (cell == null)
        cells.set(key, {
          lessons: [lesson],
          lessonIndex: lesson.lessonIndex,
          endDate: lesson.endDate!!,
          startDate: lesson.startDate!!
        })
      else cell.lessons.push(lesson)

      times.add(moment(lesson.startDate!!.format("HH:mm"), [moment.ISO_8601, "HH:mm"]))
      times.add(moment(lesson.endDate!!.format("HH:mm"), [moment.ISO_8601, "HH:mm"]))

      let days = lesson.startDate!!.diff(schedule.info.startDate, "days")
      if (daysNumber < days) daysNumber = days

      if (lesson.lessonIndex < minLessonIndex) minLessonIndex = lesson.lessonIndex
      if (lesson.lessonIndex > maxLessonIndex) maxLessonIndex = lesson.lessonIndex

      let st = moment(lesson.startDate!!.format("H:m"), ["H:m"])
      if (minTime > st) minTime = st

      let et = moment(lesson.endDate!!.format("H:m"), ["H:m"])
      if (maxTime < et) maxTime = et
    }

    this.minLessonMinutes = Number.MAX_VALUE

    let maxCellLessonsMinutes = 0
    let maxCellLessons = 0

    for (let cell of cells.values()) {
      let height = cell.endDate.diff(cell.startDate, "minutes")
      if (this.minLessonMinutes > height) this.minLessonMinutes = height

      if (cell.lessons.length * height > maxCellLessons * maxCellLessonsMinutes) {
        maxCellLessonsMinutes = height
        maxCellLessons = cell.lessons.length
      }
    }

    this.minYScale = this.lessonHeight / this.minLessonMinutes
    this.preferredMaxYSScale = (this.lessonHeight / maxCellLessonsMinutes) * maxCellLessons

    if (this.maxYScale < this.preferredMaxYSScale) this.maxYScale = this.preferredMaxYSScale

    this.scaleY_ = this.minYScale

    schedule.info.daysNumber = daysNumber + 1

    schedule.info.minLessonIndex = minLessonIndex
    schedule.info.maxLessonIndex = maxLessonIndex

    schedule.info.indexes = Array(maxLessonIndex - minLessonIndex + 1)
      .fill(0)
      .map((_, i) => maxLessonIndex - i)

    schedule.info.minTime = moment(minTime, [moment.ISO_8601, "H"])
    times.add(schedule.info.minTime)

    schedule.info.maxTime = moment(maxTime, [moment.ISO_8601, "H"])
    times.add(schedule.info.maxTime)

    schedule.info.times = times.toArray()

    schedule.cells = Array.from(cells.values())

    this.schedule = schedule
    this.schedule$.next(schedule)
  }

  getSchedule(type: string, name: string, studyPlaceID: string, from?: string, to?: string): Observable<Schedule> {
    this.httpService.getSchedule(type, name, studyPlaceID, from, to).subscribe({
      next: (value) => this.initSchedule(value)
    })

    return this.schedule$.pipe(filter(v => !!v), map(v => v!))
  }

  getScheduleRaw(
    type: string,
    name: string,
    studyPlaceID: string,
    from: string,
    to: string
  ): Observable<Schedule> {
    return this.httpService.getSchedule(type, name, studyPlaceID, from, to)
  }

  getGeneralSchedule(type: string, name: string, studyPlaceID: string): Observable<Schedule> {
    this.httpService.getGeneralSchedule(type, name, studyPlaceID).subscribe({
      next: (value) => this.initSchedule(value)
    })

    return this.schedule$.pipe(filter(v => !!v), map(v => v!))
  }

  addLesson(lesson: Lesson) {
    this.httpService.addLesson(lesson).subscribe((value) => {
      this.schedule.lessons.push(value)
      this.initSchedule(this.schedule)
    })
  }

  removeLesson(lesson: Lesson) {
    this.httpService.removeLesson(lesson).subscribe((_) => {
      this.schedule.lessons.splice(this.schedule.lessons.indexOf(lesson), 1)
      this.initSchedule(this.schedule)
    })
  }

  editLesson(lesson: Lesson) {
    this.httpService.updateLesson(lesson).subscribe((value) => {
      this.schedule.lessons[this.schedule.lessons.findIndex((l) => l.id == lesson.id)] = value
      this.initSchedule(this.schedule)
    })
  }

  updateLesson(lesson: Lesson) {
    return this.httpService.updateLesson(lesson)
  }

  makeGeneral() {
    this.httpService.makeGeneral(this.schedule.info.type, this.schedule.info.typeName)
  }

  getTypes(studyPlaceID: string): Observable<ScheduleTypes> {
    return this.httpService.getTypes(studyPlaceID)
  }

  changeViewMode(isGeneral: boolean) {
    const type = this.schedule.info.type
    const typeName = this.schedule.info.typeName
    const studyPlaceID = this.schedule.info.studyPlaceID

    if (isGeneral) this.getGeneralSchedule(type, typeName, studyPlaceID)
    else this.getSchedule(type, typeName, studyPlaceID)
  }

  changeTimeMode(isTimeMode: boolean) {
    this.isTimeMode = isTimeMode
    this.timeViewMode$.next(isTimeMode)
  }
}
