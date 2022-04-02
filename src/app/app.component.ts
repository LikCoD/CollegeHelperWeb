import {Component} from '@angular/core';
import {Router} from "@angular/router";
import {HttpClient, HttpErrorResponse} from "@angular/common/http";
import {User} from "./data";

export var user: User | undefined

export const setUser = (user_: User) => {
  user = user_
}

export const errorHandler = (err: HttpErrorResponse) => {
  if (err.error == "not authorized") {
    user = undefined
    window.location.href = '/api/user/auth?redirect=' + encodeURIComponent(window.location.href)

    return
  }

  alert(err.error)
}

@Component({
  selector: 'app-root',
  templateUrl: "app.component.html",
})
export class AppComponent {
  username: string | undefined
  userPicture: string | undefined

  showEditBtn = false

  constructor(private router: Router, private http: HttpClient) {
    http.get<User>("api/user").subscribe({
      next: user_ => {
        user = user_
        this.username = user?.login
        this.userPicture = user?.picture

        console.log(user)

        if (user.type == "") {
          router.navigateByUrl("/user/edit")
        }
      },
      error: console.error
    })
  }

  login(){
    window.location.href = '/api/user/auth?redirect=' + encodeURIComponent(window.location.href)
  }

  logout(): void {
    this.http.get("api/user/logout").subscribe({
      next: () => {
        user = undefined
        this.username = undefined
        this.userPicture = undefined
        this.router.navigate(['/'])
      },
      error: errorHandler,
    })
  }

  setupSchedule() {
    //if (user && user.rights.includes('editSchedule')) {
    this.showEditBtn = true
    //}
  }

  editSchedule() {
    this.router.navigateByUrl("schedule#edit")
  }

  mySchedule(): void {
    if (!this.username) {
      this.router.navigateByUrl("login")
      return
    }

    if (this.router.url == "/schedule") {
      window.location.reload()
    } else {
      this.router.navigateByUrl("schedule")
    }
  }

}
