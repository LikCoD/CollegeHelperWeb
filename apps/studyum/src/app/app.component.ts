import {Component} from "@angular/core"
import {UserService} from "./services/shared/user.service"
import {TranslateService} from "@ngx-translate/core"
import * as moment from "moment"

export const defaultLocale = "en"

@Component({
  selector: "app-root",
  templateUrl: "app.component.html",
  styleUrls: ["app.component.scss"]
})
export class AppComponent {
  constructor(public userService: UserService, private translate: TranslateService) {
    let locale = localStorage.getItem("locale") ?? navigator.languages[1] ?? "en"

    translate.use(locale).subscribe({
      next: () => {
        moment.locale(locale)
        localStorage.setItem("locale", locale)
      },
      error: () => {
        translate.use(defaultLocale)
        moment.locale(defaultLocale)
        localStorage.setItem("locale", defaultLocale)
      }
    })
  }
}
