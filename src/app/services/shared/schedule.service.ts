import {Injectable} from '@angular/core';
import {HttpService} from "../http/http.service";
import {Schedule, Subject} from "../../data";
import * as moment from "moment";
import * as Collections from "typescript-collections";
import * as rxjs from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class ScheduleService {
  schedule: Schedule | undefined;

  addedLessons: Subject[] = [];
  private currentAddId = 1;

  scheduleChange: rxjs.Subject<Schedule> = new rxjs.Subject<Schedule>()

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
    this.scheduleChange.next(schedule)
  }

  getSchedule(): rxjs.Subject<Schedule> {
    this.httpService.getSchedule().subscribe(this.initSchedule.bind(this));

    return this.scheduleChange
  }

  addSubject(subject: Subject, startDate: moment.Moment, endDate: moment.Moment) {
    if (this.schedule == undefined) return

    subject.id = this.currentAddId.toString()
    this.currentAddId += 1

    subject.startTime = startDate
    subject.endTime = endDate

    this.addedLessons.push(subject)

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

  confirmEdit() {
    this.addedLessons.forEach(value => value.id = "")
    this.httpService.addLessons(this.addedLessons).subscribe(() => {
      this.addedLessons = []
    })

    this.getSchedule()
  }
}
