import { ChangeDetectionStrategy, Component, forwardRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';
import { FormControl, NG_VALUE_ACCESSOR, ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { TextInputComponent } from '@ui/inputs/text-input/text-input.component';
import { MatFormControlValueAccessorComponent } from '@shared/modules/ui/utils/form/mat-form-control-value-accessor.component';
import { filter, map } from 'rxjs';

export interface Time {
  hours: number;
  minutes: number;
}

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
export class TimePickerViewComponent extends MatFormControlValueAccessorComponent<Time> {
  rawControl = new FormControl<string | null>('');

  override registerOnChange(fn: (v: Time | null) => void): void {
    this.changeSubscription = this.rawControl.valueChanges
      .pipe(map(v => `${v}`))
      .pipe(map(v => v.split(':')))
      .pipe(filter(v => v.length == 2 && !!v[0] && !!v[1]))
      .pipe(map(v => <Time>{ hours: +v[0], minutes: +v[1] }))
      .subscribe(fn);
  }

  override writeValue(value: Time | null): void {
    super.writeValue(value);
    if (!value) return;

    const addTrailZero = (v: number) => (v >= 10 ? `${v}` : `0${v}`);
    this.rawControl.setValue(`${addTrailZero(value.hours)}:${addTrailZero(value.minutes)}`);
  }
}
