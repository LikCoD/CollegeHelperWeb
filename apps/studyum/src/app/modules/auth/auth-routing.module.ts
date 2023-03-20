import {NgModule} from "@angular/core"
import {RouterModule, Routes} from "@angular/router"
import {SignupStage1Component} from "./components/signup/stage1/signup-stage1.component"
import {LoginGuard} from "../../shared/guards/login.guard"
import {EmailVerificationComponent} from "./components/signup/email-verification/email-verification.component"
import {NotLoginGuard} from "../../shared/guards/not-login.guard"
import {SignupStage1Guard} from "../../shared/guards/signup-stage1.guard"
import {SignUpWithCodeComponent} from "./components/signup/with-token/sign-up-with-code.component"
import {UserLoginComponent} from "./components/user-login/user-login.component"
import {ReceiveTokenComponent} from "./components/receive-token/receive-token.component"
import {UserSignupComponent} from "./components/signup/user-signup.component"

const routes: Routes = [
  {
    title: "header.sliders.signup",
    path: "signup",
    component: UserSignupComponent,
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
