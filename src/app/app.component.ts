import {Component} from '@angular/core';
import {HttpErrorResponse} from "@angular/common/http";
import { UserService } from './services/shared/user.service';

export const errorHandler = (err: HttpErrorResponse) => {
  if (err.error == "not authorized") {
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
  constructor(public userService: UserService) {
  }
}
