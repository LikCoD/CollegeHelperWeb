import {Injectable} from '@angular/core';
import {HttpService} from "../http/http.service";
import {Subject} from "../../data";
import * as moment from "moment";
import * as Collections from "typescript-collections";
import * as rxjs from "rxjs";
import {Schedule} from "../../models";

@Injectable({
  providedIn: 'root'
})
export class ScheduleService {
  schedule: Schedule | undefined;

  addedLessons: Subject[] = [];
  removedLessons: Subject[] = [];
  private currentAddId = 1;

  scheduleChange: rxjs.SubjectLike<Schedule> = new rxjs.Subject<Schedule>()

  constructor(private httpService: HttpService) {

  }

  initSchedule(schedule: Schedule) {
    let minHours = 24
    let maxHours = 0

    let times = new Collections.Set<moment.Moment>()
    let daysNumber = 0

    for (let lesson of schedule.lessons) {
      times.add(moment(lesson.startDate.format("HH:mm"), [moment.ISO_8601, 'HH:mm']))
      times.add(moment(lesson.endDate.format("HH:mm"), [moment.ISO_8601, 'HH:mm']))

      let days = lesson.startDate.diff(schedule.info.startWeekDate, 'days')
      if (daysNumber < days) daysNumber = days

      let minHour = lesson.startDate.hours()
      if (minHours > minHour) minHours = minHour

      let maxHour = lesson.endDate.hours()
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
    this.scheduleChange.next(schedule)
  }

  getSchedule(): rxjs.SubjectLike<Schedule> {
    this.httpService.getSchedule().subscribe(this.initSchedule.bind(this));

    return this.scheduleChange
  }

  addSubject(subject: Subject) {
    if (this.schedule == undefined) return

    subject.id = this.currentAddId.toString()
    this.currentAddId += 1

    this.addedLessons.push(subject)

/*    let lessons = this.schedule.lessons.find(lesson => lesson.startDate.isSame(subject.startTime) && lesson.endDate.isSame(subject.endTime))
    if (lessons != undefined) {
      lessons.subjects.push(subject)

      return
    }

    this.schedule.lessons.push(<ScheduleLesson>{
      studyPlaceId: 0,
      updated: false,
      startDate: subject.startTime,
      endDate: subject.endTime,
      subjects: [subject]
    })*/

    this.initSchedule(this.schedule)
  }

/*  removeLesson(lesson: Subject, startTime: moment.Moment, endTime: moment.Moment){
    this.removedLessons.push(lesson)

    let lessons = this.schedule!!.lessons.find(l => l.startDate.isSame(startTime) && l.endDate.isSame(endTime))!!
    lessons.subjects.splice(lessons.subjects.indexOf(lesson), 1)

    this.scheduleChange.next(this.schedule!!)
  }*/

  confirmEdit() {
    this.addedLessons.forEach(value => value.id = "")
    this.httpService.addLessons(this.addedLessons).subscribe(() => {
      this.addedLessons = []
    })

    this.getSchedule()
  }
}
