import {Component} from '@angular/core';
import {Router} from "@angular/router";
import {HttpClient} from "@angular/common/http";
import {NgxPopperjsPlacements, NgxPopperjsTriggers} from "ngx-popperjs";

@Component({
  selector: 'app-root',
  templateUrl: "app.component.html",
})
export class AppComponent {
  username: string | undefined

  showEditBtn = false

  constructor(private router: Router, private http: HttpClient) {
    http.get("api/user/getLogin").subscribe((response: any) => {
      this.username = response?.login
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

  logout(): void{

  }

}
