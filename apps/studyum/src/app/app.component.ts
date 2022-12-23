import {Component} from "@angular/core"
import {SettingsService} from "./services/ui/settings.service"

@Component({
  selector: "app-root",
  templateUrl: "app.component.html",
  styleUrls: ["app.component.scss"]
})
export class AppComponent {
  constructor(translate: SettingsService) {
    translate.setup()
  }
}
