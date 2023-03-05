import {NgModule} from "@angular/core"
import {RouterModule, Routes} from "@angular/router"
import {ProfileComponent} from "../../components/user/profile/profile.component"
import {NotLoginGuard} from "../../guards/not-login.guard"
import {PasswordResetComponent} from "../../components/user/signup/password-reset/password-reset.component"
import {LoginGuard} from "../../guards/login.guard"
import {PasswordResetEmailRequestComponent} from "../../components/user/signup/password-reset-email-request/password-reset-email-request.component"

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
