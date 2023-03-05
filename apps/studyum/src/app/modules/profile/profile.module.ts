import {NgModule} from "@angular/core"
import {CommonModule} from "@angular/common"
import {ProfileRoutingModule} from "./profile-routing.module"
import {AcceptUsersComponent} from "../../components/user/profile/accept-users/accept-users.component"
import {ProfileComponent} from "../../components/user/profile/profile.component"
import {ProfileOptionComponent} from "../../components/user/profile/profile-option/profile-option.component"
import {EditUserComponent} from "../../components/user/profile/edit-user/edit-user.component"
import {CreateCodeUserComponent} from "../../components/user/profile/create-code-user/create-code-user.component"
import {UserInfoComponent} from "../../components/user/profile/user-info/user-info.component"
import {ProfileCardComponent} from "../../components/user/profile/profile-card/profile-card.component"
import {PasswordResetEmailRequestComponent} from "../../components/user/signup/password-reset-email-request/password-reset-email-request.component"
import {PasswordResetComponent} from "../../components/user/signup/password-reset/password-reset.component"
import {TranslateModule} from "@ngx-translate/core"
import {FormsModule, ReactiveFormsModule} from "@angular/forms"
import {SharedModule} from "../shared.module"
import {ModalsModule} from "modals"
import {ErrorInfoComponent} from "../../../../../../libs/ui-elements/src/lib/elements/error-info/error-info.component"
import {FloatingContainerDirective} from "../../../../../../libs/ui-elements/src/lib/elements/floating-container.directive"

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
    PasswordResetComponent,
  ],
  imports: [
    CommonModule,
    TranslateModule.forChild(),
    FormsModule,
    ReactiveFormsModule,
    SharedModule,
    ModalsModule,
    ErrorInfoComponent,
    FloatingContainerDirective,
    ProfileRoutingModule,
  ],
})
export class ProfileModule {}
