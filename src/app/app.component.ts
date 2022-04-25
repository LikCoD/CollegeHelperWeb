import {Component} from '@angular/core';
import {Router} from "@angular/router";
import {HttpClient, HttpErrorResponse} from "@angular/common/http";
import {User, userStatus} from "./data";

export var user: User | undefined

export const setUser = (user_: User) => {
  user = user_
}

export const errorHandler = (err: HttpErrorResponse) => {
  if (err.error == "not authorized") {
    user = undefined
    window.location.href = `/api/user/auth?redirect=http://${window.location.host}/user/callback`

    return
  }

  alert(err.error)
}

@Component({
  selector: 'app-root',
  templateUrl: "app.component.html",
  styleUrls: ["app.component.scss"]
})
export class AppComponent {
  username: string | undefined
  userPicture: string | undefined
  status: string = "Loading..."

  constructor(private router: Router, private http: HttpClient) {
    http.get<User>("api/user").subscribe({
      next: user_ => {
        user = user_
        this.username = user.login
        this.userPicture = user.picture
        this.status = userStatus(user)

        if (user.type == "") {
          router.navigateByUrl("/user/register")
        }
      },
      error: console.error
    })
  }

  login(){
    this.router.navigate(["/login"])
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

  mySchedule(): void {
    if (this.router.url == "/schedule") {
      window.location.reload()
    } else {
      this.router.navigateByUrl("schedule")
    }
  }

}
