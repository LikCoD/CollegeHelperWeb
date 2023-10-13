import { NgModule } from '@angular/core';
import { TextInputComponent } from './text-input/text-input.component';

@NgModule({
  imports: [TextInputComponent],
  exports: [TextInputComponent],
})
export class InputsModule {
}
