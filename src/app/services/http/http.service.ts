import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Router} from "@angular/router";
import {errorHandler} from "../../app.component";
import {map, Observable, Subscription} from "rxjs";
import {StudyPlace, User, Types} from "../../data";
import {Lesson, Schedule} from "../../models";
import * as moment from "moment";

@Injectable({
  providedIn: 'root'
})
export class HttpService {

  API_PATH = '/api';

  constructor(private http: HttpClient, private router: Router) {
  }

  login(email: string, password: string): Subscription {
    return this.http.put(`${this.API_PATH}/user/login`, {
      email: email,
      password: password
    }).subscribe({
      next: _ => {
        this.router.navigate(["/"])
      },
      error: errorHandler
    })
  }

  register(email: string, password: string, passwordRepeat: string, name: string, type: string, studyPlace: StudyPlace, group: string | null): Subscription {
    let user = new User(email, name, name, type, name, studyPlace.id, password, passwordRepeat)
    if (type == "Student" && group != null) {
      user!!.typeName = group
      user!!.type = "group"
    } else {
      user!!.type = "teacher"
      user!!.typeName = name
    }

    return this.http.post(`${this.API_PATH}/user`, user).subscribe({
      next: _ => {
        this.router.navigate(["/login"])
      },
      error: errorHandler
    })
  }

  getUser(): Observable<User> {
    return this.http.get<User>(`${this.API_PATH}/user`)
  }

  revokeToken(): Subscription {
    return this.http.put(`${this.API_PATH}/user/revoke`, {}).subscribe({
      next: _ => {
        this.router.navigate(["/login"])
      },
      error: errorHandler
    })
  }

  getStudyPlaces(): Observable<StudyPlace[]> {
    return this.http.get<StudyPlace[]>(`${this.API_PATH}/studyPlaces`)
  }

  getTypes(): Observable<Types> {
    return this.http.get<Types>(`${this.API_PATH}/schedule/getTypes`)
  }

  getSchedule(): Observable<Schedule> {
    let params = this.router.parseUrl(this.router.url).queryParams

    let url = `${params["type"]}/${params["name"]}`
    if (params["type"] == undefined || params["name"] == undefined) url = "my"

    return this.http.get<Schedule>(`${this.API_PATH}/schedule/${url}`).pipe(map(schedule => {
      schedule.info.startWeekDate = moment.utc(schedule.info.startWeekDate)
      schedule.info.date = moment.utc(schedule.info.date)

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
}
