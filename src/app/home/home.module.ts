import { NgModule } from '@angular/core';

import { HomeComponent } from './home.component';
import {RouterModule} from "@angular/router";
import {routes} from "./home.routes";
import { HomeDashboardComponent } from '@home/components/home-dashboard/home-dashboard.component';

@NgModule({
  declarations: [HomeComponent],
  imports: [RouterModule.forChild(routes), HomeDashboardComponent],
  providers: [],
})
export class HomeModule {}
