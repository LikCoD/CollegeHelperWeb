import {Component} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {errorHandler} from "../../../app.component";
import {Router} from "@angular/router";

@Component({
  selector: 'app-user-login',
  templateUrl: './user-login.component.html',
  styleUrls: ['./user-login.component.scss']
})
export class UserLoginComponent {
  email: string = ""
  password: string = ""

  constructor(private http: HttpClient, private router: Router) {
  }

  login() {
    this.http.put("/api/user/login", {
      email: this.email,
      password: this.password
    }).subscribe({
      next: (data) => {
        this.router.navigate(["/"])
      },
      error: errorHandler
    })
  }

  continueViaGoogle(){
    window.location.href = `/api/user/auth?redirect=http://${window.location.host}/user/callback`
  }
}
