import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Router} from "@angular/router";
import {errorHandler} from "../../app.component";
import {map, Observable, Subscription} from "rxjs";
import {Schedule, StudyPlace, User, Types} from "../../data";
import * as moment from "moment";
import * as Collections from 'typescript-collections';

@Injectable({
  providedIn: 'root'
})
export class HttpService {
  constructor(private http: HttpClient, private router: Router) { }

  login(email: string, password: string): Subscription {
    return this.http.put("/api/user/login", {
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
    }else{
      user!!.type = "teacher"
      user!!.typeName = name
    }

    return this.http.post("api/user", user).subscribe({
      next: _ => {
        this.router.navigate(["/login"])
      },
      error: errorHandler
    })
  }

  getUser(): Observable<User> {
    return this.http.get<User>("/api/user")
  }

  revokeToken(): Subscription {
    return this.http.put('/api/user/revoke', {}).subscribe({
      next: _ => {
        this.router.navigate(["/login"])
      },
      error: errorHandler
    })
  }

  getStudyPlaces(): Observable<StudyPlace[]> {
    return this.http.get<StudyPlace[]>("api/studyPlaces")
  }

  getTypes(studyPlace: StudyPlace): Observable<Types>{
    return this.http.get<any[]>("api/schedule/types?studyPlaceId=" + studyPlace.id).pipe(map(res => {
      let types = new Types()

      res.forEach(type => {
        switch (type.type) {
          case "group":
            types.groups.push(type.name)
            break
          case "teacher":
            types.teachers.push(type.name)
            break
          case "subject":
            types.subjects.push(type.name)
            break
          case "room":
            types.rooms.push(type.name)
            break
        }
      })

      return types
    }))
  }


  getSchedule(): Observable<Schedule>{
    return this.http.get<Schedule>(`api/schedule/view${this.router.url.substring(9)}`).pipe(map(schedule => {
      let minHours = 24
      let maxHours = 0

      schedule.info.startWeekDate = moment.utc(schedule.info.startWeekDate)
      schedule.info.times = new Collections.Set<moment.Moment>()
      schedule.info.date = moment.utc(schedule.info.date)
      schedule.info.days = 0

      for (let lesson of schedule.lessons) {
        lesson.startDate = moment.utc(lesson.startDate)
        lesson.endDate = moment.utc(lesson.endDate)

        schedule.info.times.add(moment(lesson.startDate.format("HH:mm A"), [moment.ISO_8601, 'HH:mm A']))
        schedule.info.times.add(moment(lesson.endDate.format("HH:mm A"), [moment.ISO_8601, 'HH:mm A']))

        let days = lesson.startDate.diff(schedule.info.startWeekDate, 'days')
        if (schedule.info.days < days) schedule.info.days = days

        let minHour = lesson.startDate.hours()
        if (minHours > minHour) minHours = minHour

        let maxHour = lesson.endDate.hours()
        if (maxHours < maxHour) maxHours = maxHour
      }
      maxHours++

      schedule.info.maxTime = moment(maxHours, [moment.ISO_8601, 'H'])
      schedule.info.times.add(schedule.info.maxTime)

      schedule.info.minTime = moment(minHours, [moment.ISO_8601, 'H'])
      schedule.info.times.add(schedule.info.minTime)

      return schedule
    }))
  }
}
