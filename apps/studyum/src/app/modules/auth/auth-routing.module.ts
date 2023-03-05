import {NgModule} from "@angular/core"
import {RouterModule, Routes} from "@angular/router"
import {SignupStage1Component} from "../../components/user/signup/stage1/signup-stage1.component"
import {LoginGuard} from "../../guards/login.guard"
import {EmailVerificationComponent} from "../../components/user/signup/email-verification/email-verification.component"
import {NotLoginGuard} from "../../guards/not-login.guard"
import {SignupStage1Guard} from "../../guards/signup-stage1.guard"
import {SignUpWithCodeComponent} from "../../components/user/signup/with-token/sign-up-with-code.component"
import {UserLoginComponent} from "../../components/user/user-login/user-login.component"
import {ReceiveTokenComponent} from "../../components/user/receive-token/receive-token.component"

const routes: Routes = [
  {
    title: "header.sliders.signup",
    path: "signup",
    component: SignupStage1Component,
    canActivate: [LoginGuard],
  },
  {
    title: "header.sliders.email",
    path: "email/verification",
    component: EmailVerificationComponent,
    canActivate: [NotLoginGuard],
  },
  {
    title: "header.sliders.signup",
    path: "signup/stage1",
    component: SignupStage1Component,
    canActivate: [NotLoginGuard, SignupStage1Guard],
  },
  {
    title: "header.sliders.signup",
    path: "signup/stage1/code",
    component: SignUpWithCodeComponent,
    canActivate: [NotLoginGuard, SignupStage1Guard],
  },
  {
    title: "header.sliders.login",
    path: "login",
    component: UserLoginComponent,
    canActivate: [LoginGuard],
  },

  {
    title: "Studyum",
    path: "token",
    component: ReceiveTokenComponent,
  },
]

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AuthRoutingModule {}
