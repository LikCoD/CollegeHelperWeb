import {Component} from '@angular/core';
import {Router} from "@angular/router";
import {HttpClient} from "@angular/common/http";
import {SERVER_URL} from "../main";

export let user: User | undefined

@Component({
  selector: 'app-root',
  templateUrl: "app.component.html"
})
export class AppComponent {

  user: User | undefined

  constructor(private router: Router, private http: HttpClient) {
      this.updateUser()
  }

  updateUser(): void {
    let username = localStorage.getItem("login")
    let token = localStorage.getItem("token")

    if (username == undefined || token == undefined) {
      this.router.navigateByUrl("login")
      return
    }

    this.http.get<User>(SERVER_URL + "/getUser?username=" + username + "&password=" + token + "&type=token").subscribe((user_: User) => {
      if (user_ == undefined) {
        this.router.navigateByUrl("login")
        return
      }

      this.user = user_
      user = user_
    })
  }

  logoff(): void {
    localStorage.removeItem("login")
    localStorage.removeItem("token")

    window.location.reload()
  }

  mySchedule(): void {
    if (!this.user) {
      this.router.navigateByUrl("login")
      return
    }

    localStorage.setItem("studyPlaceId", this.user.studyPlaceId.toString())
    localStorage.setItem("type", this.user.type)
    localStorage.setItem("name", this.user.name)

    if (this.router.url == "/schedule") {
      window.location.reload()
    } else {
      this.router.navigateByUrl("schedule")
    }
  }
}

interface User {
  name: string
  studyPlaceId: number
  type: string
  username: string
  rights: string[]
}
