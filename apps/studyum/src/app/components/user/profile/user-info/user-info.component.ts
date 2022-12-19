import {Component} from "@angular/core"
import {Locale, SettingsService} from "../../../../services/ui/settings.service"
import {CollapseType} from "../../../../services/ui/journal-collapse.service"

@Component({
  selector: "app-user-info",
  templateUrl: "./user-info.component.html",
  styleUrls: ["./user-info.component.scss"]
})
export class UserInfoComponent {

  constructor(private settingsService: SettingsService) {
  }

  get locales(): Locale[] {
    return SettingsService.locales
  }

  get currentLocaleCode(): string {
    return this.settingsService.localeCode
  }

  set currentLocaleCode(locale: string) {
    this.settingsService.localeCode = locale
  }

  get collapseTypes(): string[] {
    return SettingsService.collapseTypes
  }

  get collapseType(): string {
    return this.settingsService.collapseType
  }

  set collapseType(type: string) {
    this.settingsService.collapseType = type as CollapseType
  }

  get themes(): string[] {
    return SettingsService.themes
  }

  get theme(): string {
    return this.settingsService.theme
  }

  set theme(theme: string) {
    this.settingsService.theme = theme
  }
}


