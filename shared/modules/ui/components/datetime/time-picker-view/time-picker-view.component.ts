import { ChangeDetectionStrategy, Component, forwardRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';
import { NG_VALUE_ACCESSOR, ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { TextInputComponent } from '@ui/inputs/text-input/text-input.component';
import { MatFormControlValueAccessorComponent } from '@shared/modules/ui/utils/form/mat-form-control-value-accessor.component';

@Component({
  selector: 'time-picker-view',
  standalone: true,
  imports: [CommonModule, MatIconModule, ReactiveFormsModule, MatButtonModule, TextInputComponent],
  templateUrl: './time-picker-view.component.html',
  styleUrls: ['./time-picker-view.component.scss'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => TimePickerViewComponent),
      multi: true,
    },
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TimePickerViewComponent extends MatFormControlValueAccessorComponent<{
  hours: number;
  minutes: number;
}> {}
