import { NgModule } from '@angular/core';
import { TextInputComponent } from './text-input/text-input.component';
import { NumberInputComponent } from '@ui/inputs/number-input/number-input.component';

@NgModule({
  imports: [TextInputComponent, NumberInputComponent],
  exports: [TextInputComponent, NumberInputComponent],
})
export class InputsModule {
}
