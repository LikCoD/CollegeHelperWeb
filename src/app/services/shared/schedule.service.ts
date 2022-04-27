import {Injectable} from '@angular/core';
import {HttpService} from "../http/http.service";
import {Schedule, Subject} from "../../data";
import * as moment from "moment";
import * as Collections from "typescript-collections";
import {map, Observable, Subscriber} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class ScheduleService {
  schedule: Schedule | undefined;

  private scheduleObservable: Subscriber<Schedule> = new Subscriber();
  onScheduleChanged: Observable<Schedule> = new Observable<Schedule>(observer => {
    this.scheduleObservable = observer;
  });

  constructor(private httpService: HttpService) {

  }

  initSchedule(schedule: Schedule) {
    let minHours = 24
    let maxHours = 0

    schedule.info.times = new Collections.Set<moment.Moment>()
    schedule.info.days = 0

    for (let lesson of schedule.lessons) {
      schedule.info.times.add(moment(lesson.startDate.format("HH:mm"), [moment.ISO_8601, 'HH:mm']))
      schedule.info.times.add(moment(lesson.endDate.format("HH:mm"), [moment.ISO_8601, 'HH:mm']))

      let days = lesson.startDate.diff(schedule.info.startWeekDate, 'days')
      if (schedule.info.days < days) schedule.info.days = days

      let minHour = lesson.startDate.hours()
      if (minHours > minHour) minHours = minHour

      let maxHour = lesson.endDate.hours()
      if (maxHours < maxHour) maxHours = maxHour
    }
    maxHours++

    schedule.info.days += 1

    schedule.info.maxTime = moment(maxHours, [moment.ISO_8601, 'H'])
    schedule.info.times.add(schedule.info.maxTime)

    schedule.info.minTime = moment(minHours, [moment.ISO_8601, 'H'])
    schedule.info.times.add(schedule.info.minTime)

    schedule.info.studyHours = schedule.info.maxTime.hours() - schedule.info.minTime.hours()

    this.schedule = schedule
    this.scheduleObservable.next(schedule)
  }

  getSchedule(): Observable<Schedule | undefined> {
    this.httpService.getSchedule().subscribe(schedule => {
      this.initSchedule(schedule)
    })


    return this.onScheduleChanged
  }

  addSubject(subject: Subject, startDate: moment.Moment, endDate: moment.Moment) {
    if (this.schedule == undefined) return

    let lessons = this.schedule.lessons.find(lesson => lesson.startDate.isSame(startDate) && lesson.endDate.isSame(endDate))
    if (lessons != undefined) {
      lessons.subjects.push(subject)

      return
    }

    this.schedule.lessons.push({
      studyPlaceId: 0,
      updated: false,
      startDate: startDate,
      endDate: endDate,
      subjects: [subject]
    })

    this.initSchedule(this.schedule)
  }
}
