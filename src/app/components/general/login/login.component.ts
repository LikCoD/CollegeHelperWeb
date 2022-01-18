import {Component, OnInit} from '@angular/core';
import {Router} from "@angular/router";
import {HttpClient} from "@angular/common/http";
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
    this.http.get<any>("api/user/login?login=" + this.login + "&password=" + this.password).subscribe((response: any) => {
      if (response.error != undefined) {
        alert(response.error)
        return
      }

      this.router.navigateByUrl("schedule")
    })
  }

}
