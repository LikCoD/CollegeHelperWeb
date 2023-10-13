import { NgModule } from '@angular/core';

import { HomeComponent } from './home.component';
import {RouterModule} from "@angular/router";
import {routes} from "./home.routes";

@NgModule({
  declarations: [
    HomeComponent
  ],
  imports: [
      RouterModule.forChild(routes)
  ],
  providers: [],
})
export class HomeModule {
}
