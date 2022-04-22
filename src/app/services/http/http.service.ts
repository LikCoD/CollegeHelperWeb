import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Router} from "@angular/router";
import {errorHandler} from "../../app.component";
import {map, Observable, Subscription} from "rxjs";
import {StudyPlace, User} from "../../data";

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
    return this.http.get<StudyPlace[]>("/api/study-place")
  }

  //TODO types
}
