import { NgModule } from '@angular/core';
import { PrimaryButtonComponent } from '@shared/modules/ui/components/buttons/primary-button.component';
import { SecondaryButtonComponent } from '@shared/modules/ui/components/buttons/secondary-button.component';
import { WarnButtonComponent } from '@shared/modules/ui/components/buttons/warn-button.component';
import { DefaultButtonComponent } from '@shared/modules/ui/components/buttons/default-button.component';

@NgModule({
  imports: [DefaultButtonComponent, PrimaryButtonComponent, SecondaryButtonComponent, WarnButtonComponent],
  exports: [DefaultButtonComponent, PrimaryButtonComponent, SecondaryButtonComponent, WarnButtonComponent]
})
export class ButtonsModule { }
