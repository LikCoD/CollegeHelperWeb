import {NgModule} from "@angular/core"
import {RouterModule, Routes} from "@angular/router"
import {NotLoginGuard} from "../guards/not-login.guard"
import {CommonModule} from "@angular/common"
import {TranslateModule} from "@ngx-translate/core"
import {FormsModule, ReactiveFormsModule} from "@angular/forms"
import {SharedModule} from "./shared.module"
import {ModalsModule} from "../../../../../libs/modals/src"
import {UserSignupComponent} from "../components/user/signup/user-signup.component"
import {LoginGuard} from "../guards/login.guard"
import {SignupStage1Component} from "../components/user/signup/stage1/signup-stage1.component"
import {SignupStage1Guard} from "../guards/signup-stage1.guard"
import {SignUpWithCodeComponent} from "../components/user/signup/with-token/sign-up-with-code.component"
import {UserLoginComponent} from "../components/user/user-login/user-login.component"
import {ReceiveTokenComponent} from "../components/user/receive-token/receive-token.component"
import {EmailVerificationComponent} from "../components/user/signup/email-verification/email-verification.component"
import {ErrorInfoComponent} from "../../../../../libs/ui-elements/src/lib/elements/error-info/error-info.component"

const routes: Routes = [
  {
    title: "header.sliders.signup",
    path: "signup",
    component: SignupStage1Component,
    canActivate: [LoginGuard]
  },
  {
    title: "header.sliders.email",
    path: "email/verification",
    component: EmailVerificationComponent,
    canActivate: [NotLoginGuard]
  },
  {
    title: "header.sliders.signup",
    path: "signup/stage1",
    component: SignupStage1Component,
    canActivate: [NotLoginGuard, SignupStage1Guard]
  },
  {
    title: "header.sliders.signup",
    path: "signup/stage1/code",
    component: SignUpWithCodeComponent,
    canActivate: [NotLoginGuard, SignupStage1Guard]
  },
  {
    title: "header.sliders.login",
    path: "login",
    component: UserLoginComponent,
    canActivate: [LoginGuard]
  },

  {
    title: "Studyum",
    path: "token",
    component: ReceiveTokenComponent
  }
]

@NgModule({
  declarations: [
    ReceiveTokenComponent,

    UserSignupComponent,
    SignupStage1Component,
    SignUpWithCodeComponent,
    UserLoginComponent,

    EmailVerificationComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    TranslateModule.forChild(),
    FormsModule,
    ReactiveFormsModule,
    SharedModule,
    ModalsModule,
    ErrorInfoComponent
  ],
  exports: [RouterModule]
})
export class AuthModule {
}
