import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';
import {HttpClientModule} from '@angular/common/http';
import {RouterModule, Routes} from "@angular/router";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {AppComponent} from './app.component';
import {CellComponent} from './components/schedule/view/cell/cell.component';
import {LoginScheduleComponent} from './components/schedule/login/login.component';
import {ViewComponent} from './components/schedule/view/view.component';
import {JournalViewComponent} from "./components/journal/view/view.component";
import {JournalCellComponent} from "./components/journal/view/cell/journal-cell.component";
import {SelectMarkComponent} from "./components/journal/view/cell/select-mark/select-mark.component";
import {NgxPopperjsModule} from "ngx-popperjs";
import {DatePropertyComponent} from "./components/journal/view/date-property/date-property.component";
import {LogComponent} from "./components/general/log/log/log.component";
import {UserRegisterComponent} from "./components/user/register/user-register.component";
import {ProfileComponent} from "./components/user/profile/profile.component";
import {AcceptUsersComponent} from "./components/user/profile/accept-users/accept-users.component";
import {BrowserAnimationsModule} from "@angular/platform-browser/animations";
import {ProfileOptionComponent} from "./components/user/profile/profile-option/profile-option.component";
import {ScheduleSubjectComponent} from "./components/schedule/view/schedule-subject/schedule-subject.component";
import {AuthComponent} from "./components/general/auth/auth.component";
import {UserLoginComponent} from "./components/user/user-login/user-login.component";
import {AddSubjectDialogComponent} from "./components/schedule/view/add-subject-dialog/add-subject-dialog.component";
import { ErrorInfoComponent } from './components/general/error-info/error-info.component';
import {MatDialogModule} from "@angular/material/dialog";
import {MatNativeDateModule} from "@angular/material/core";
import { SelectSubjectDialogComponent } from './components/schedule/view/cell/select-subject-dialog/select-subject-dialog.component';


const appRoutes: Routes = [
  {path: 'user', component: ProfileComponent},
  {path: 'register', component: UserRegisterComponent},
  {path: 'login', component: UserLoginComponent},
  {path: 'schedule/login', component: LoginScheduleComponent},
  {path: 'journal/view', component: JournalViewComponent},
  {path: 'schedule', component: ViewComponent},
  {path: 'log', component: LogComponent},
  {path: 'user/callback', component: AuthComponent},
]

@NgModule({
    declarations: [
        AppComponent,
        LoginScheduleComponent,
        CellComponent,
        ViewComponent,
        JournalViewComponent,
        JournalCellComponent,
        DatePropertyComponent,
        SelectMarkComponent,
        LogComponent,
        AcceptUsersComponent,
        UserRegisterComponent,
        ProfileComponent,
        ProfileOptionComponent,
        ScheduleSubjectComponent,
        AuthComponent,
        UserLoginComponent,
        AddSubjectDialogComponent,
        ErrorInfoComponent,
        SelectSubjectDialogComponent
    ],
  imports: [
    BrowserModule,
    HttpClientModule,
    BrowserAnimationsModule,
    RouterModule.forRoot(appRoutes),
    FormsModule,
    ReactiveFormsModule,
    NgxPopperjsModule,
    MatDialogModule,
    MatNativeDateModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {
}
