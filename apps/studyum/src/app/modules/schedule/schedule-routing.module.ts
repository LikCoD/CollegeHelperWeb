import {NgModule} from "@angular/core"
import {RouterModule, Routes} from "@angular/router"
import {ViewComponent} from "./components/view.component"

const routes: Routes = [
  {
    title: "header.sliders.schedule",
    path: "",
    component: ViewComponent,
    canActivate: [],
  },
]

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ScheduleRoutingModule {}
