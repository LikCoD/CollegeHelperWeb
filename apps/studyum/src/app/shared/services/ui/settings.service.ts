import {Injectable} from "@angular/core"
import * as moment from "moment/moment"
import {TranslateService} from "@ngx-translate/core"
import {CollapseType} from "../../../modules/journal/services/journal-collapse.service"

@Injectable({
  providedIn: "root",
})
export class SettingsService {
  public static readonly locale = "locale"
  public static readonly defaultLocale = "en"
  public static readonly locales: Locale[] = [
    {code: "en", name: "English (US)"},
    {code: "ru", name: "Русский"},
  ]

  public static readonly collapseType = "collapse"
  public static readonly defaultCollapseType = "smart"
  public static readonly collapseTypes = ["smart", "month", "day", "expanded"]

  public static readonly theme = "theme"
  public static readonly defaultTheme = "dark"
  public static readonly themes = ["dark", "light"]

  constructor(private translateService: TranslateService) {}

  get localeCode() {
    return (
      localStorage.getItem(SettingsService.locale) ??
      navigator.languages[1] ??
      SettingsService.defaultLocale
    )
  }

  set localeCode(code: string) {
    this.translateService.use(code)
    moment.locale(code)

    localStorage.setItem(SettingsService.locale, code)
  }

  get collapseType() {
    const type =
      localStorage.getItem(SettingsService.collapseType) ?? SettingsService.defaultCollapseType
    if (type == null || !SettingsService.collapseTypes.find((v) => v === type))
      return SettingsService.defaultCollapseType

    return (type as CollapseType) ?? "smart"
  }

  set collapseType(type: CollapseType) {
    localStorage.setItem(SettingsService.collapseType, type)
  }

  get theme() {
    const theme = localStorage.getItem(SettingsService.theme) ?? SettingsService.defaultTheme
    if (theme == null || !SettingsService.themes.find((v) => v === theme))
      return SettingsService.defaultTheme

    return theme
  }

  set theme(theme: string) {
    localStorage.setItem(SettingsService.theme, theme)
    this.setupTheme()
  }

  get absencesShow(): boolean {
    return localStorage.getItem("absencesShow") !== "false"
  }

  set absencesShow(show: boolean) {
    localStorage.setItem("absencesShow", String(show))
  }

  get standaloneShow(): boolean {
    return localStorage.getItem("standaloneShow") !== "false"
  }

  set standaloneShow(show: boolean) {
    localStorage.setItem("standaloneShow", String(show))
  }

  setup() {
    this.setupLocale()
    this.setupTheme()
  }

  private setupLocale() {
    const localeCode = this.localeCode
    this.translateService.use(localeCode).subscribe({
      next: () => {
        moment.locale(localeCode)
        localStorage.setItem("locale", localeCode)
      },
      error: () => {
        this.translateService.use(SettingsService.defaultLocale)
        moment.locale(SettingsService.defaultLocale)
        localStorage.setItem("locale", SettingsService.defaultLocale)
      },
    })
  }

  private setupTheme() {
    document.body.classList.remove(...SettingsService.themes)
    document.body.classList.add(this.theme)
  }
}

export interface Locale {
  code: string
  name: string
}
