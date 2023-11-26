import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { routes } from './auth.routes';
import { SignupComponent } from './components/signup/signup.component';
import { DefaultFormComponent } from '@ui/forms/default-form/default-form.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { TextInputComponent } from '@ui/inputs/text-input/text-input.component';
import { SignupJoinStudyPlaceComponent } from './components/signup-join-study-place/signup-join-study-place.component';
import { LoginComponent } from '@user/modules/auth/components/login/login.component';
import { ResetPasswordDataComponent } from './components/reset-password-data/reset-password-data.component';
import { ResetPasswordCodeComponent } from './components/reset-password-code/reset-password-code.component';
import { EmailConfirmComponent } from '@user/modules/auth/components/email-confirm/email-confirm.component';
import { CharacterComponent } from '@ui/images/character.component';
import { PrimaryContainerComponent } from '@shared/modules/ui/components/containers/primary-container.component';
import { provideTranslationSuffix } from 'i18n';

@NgModule({
  declarations: [
    LoginComponent,
    SignupComponent,
    SignupJoinStudyPlaceComponent,
    ResetPasswordDataComponent,
    ResetPasswordCodeComponent,
    EmailConfirmComponent,
  ],
  imports: [
    RouterModule.forChild(routes),
    CommonModule,
    DefaultFormComponent,
    FormsModule,
    ReactiveFormsModule,
    TextInputComponent,
    CharacterComponent,
    PrimaryContainerComponent,
  ],
  providers: [provideTranslationSuffix('auth')],
})
export class AuthModule {}
