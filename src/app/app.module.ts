import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import {RouterModule, Routes} from "@angular/router";

import { AppComponent } from './app.component';
import { CellComponent } from './components/schedule/view/cell/cell.component';
import { LoginComponent } from './components/schedule/login/login.component';
import { ViewComponent } from './components/schedule/view/view.component';
import {FormsModule} from "@angular/forms";

const appRoutes: Routes =  [
  {path: 'schedule/login', component:LoginComponent},
  {path: 'schedule', component:ViewComponent}
]

@NgModule({
  declarations: [
    AppComponent,
    CellComponent,
    LoginComponent,
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
