import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Router} from "@angular/router";
import {map, Observable} from "rxjs";
import * as moment from "moment";
import {Lesson, Schedule, Types} from "../../models/schedule";
import {User} from "../../models/user";
import {StudyPlace} from "../../models/general";

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


  signUpWithCode(data: any): Observable<User> {
    return this.http.post<User>(`${this.API_PATH}/user/signup/withToken`, data)
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

  createCode(data: any): Observable<any> {
    return this.http.post<any>(`${this.API_PATH}/user/code`, data)
  }
}
