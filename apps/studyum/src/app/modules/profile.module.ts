import {NgModule} from "@angular/core"
import {RouterModule, Routes} from "@angular/router"
import {ProfileComponent} from "../components/user/profile/profile.component"
import {NotLoginGuard} from "../guards/not-login.guard"
import {AcceptUsersComponent} from "../components/user/profile/accept-users/accept-users.component"
import {ProfileOptionComponent} from "../components/user/profile/profile-option/profile-option.component"
import {EditUserComponent} from "../components/user/profile/edit-user/edit-user.component"
import {CreateCodeUserComponent} from "../components/user/profile/create-code-user/create-code-user.component"
import {UserInfoComponent} from "../components/user/profile/user-info/user-info.component"
import {CommonModule} from "@angular/common"
import {TranslateModule} from "@ngx-translate/core"
import {FormsModule, ReactiveFormsModule} from "@angular/forms"
import {SharedModule} from "./shared.module"
import {ModalsModule} from "../../../../../libs/modals/src"
import {ProfileCardComponent} from "../components/user/profile/profile-card/profile-card.component"
import {PasswordResetComponent} from "../components/user/signup/password-reset/password-reset.component"
import {
  PasswordResetEmailRequestComponent
} from "../components/user/signup/password-reset-email-request/password-reset-email-request.component"
import {LoginGuard} from "../guards/login.guard"
import {ErrorInfoComponent} from "../../../../../libs/ui-elements/src/lib/elements/error-info/error-info.component"
import {FloatingContainerDirective} from "../../../../../libs/ui-elements/src/lib/elements/floating-container.directive"

const routes: Routes = [
  {
    title: "header.sliders.profile",
    path: "",
    component: ProfileComponent,
    canActivate: [NotLoginGuard]
  },

  {
    title: "header.sliders.profile",
    path: "password/reset",
    component: PasswordResetComponent,
    canActivate: [LoginGuard]
  },

  {
    title: "header.sliders.profile",
    path: "password/reset/email",
    component: PasswordResetEmailRequestComponent,
    canActivate: [LoginGuard]
  }
]

@NgModule({
  declarations: [
    AcceptUsersComponent,
    ProfileComponent,
    ProfileOptionComponent,
    EditUserComponent,
    CreateCodeUserComponent,
    UserInfoComponent,
    ProfileCardComponent,

    PasswordResetEmailRequestComponent,
    PasswordResetComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    TranslateModule.forChild(),
    FormsModule,
    ReactiveFormsModule,
    SharedModule,
    ModalsModule,
    ErrorInfoComponent,
    FloatingContainerDirective
  ],
  exports: [RouterModule]
})
export class ProfileModule {
}
