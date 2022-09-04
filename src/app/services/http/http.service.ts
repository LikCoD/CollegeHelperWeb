import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Router} from "@angular/router";
import {map, Observable} from "rxjs";
import {Lesson, Schedule, StudyPlace, Types, User} from "../../models";
import * as moment from "moment";

@Injectable({
  providedIn: 'root'
})
export class HttpService {

  API_PATH = '/api';

  constructor(private http: HttpClient, private router: Router) {
  }

  signUp(data: any): Observable<User> {
    return this.http.post<User>(`${this.API_PATH}/user/signup`, data)
  }

  signUpStage1(data: any): Observable<User> {
    return this.http.put<User>(`${this.API_PATH}/user/signup/stage1`, data)
  }

  login(credentials: any): Observable<User> {
    return this.http.put<User>(`${this.API_PATH}/user/login`, credentials)
  }

  getUser(): Observable<User> {
    return this.http.get<User>(`${this.API_PATH}/user`)
  }

  updateUser(data: any): Observable<User> {
    return this.http.put<User>(`${this.API_PATH}/user`, data)
  }

  signOut(): Observable<undefined> {
    return this.http.delete(`${this.API_PATH}/user/signout`).pipe(map(_ => {
      this.router.navigate(["/login"])
      return undefined
    }))
  }

  revokeToken(): Observable<undefined> {
    return this.http.delete(`${this.API_PATH}/user/revoke`).pipe(map(_ => {
      this.router.navigate(["/login"])
      return undefined
    }))
  }

  putToken(token: string): Observable<User> {
    return this.http.put<User>(`${this.API_PATH}/user/auth/token`, token)
  }

  getStudyPlaces(restricted = true): Observable<StudyPlace[]> {
    return this.http.get<StudyPlace[]>(`${this.API_PATH}/studyPlaces?restricted=${restricted}`)
  }

  getTypes(studyPlaceID: string): Observable<Types> {
    return this.http.get<Types>(`${this.API_PATH}/schedule/getTypes?id=${studyPlaceID}`)
  }

  getSchedule(): Observable<Schedule> {
    let params = this.router.parseUrl(this.router.url).queryParams

    let url = `${params["type"]}/${params["name"]}?studyPlaceID=${params["studyPlaceID"]}`
    if (params["type"] == undefined || params["name"] == undefined) url = ""

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
      return value
    }))
  }

  removeLesson(lesson: Lesson): Observable<string> {
    return this.http.delete<string>(`${this.API_PATH}/schedule/${lesson.id}`)
  }

  getLesson(lesson: Lesson): Observable<Lesson> {
    return this.http.get<Lesson>(`${this.API_PATH}/schedule/${lesson.id}`).pipe(map(value => {
      value.endDate = moment.utc(value.endDate)
      value.startDate = moment.utc(value.startDate)
      return value
    }))
  }

  makeGeneral(type: string, typeName: string) {
    this.http.post(`${this.API_PATH}/schedule/makeGeneral?type=${type}&typeName=${typeName}`, {}).subscribe()
  }

}
