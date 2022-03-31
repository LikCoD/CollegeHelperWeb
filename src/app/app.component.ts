import {Component} from '@angular/core';
import {Router} from "@angular/router";
import {HttpClient} from "@angular/common/http";
import {User} from "./data";

export var user: User | undefined

export const setUser = (user_: User) => {
    user = user_
}

@Component({
  selector: 'app-root',
  templateUrl: "app.component.html",
})
export class AppComponent {
  username: string | undefined

  showEditBtn = false

  constructor(private router: Router, private http: HttpClient) {
    http.get<User>("api/user").subscribe({
      next: user_ => {
        user = user_
        console.log(user)
        this.username = user?.type
      }
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

  logout(): void {

  }

}
