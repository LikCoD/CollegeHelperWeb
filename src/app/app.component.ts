import {Component} from '@angular/core';
import {HttpErrorResponse} from "@angular/common/http";
import { UserService } from './services/shared/user.service';
import {Router} from "@angular/router";

export const errorHandler = (err: HttpErrorResponse, router: Router) => {
  if (err.error == "not authorized") {
    console.log("login page")
    router.navigate(["login"])

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
  constructor(public userService: UserService) {
  }
}
