import {Injectable} from '@angular/core';
import {HttpService} from "../http/http.service";
import {BehaviorSubject, map} from "rxjs";
import {User} from "../../models";
import {Router} from "@angular/router";

@Injectable({providedIn: 'root'})
export class UserService {

  user$: BehaviorSubject<User | undefined> = new BehaviorSubject<User | undefined>(undefined)

  constructor(private httpService: HttpService, private router: Router) {
    httpService.getUser().subscribe({
      next: value => {
        this.user$.next(value)
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
}
