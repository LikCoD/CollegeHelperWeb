import { Component, OnInit } from '@angular/core';
import {TranslateService} from "@ngx-translate/core";
import * as moment from "moment";

@Component({
  selector: 'app-user-info',
  templateUrl: './user-info.component.html',
  styleUrls: ['./user-info.component.scss']
})
export class UserInfoComponent implements OnInit {

  locales: Locale[] = [{code: "en", name: "English (US)"}, {code: "ru", name: "Русский"}]
  currentLocaleCode = "ru";

  constructor(private translate: TranslateService) { }

  ngOnInit(): void {
    this.currentLocaleCode = localStorage.getItem("locale") ?? "ru"
  }

  selectLocale(code: string) {
    this.currentLocaleCode = code
    this.translate.use(code);

    localStorage.setItem("locale", code)
    moment.locale(code)
  }
}

interface Locale {
  code: string,
  name: string
}
