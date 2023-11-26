import { NgModule } from '@angular/core';

import { RouterModule } from '@angular/router';
import { routes } from './user.routes';
import { provideTranslationSuffix } from 'i18n';

@NgModule({
  imports: [RouterModule.forChild(routes)],
  providers: [provideTranslationSuffix('user')],
})
export class UserModule {}
