import {Component, HostListener} from "@angular/core"
import {SettingsService} from "./services/ui/settings.service"
import {Key} from "./services/shared/journal/journal.cell.service"
import {KeyboardService} from "./services/shared/keyboard.service"

@Component({
  selector: "app-root",
  templateUrl: "app.component.html",
  styleUrls: ["app.component.scss"],
})
export class AppComponent {
  constructor(translate: SettingsService, private keyboardService: KeyboardService) {
    translate.setup()
  }

  @HostListener("window:focus", ["'null'"])
  @HostListener("document:keyup.shift", ["'null'"])
  @HostListener("document:keyup.control", ["'null'"])
  @HostListener("document:keyup.meta", ["'null'"])
  @HostListener("document:keydown.shift", ["'shift'"])
  @HostListener("document:keydown.control", ["'control'"])
  @HostListener("document:keydown.meta", ["'control'"])
  keyEvent(key: Key) {
    this.keyboardService.key = key
  }
}
