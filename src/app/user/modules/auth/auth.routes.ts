import { Routes } from '@angular/router';
import { LoginComponent } from './components/login/login.component';
import { SignupComponent } from '@user/modules/auth/components/signup/signup.component';
import { SignupJoinStudyPlaceComponent } from '@user/modules/auth/components/signup-join-study-place/signup-join-study-place.component';
import { ResetPasswordDataComponent } from '@user/modules/auth/components/reset-password-data/reset-password-data.component';
import { ResetPasswordCodeComponent } from '@user/modules/auth/components/reset-password-code/reset-password-code.component';
import { EmailConfirmComponent } from '@user/modules/auth/components/email-confirm/email-confirm.component';

export const routes: Routes = [
  { path: 'login', component: LoginComponent },
  // { path: 'signup', component: SignupComponent },
  // { path: 'join', component: SignupJoinStudyPlaceComponent },
  // {
  //   path: 'email', children: [
  //     { path: 'confirm', component: EmailConfirmComponent },
  //     { path: '**', redirectTo: 'confirm' },
  //   ],
  // },
  // {
  //   path: 'password', children: [
  //     {
  //       path: 'reset', children: [
  //         { path: 'data', component: ResetPasswordDataComponent },
  //         { path: 'code', component: ResetPasswordCodeComponent },
  //         { path: '**', redirectTo: 'data' },
  //       ],
  //     },
  //   ],
  // },
];
