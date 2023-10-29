import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  DateTimeRangePickerComponent
} from '@shared/modules/ui/components/pickers/date-time-range-picker/date-time-range-picker.component';
import {
  DateRangePickerComponent
} from '@shared/modules/ui/components/pickers/date-range-picker/date-range-picker.component';

@NgModule({
  imports: [
    DateRangePickerComponent,
    DateTimeRangePickerComponent,
  ],
  exports: [
    DateRangePickerComponent,
    DateTimeRangePickerComponent,
  ],
})
export class PickersModule { }
