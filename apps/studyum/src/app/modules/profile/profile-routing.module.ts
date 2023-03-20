import {NgModule} from "@angular/core"
import {RouterModule, Routes} from "@angular/router"
import {NotLoginGuard} from "../../shared/guards/not-login.guard"
import {PasswordResetComponent} from "./components/password-reset/password-reset.component"
import {LoginGuard} from "../../shared/guards/login.guard"
import {PasswordResetEmailRequestComponent} from "./components/password-reset-email-request/password-reset-email-request.component"
import {ProfileComponent} from "./components/profile.component"

const routes: Routes = [
  {
    title: "header.sliders.profile",
    path: "",
    component: ProfileComponent,
    canActivate: [NotLoginGuard],
  },

  {
    title: "header.sliders.profile",
    path: "password/reset",
    component: PasswordResetComponent,
    canActivate: [LoginGuard],
  },

  {
    title: "header.sliders.profile",
    path: "password/reset/email",
    component: PasswordResetEmailRequestComponent,
    canActivate: [LoginGuard],
  },
]

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ProfileRoutingModule {}
