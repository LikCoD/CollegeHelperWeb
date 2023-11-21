import { NgModule } from '@angular/core';
import { PrimaryContainerComponent } from '@shared/modules/ui/components/containers/primary-container.component';
import { SecondaryContainerComponent } from '@shared/modules/ui/components/containers/secondary-container.component';

@NgModule({
  imports: [PrimaryContainerComponent, SecondaryContainerComponent],
  exports: [PrimaryContainerComponent, SecondaryContainerComponent],
})
export class ContainersModule {}
