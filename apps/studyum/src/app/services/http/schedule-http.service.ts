import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {map, Observable} from "rxjs";
import * as moment from "moment";
import {Lesson, Schedule, Types} from "../../models/schedule";

@Injectable({providedIn: 'root'})
export class ScheduleHttpService {

  API_PATH = '/api';

  constructor(private http: HttpClient) {
  }

  getSchedule(type: string, name: string, studyPlaceID: string): Observable<Schedule> {
    let url = `${type}/${name}?studyPlaceID=${studyPlaceID}`
    if (type == undefined || name == undefined) url = ""

    return this.http.get<Schedule>(`${this.API_PATH}/schedule/${url}`).pipe(map(schedule => {
      schedule.info.startWeekDate = moment.utc(schedule.info.startWeekDate)
      schedule.info.date = moment.utc(schedule.info.date)

      if (schedule.lessons == undefined) schedule.lessons = []

      for (let lesson of schedule.lessons) {
        lesson.startDate = moment.utc(lesson.startDate)
        lesson.endDate = moment.utc(lesson.endDate)
      }

      return schedule
    }))
  }

  addLesson(lesson: Lesson): Observable<Lesson> {
    return this.http.post<Lesson>(`${this.API_PATH}/schedule`, lesson).pipe(map(value => {
      value.endDate = moment.utc(value.endDate)
      value.startDate = moment.utc(value.startDate)
      return value
    }))
  }

  updateLesson(lesson: Lesson): Observable<Lesson> {
    return this.http.put<Lesson>(`${this.API_PATH}/schedule`, lesson).pipe(map(value => {
      value.endDate = moment.utc(value.endDate)
      value.startDate = moment.utc(value.startDate)
      value.collapsed = false
      value.collapsedType = null
      value.visible = true
      return value
    }))
  }

  removeLesson(lesson: Lesson): Observable<string> {
    return this.http.delete<string>(`${this.API_PATH}/schedule/${lesson.id}`)
  }

  makeGeneral(type: string, typeName: string) {
    this.http.post(`${this.API_PATH}/schedule/makeGeneral?type=${type}&typeName=${typeName}`, {}).subscribe()
  }

  getTypes(studyPlaceID: string): Observable<Types> {
    return this.http.get<Types>(`${this.API_PATH}/schedule/getTypes?id=${studyPlaceID}`)
  }
}
