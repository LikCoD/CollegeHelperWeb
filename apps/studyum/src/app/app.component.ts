import {Component} from '@angular/core';
import {UserService} from './services/shared/user.service';
import {TranslateService} from "@ngx-translate/core";
import * as moment from "moment/moment";

@Component({
  selector: 'app-root',
  templateUrl: "app.component.html",
  styleUrls: ["app.component.scss"]
})
export class AppComponent {
  constructor(public userService: UserService, private translate: TranslateService) {
    let locale = localStorage.getItem("locale") ?? "ru"

    translate.use(locale);
    moment.locale(locale)
  }
}
