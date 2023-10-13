import { NgModule } from '@angular/core';

import { RouterModule } from '@angular/router';
import { routes } from './user.routes';
import { translatePrefixProvider } from '@translate/translate.prefix-provider';

@NgModule({
  imports: [
    RouterModule.forChild(routes),
  ],
  providers: [
    translatePrefixProvider('user')
  ],
})
export class UserModule {
}
