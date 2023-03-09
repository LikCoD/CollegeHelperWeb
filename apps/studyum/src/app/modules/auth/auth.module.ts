import {NgModule} from "@angular/core"
import {CommonModule} from "@angular/common"
import {AuthRoutingModule} from "./auth-routing.module"
import {ReceiveTokenComponent} from "../../components/user/receive-token/receive-token.component"
import {UserSignupComponent} from "../../components/user/signup/user-signup.component"
import {SignupStage1Component} from "../../components/user/signup/stage1/signup-stage1.component"
import {SignUpWithCodeComponent} from "../../components/user/signup/with-token/sign-up-with-code.component"
import {UserLoginComponent} from "../../components/user/user-login/user-login.component"
import {EmailVerificationComponent} from "../../components/user/signup/email-verification/email-verification.component"
import {TranslateModule} from "@ngx-translate/core"
import {FormsModule, ReactiveFormsModule} from "@angular/forms"
import {SharedModule} from "../shared.module"
import {ModalsModule} from "modals"
import {ErrorInfoComponent} from "../../../../../../libs/ui-elements/src/lib/elements/error-info/error-info.component"
import {MatButtonModule} from "@angular/material/button"

@NgModule({
  declarations: [
    ReceiveTokenComponent,

    UserSignupComponent,
    SignupStage1Component,
    SignUpWithCodeComponent,
    UserLoginComponent,

    EmailVerificationComponent,
  ],
  imports: [
    CommonModule,
    TranslateModule.forChild(),
    FormsModule,
    ReactiveFormsModule,
    SharedModule,
    ModalsModule,
    ErrorInfoComponent,
    AuthRoutingModule,
    MatButtonModule,
  ],
})
export class AuthModule {}
