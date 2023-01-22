import {NgModule} from "@angular/core"
import {BrowserModule} from "@angular/platform-browser"
import {
  HTTP_INTERCEPTORS,
  HttpClient,
  HttpClientModule,
} from "@angular/common/http"
import {RouterModule, Routes, TitleStrategy} from "@angular/router"
import {AppComponent} from "./app.component"
import {BrowserAnimationsModule} from "@angular/platform-browser/animations"
import {TranslateLoader, TranslateModule} from "@ngx-translate/core"
import {TranslateHttpLoader} from "@ngx-translate/http-loader"
import {HomeComponent} from "./components/general/home/home.component"
import {HomeCardComponent} from "./components/general/home/home-card/home-card.component"
import {HeaderComponent} from "./components/general/header/header.component"
import {HeaderTitleStrategy} from "./services/ui/header.service"
import {HttpAuthInterceptor} from "./interseptors/http-auth.interceptor"
import {NgbModule} from "@ng-bootstrap/ng-bootstrap"
import {MomentJsInterceptor} from "./interseptors/moment-js.interceptor"
import {HttpErrorInterceptor} from "./interseptors/http-error.interceptor"
import {ToastComponent} from "./components/general/toast/toast.component"

const appRoutes: Routes = [
  {title: "Studyum", path: "", component: HomeComponent},

  {
    path: "auth",
    loadChildren: () =>
      import("./modules/auth.module").then((m) => m.AuthModule),
  },

  {
    path: "profile",
    loadChildren: () =>
      import("./modules/profile.module").then((m) => m.ProfileModule),
  },

  {
    path: "schedule",
    loadChildren: () =>
      import("./modules/schedule.module").then((m) => m.ScheduleModule),
  },

  {
    path: "journal",
    loadChildren: () =>
      import("./modules/journal.module").then((m) => m.JournalModule),
  },
]

export function HttpLoaderFactory(http: HttpClient) {
  return new TranslateHttpLoader(http)
}

@NgModule({
  declarations: [
    AppComponent,

    HomeComponent,
    HomeCardComponent,

    HeaderComponent,
    ToastComponent,
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    BrowserAnimationsModule,
    RouterModule.forRoot(appRoutes),
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: HttpLoaderFactory,
        deps: [HttpClient],
      },
    }),
    NgbModule,
  ],
  providers: [
    {provide: TitleStrategy, useClass: HeaderTitleStrategy},
    {provide: HTTP_INTERCEPTORS, useClass: HttpErrorInterceptor, multi: true},
    {provide: HTTP_INTERCEPTORS, useClass: HttpAuthInterceptor, multi: true},
    {provide: HTTP_INTERCEPTORS, useClass: MomentJsInterceptor, multi: true},
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
