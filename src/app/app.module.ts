import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';
import {HttpClientModule} from '@angular/common/http';
import {RouterModule, Routes} from "@angular/router";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {AppComponent} from './app.component';
import {CellComponent} from './components/schedule/view/cell/cell.component';
import {LoginScheduleComponent} from './components/schedule/login/login.component';
import {ViewComponent} from './components/schedule/view/view.component';
import {SelectComponent} from './components/schedule/view/edit/select/select.component';
import {JournalViewComponent} from "./components/journal/view/view.component";
import {JournalCellComponent} from "./components/journal/view/cell/journal-cell.component";
import {SelectMarkComponent} from "./components/journal/view/cell/select-mark/select-mark.component";
import {NgxPopperjsModule} from "ngx-popperjs";
import {DatePropertyComponent} from "./components/journal/view/date-property/date-property.component";
import {LogComponent} from "./components/general/log/log/log.component";
import {MatTableModule} from "@angular/material/table";
import {EditUserComponent} from "./components/user/edit/edit-user/edit-user.component";


const appRoutes: Routes = [
  {path: 'user/edit', component: EditUserComponent},
  {path: 'schedule/login', component: LoginScheduleComponent},
  {path: 'journal/view', component: JournalViewComponent},
  {path: 'schedule', component: ViewComponent},
  {path: 'log', component: LogComponent},
]

@NgModule({
  declarations: [
    AppComponent,
    LoginScheduleComponent,
    CellComponent,
    ViewComponent,
    SelectComponent,
    JournalViewComponent,
    JournalCellComponent,
    DatePropertyComponent,
    SelectMarkComponent,
    LogComponent,
    EditUserComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    RouterModule.forRoot(appRoutes),
    FormsModule,
    ReactiveFormsModule,
    NgxPopperjsModule,
    MatTableModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {
}
