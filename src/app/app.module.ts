import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import {RouterModule, Routes} from "@angular/router";
import {FormsModule} from "@angular/forms";

import { AppComponent } from './app.component';
import { CellComponent } from './components/schedule/view/cell/cell.component';
import {LoginScheduleComponent} from './components/schedule/login/login.component';
import { ViewComponent } from './components/schedule/view/view.component';
import {LoginComponent} from "./components/general/login/login.component";

const appRoutes: Routes =  [
  {path: 'login', component:LoginComponent},
  {path: 'schedule/login', component:LoginScheduleComponent},
  {path: 'schedule', component:ViewComponent},
]

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    LoginScheduleComponent,
    CellComponent,
    ViewComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    RouterModule.forRoot(appRoutes),
    FormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
