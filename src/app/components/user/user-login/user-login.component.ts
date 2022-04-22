import {Component} from '@angular/core';
import {Router} from "@angular/router";
import {HttpService} from "../../../services/http/http.service";

@Component({
  selector: 'app-user-login',
  templateUrl: './user-login.component.html',
  styleUrls: ['./user-login.component.scss']
})
export class UserLoginComponent {
  email: string = ""
  password: string = ""

  constructor(private router: Router, private service: HttpService) {
  }

  login() {
    this.service.login(this.email, this.password)
  }

  continueViaGoogle(){
    window.location.href = `/api/user/auth?redirect=http://${window.location.host}/user/callback`
  }
}
