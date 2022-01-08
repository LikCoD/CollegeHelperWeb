import {Component, OnInit} from '@angular/core';
import {Router} from "@angular/router";
import {HttpClient} from "@angular/common/http";
import {SERVER_URL} from "../../../../main";
import {AppComponent} from "../../../app.component";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  login: string = ""
  password: string = ""

  constructor(private router: Router, private http: HttpClient, private parent: AppComponent) {
  }

  ngOnInit(): void {
  }

  loginBtn(): void {
    this.http.get<any>(SERVER_URL + "/getToken?type=password_hash&username=" + this.login + "&password=" + this.password).subscribe((response: any) => {
      if (response.error != undefined) {
        alert(response.error)
        return
      }

      localStorage.setItem("login", this.login)
      localStorage.setItem("token", response.token)

      this.parent.updateUser()
      this.router.navigateByUrl("schedule")
    })
  }

}
