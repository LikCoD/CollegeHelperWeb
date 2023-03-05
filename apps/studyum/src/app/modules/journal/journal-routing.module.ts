import {NgModule} from "@angular/core"
import {RouterModule, Routes} from "@angular/router"
import {JournalComponent} from "../../components/journal/journal.component"
import {NotLoginGuard} from "../../guards/not-login.guard"
import {JournalViewComponent} from "../../components/journal/view/view.component"

const routes: Routes = [
  {
    title: "header.sliders.journal",
    path: "",
    component: JournalComponent,
    canActivate: [NotLoginGuard],
  },
  {
    title: "header.sliders.journal",
    path: "view",
    component: JournalViewComponent,
    canActivate: [NotLoginGuard],
  },
]

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class JournalRoutingModule {}
