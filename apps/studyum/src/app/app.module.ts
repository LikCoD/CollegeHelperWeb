import {NgModule} from "@angular/core"
import {BrowserModule} from "@angular/platform-browser"
import {HTTP_INTERCEPTORS, HttpClient, HttpClientModule} from "@angular/common/http"
import {RouterModule, Routes, TitleStrategy} from "@angular/router"
import {FormsModule, ReactiveFormsModule} from "@angular/forms"
import {AppComponent} from "./app.component"
import {CellComponent} from "./components/schedule/view/cell/cell.component"
import {ViewComponent} from "./components/schedule/view/view.component"
import {JournalViewComponent} from "./components/journal/view/view.component"
import {JournalCellComponent} from "./components/journal/view/base-journal/base-journal-cell/journal-cell.component"
import {ProfileComponent} from "./components/user/profile/profile.component"
import {AcceptUsersComponent} from "./components/user/profile/accept-users/accept-users.component"
import {BrowserAnimationsModule} from "@angular/platform-browser/animations"
import {ProfileOptionComponent} from "./components/user/profile/profile-option/profile-option.component"
import {ScheduleSubjectComponent} from "./components/schedule/view/schedule-subject/schedule-subject.component"
import {UserLoginComponent} from "./components/user/user-login/user-login.component"
import {
  AddSubjectDialogComponent
} from "./components/schedule/view/edit/add-subject-dialog/add-subject-dialog.component"
import {ErrorInfoComponent} from "./components/general/error-info/error-info.component"
import {MatDialogModule} from "@angular/material/dialog"
import {MatNativeDateModule} from "@angular/material/core"
import {
  SelectSubjectDialogComponent
} from "./components/schedule/view/cell/select-subject-dialog/select-subject-dialog.component"
import {MomentPipe} from "./pipes/moment.pipe"
import {ScheduleCellDirective} from "./components/schedule/view/cell/cell-directive/schedule-cell.directive"
import {EditScheduleComponent} from "./components/schedule/view/edit/edit-scdedule/edit-schedule.component"
import {UserSignupComponent} from "./components/user/signup/user-signup.component"
import {SignupStage1Component} from "./components/user/signup/stage1/signup-stage1.component"
import {EditUserComponent} from "./components/user/profile/edit-user/edit-user.component"
import {ReceiveTokenComponent} from "./components/user/receive-token/receive-token.component"
import {FormPropertyComponent} from "./components/general/form-property/form-property.component"
import {SubjectSelectionComponent} from "./components/schedule/view/subject-selection/subject-selection.component"
import {JournalComponent} from "./components/journal/journal.component"
import {NotLoginGuard} from "./guards/not-login.guard"
import {LoginGuard} from "./guards/login.guard"
import {SignupStage1Guard} from "./guards/signup-stage1.guard"
import {SignUpWithTokenComponent} from "./components/user/signup/with-token/sign-up-with-token.component"
import {CreateCodeUserComponent} from "./components/user/profile/create-code-user/create-code-user.component"
import {TranslateLoader, TranslateModule} from "@ngx-translate/core"
import {TranslateHttpLoader} from "@ngx-translate/http-loader"
import {UserInfoComponent} from "./components/user/profile/user-info/user-info.component"
import {BaseJournalComponent} from "./components/journal/view/base-journal/base-journal.component"
import {HomeComponent} from "./components/general/home/home.component"
import {HomeCardComponent} from "./components/general/home/home-card/home-card.component"
import {DialogFrameComponent} from "./components/general/dialog-frame/dialog-frame.component"
import {MiniSelectBtnDirective} from "./components/standalones/buttons/directives/mini-select-btn.directive"
import {SelectButtonsComponent} from "./components/standalones/buttons/select-buttons.component"
import {ActionButtonsComponent} from "./components/standalones/buttons/action-buttons.component"
import {AbsenceControlComponent} from "./components/standalones/popups/select-mark/enteries/absence-control.component"
import {SecondaryBtnDirective} from "./components/standalones/buttons/directives/secondary-btn.directive"
import {SelectMarkComponent} from "./components/standalones/popups/select-mark/select-mark.component"
import {
  LessonAdditionDataComponent
} from "./components/standalones/popups/lesson-addition-data/lesson-addition-data.component"
import {ActionSelectBtnDirective} from "./components/standalones/buttons/directives/action-select-btn.directive"
import {
  JournalBottomActionBarComponent
} from "./components/journal/view/journal-bottom-action-bar/journal-bottom-action-bar.component"
import {
  BaseJournalDateItemComponent
} from "./components/journal/view/base-journal/base-journal-date-item/base-journal-date-item.component"
import {MoreIndicatorComponent} from "./components/standalones/more-indicator.component"
import {CellExpandComponent} from "./components/standalones/popups/cell-expand/cell-expand.component"
import {
  BaseJournalTopActionBarComponent
} from "./components/journal/view/base-journal/base-journal-top-action-bar/base-journal-top-action-bar.component"
import {HeaderComponent} from "./components/general/header/header.component"
import {HeaderTitleStrategy} from "./services/ui/header.service"
import {HttpAuthInterceptor} from "./interseptors/http-auth.interceptor"
import {ScheduleTopBarComponent} from "./components/schedule/view/schedule-top-bar/schedule-top-bar.component"
import {JournalMonthComponent} from "./components/journal/view/base-journal/dates/journal-month/journal-month.component"
import {JournalDayComponent} from "./components/journal/view/base-journal/dates/journal-day/journal-day.component"
import {
  JournalColumnComponent
} from "./components/journal/view/base-journal/dates/journal-column/journal-column.component"
import {
  JournalCollapseColumnComponent
} from "./components/journal/view/base-journal/dates/journal-collapse-column/journal-collapse-column.component"
import {LessonInfoComponent} from "./components/standalones/popups/lesson-info/lesson-info.component"
import {ModalsModule} from "modals"
import {NgxPopperjsModule} from "ngx-popperjs"

const appRoutes: Routes = [
  {title: "Studyum", path: "", component: HomeComponent},

  {
    title: "header.sliders.profile",
    path: "user",
    component: ProfileComponent,
    canActivate: [NotLoginGuard],
  },

  {
    title: "header.sliders.signup",
    path: "signup",
    component: UserSignupComponent,
    canActivate: [LoginGuard],
  },
  {
    title: "header.sliders.signup",
    path: "signup/stage1",
    component: SignupStage1Component,
    canActivate: [NotLoginGuard, SignupStage1Guard],
  },
  {
    title: "header.sliders.signup",
    path: "signup/withToken",
    component: SignUpWithTokenComponent,
    canActivate: [LoginGuard],
  },
  {
    title: "header.sliders.login",
    path: "login",
    component: UserLoginComponent,
    canActivate: [LoginGuard],
  },

  {
    title: "header.sliders.journal",
    path: "journal",
    component: JournalComponent,
    canActivate: [NotLoginGuard],
  },
  {
    title: "header.sliders.journal",
    path: "journal/view",
    component: JournalViewComponent,
    canActivate: [NotLoginGuard],
  },

  {
    title: "header.sliders.schedule",
    path: "schedule",
    component: ViewComponent,
    canActivate: [],
  },

  {
    title: "Studyum",
    path: "user/receiveToken",
    component: ReceiveTokenComponent,
    canActivate: [NotLoginGuard],
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

    AcceptUsersComponent,
    ProfileComponent,
    ProfileOptionComponent,
    EditUserComponent,
    CreateCodeUserComponent,
    UserInfoComponent,
    ReceiveTokenComponent,

    UserSignupComponent,
    SignupStage1Component,
    SignUpWithTokenComponent,
    UserLoginComponent,

    ScheduleSubjectComponent,
    AddSubjectDialogComponent,
    SubjectSelectionComponent,
    SelectSubjectDialogComponent,
    ScheduleCellDirective,
    EditScheduleComponent,
    ScheduleTopBarComponent,

    CellComponent,
    CellExpandComponent,
    ViewComponent,
    JournalViewComponent,
    JournalCellComponent,
    JournalComponent,
    BaseJournalComponent,

    ErrorInfoComponent,
    FormPropertyComponent,
    DialogFrameComponent,

    MomentPipe,

    SelectButtonsComponent,
    ActionButtonsComponent,

    MiniSelectBtnDirective,
    SecondaryBtnDirective,

    AbsenceControlComponent,
    SelectMarkComponent,
    LessonAdditionDataComponent,
    ActionSelectBtnDirective,
    JournalBottomActionBarComponent,
    BaseJournalDateItemComponent,
    MoreIndicatorComponent,
    BaseJournalTopActionBarComponent,

    HeaderComponent,
    JournalMonthComponent,
    JournalDayComponent,
    JournalColumnComponent,
    JournalCollapseColumnComponent,
    LessonInfoComponent,
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    BrowserAnimationsModule,
    RouterModule.forRoot(appRoutes),
    FormsModule,
    ReactiveFormsModule,
    MatDialogModule,
    MatNativeDateModule,
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: HttpLoaderFactory,
        deps: [HttpClient]
      }
    }),
    ModalsModule,
    NgxPopperjsModule
  ],
  providers: [
    {provide: TitleStrategy, useClass: HeaderTitleStrategy},
    {provide: HTTP_INTERCEPTORS, useClass: HttpAuthInterceptor, multi: true},
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
