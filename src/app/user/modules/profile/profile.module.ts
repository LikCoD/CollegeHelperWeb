import { NgModule } from '@angular/core';
import { CommonModule, NgForOf, NgIf } from '@angular/common';
import { RouterModule } from '@angular/router';
import { translatePrefixProvider } from '@translate/translate.prefix-provider';
import { routes } from './profile.routes';
import { ProfileComponent } from './components/profile/profile.component';
import { DefaultFormComponent } from '@ui/forms/default-form/default-form.component';
import { EditProfileComponent } from '@user/modules/profile/components/profile/edit-profile/edit-profile.component';
import {
  UserPreferencesComponent
} from '@user/modules/profile/components/profile/user-preferences/user-preferences.component';
import { ProfileCardComponent } from './components/profile/profile-card/profile-card.component';
import { MatButtonModule } from '@angular/material/button';
import { TranslateModule } from '@ngx-translate/core';
import { ImageComponent } from '@ui/images/image.component';
import { Head2Component } from '@ui/text/head2.component';
import { P1Component } from '@ui/text/p1.component';
import { SecondaryButtonComponent } from '@shared/modules/ui/components/buttons/secondary-button.component';
import { WarnButtonComponent } from '@shared/modules/ui/components/buttons/warn-button.component';
import { HDividerComponent } from '@ui/dividers/h-divider.component';
import { UrlComponent } from '@ui/text/url.component';
import { IconComponent } from '@ui/images/icon.component';

@NgModule({
  declarations: [
    ProfileComponent,
    EditProfileComponent,
    UserPreferencesComponent,
    ProfileCardComponent
  ],
  imports: [
    RouterModule.forChild(routes),
    CommonModule,
    DefaultFormComponent,
    MatButtonModule,
    NgForOf,
    NgIf,
    TranslateModule,
    ImageComponent,
    Head2Component,
    P1Component,
    SecondaryButtonComponent,
    WarnButtonComponent,
    HDividerComponent,
    UrlComponent,
    IconComponent,
  ],
  providers: [
    translatePrefixProvider('profile')
  ],
})
export class ProfileModule {
}
