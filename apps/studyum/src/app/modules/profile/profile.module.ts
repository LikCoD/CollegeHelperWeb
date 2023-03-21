import {NgModule} from "@angular/core"
import {CommonModule, NgOptimizedImage} from "@angular/common"
import {ProfileRoutingModule} from "./profile-routing.module"
import {PasswordResetEmailRequestComponent} from "./components/password-reset-email-request/password-reset-email-request.component"
import {PasswordResetComponent} from "./components/password-reset/password-reset.component"
import {TranslateModule} from "@ngx-translate/core"
import {FormsModule, ReactiveFormsModule} from "@angular/forms"
import {SharedModule} from "../../shared/shared.module"
import {ModalsModule} from "@common/modals"
import {ErrorInfoComponent} from "../../../../../../libs/common/ui-elements/src/lib/elements/error-info/error-info.component"
import {FloatingContainerDirective} from "../../../../../../libs/common/ui-elements/src/lib/elements/floating-container.directive"
import {MatButtonModule} from "@angular/material/button"
import {AcceptUsersComponent} from "./components/accept-users/accept-users.component"
import {ProfileComponent} from "./components/profile.component"
import {ProfileOptionComponent} from "./components/profile-option/profile-option.component"
import {EditUserComponent} from "./components/edit-user/edit-user.component"
import {CreateCodeUserComponent} from "./components/create-code-user/create-code-user.component"
import {UserInfoComponent} from "./components/user-info/user-info.component"
import {ProfileCardComponent} from "./components/profile-card/profile-card.component"

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
    MatButtonModule,
    NgOptimizedImage,
  ],
})
export class ProfileModule {}
