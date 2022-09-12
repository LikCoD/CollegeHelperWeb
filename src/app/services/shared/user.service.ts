import {Injectable} from '@angular/core';
import {HttpService} from "../http/http.service";
import {map, ReplaySubject} from "rxjs";
import {Router} from "@angular/router";
import {User} from "../../models/user";

@Injectable({providedIn: 'root'})
export class UserService {

  user$: ReplaySubject<User | undefined> = new ReplaySubject<User | undefined>(1)
  initialized: boolean = false

  constructor(private httpService: HttpService, private router: Router) {
    httpService.getUser().subscribe({
      next: value => {
        this.initialized = true
        if (value.type == "") this.router.navigate(["signup/stage1"])

        this.user$.next(value)
      },
      error: _ => {
        console.log(undefined)

        this.initialized = true
        this.user$.next(undefined)
        this.user$.next(undefined)
      }
    })
  }

  signUp(data: any) {
    this.httpService.signUp(data).pipe(map(value => {
      this.router.navigate(["signup/stage1"])

      return value
    })).subscribe({
      next: value => {
        this.user$.next(value)
      }
    })
  }

  signUpStage1(data: any) {
    this.httpService.signUpStage1(data).pipe(map(value => {
      this.router.navigate([""])

      return value
    })).subscribe({
      next: value => {
        this.user$.next(value)
      }
    })
  }

  signUpWithCode(data: any) {
    this.httpService.signUpWithCode(data).subscribe({
      next: value => {
        this.router.navigate([""])

        this.user$.next(value)
      }
    })
  }

  login(credentials: any) {
    this.httpService.login(credentials).pipe(map((value) => {
      if (value.type == "") this.router.navigate(["signup/stage1"])
      else this.router.navigate([""])

      return value
    })).subscribe({
      next: value => {
        this.user$.next(value)
      }
    })
  }

  update(data: any) {
    this.httpService.updateUser(data).subscribe({
      next: value => {
        this.user$.next(value)
      }
    })
  }
  signOut() {
    this.httpService.signOut().subscribe({
      next: value => {
        this.user$.next(value)
      }
    })
  }

  revokeToken() {
    this.httpService.revokeToken().subscribe({
      next: value => {
        this.user$.next(value)
      }
    })
  }

  putToken(token: string) {
    this.httpService.putToken(token).subscribe({
      next: value => {
        this.user$.next(value)
        this.router.navigate(["/"])
      }
    })
  }
}
