import { NgModule } from '@angular/core';
import { ControlErrorComponent } from '@shared/modules/ui/components/errors/control-error/control-error.component';

@NgModule({
  imports: [ControlErrorComponent],
  exports: [ControlErrorComponent],
})
export class ErrorsModule {
}
