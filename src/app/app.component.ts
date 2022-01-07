import {Component} from '@angular/core';
import {Router} from "@angular/router";
import {HttpClient} from "@angular/common/http";
import {SERVER_URL} from "../main";

@Component({
  selector: 'app-root',
  templateUrl: "app.component.html"
})


export class AppComponent {

  user: User | undefined

  constructor(private router: Router, private http: HttpClient) {
    let username = localStorage.getItem("username")
    let token = localStorage.getItem("token")

    if (username == undefined || token == undefined){
      router.navigateByUrl("schedule/login")
      return
    }

    http.get<User>(SERVER_URL + "/getUserViaToken?username=" + username + "&token=" + token).subscribe((user: User) => {
      if (user == undefined){
        router.navigateByUrl("schedule/login")
        return
      }

      this.user = user
    })
  }

  mySchedule(): void{
    if (!this.user){
      this.router.navigateByUrl("schedule/login")
      return
    }

    localStorage.setItem("studyPlaceId", this.user.studyPlaceId.toString())
    localStorage.setItem("type", this.user.type)
    localStorage.setItem("name", this.user.name)

    if (this.router.url == "/schedule"){
      window.location.reload()
    }else {
      this.router.navigateByUrl("schedule")
    }
  }
}

interface User{
  name: string
  studyPlaceId: number
  type: string
  username: string
}
