import { ChangeDetectionStrategy, Component, forwardRef, OnDestroy, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatFormFieldModule } from '@angular/material/form-field';
import { FormControl, NG_VALUE_ACCESSOR, ReactiveFormsModule } from '@angular/forms';
import { ControlErrorComponent } from '@ui/errors/control-error/control-error.component';
import { MatFormControlValueAccessorComponent } from '@shared/modules/ui/utils/form/mat-form-control-value-accessor.component';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { TranslateModule } from '@ngx-translate/core';
import { merge, Subscription } from 'rxjs';
import { DateTime } from 'luxon';

@Component({
  selector: 'date-range-picker',
  standalone: true,
  imports: [
    CommonModule,
    MatFormFieldModule,
    ReactiveFormsModule,
    ControlErrorComponent,
    MatDatepickerModule,
    TranslateModule,
  ],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => DateRangePickerComponent),
      multi: true,
    },
  ],
  templateUrl: './date-range-picker.component.html',
  styleUrls: ['./date-range-picker.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DateRangePickerComponent
  extends MatFormControlValueAccessorComponent<{
    start: DateTime;
    end: DateTime;
  }>
  implements OnInit, OnDestroy
{
  startDateControl = new FormControl<DateTime | null>(null);
  endDateControl = new FormControl<DateTime | null>(null);
  controlSubscription!: Subscription;

  datesSubscription!: Subscription;

  ngOnInit(): void {
    this.controlSubscription = this.control.valueChanges.subscribe(v => {
      if ((v?.start ?? null) !== this.startDateControl.value)
        this.startDateControl.setValue(v?.start ?? null);
      if ((v?.end ?? null) !== this.endDateControl.value)
        this.endDateControl.setValue(v?.end ?? null);
    });

    this.datesSubscription = merge(
      this.startDateControl.valueChanges,
      this.endDateControl.valueChanges
    ).subscribe(() => {
      const start = this.startDateControl.value;
      const end = this.endDateControl.value;
      const control = this.control.value;

      if ((start === control?.start && end === control?.end) || (start !== end && (!start || !end)))
        return;
      if (!start || !end) return this.control.setValue(null);

      this.control.setValue({
        start: start,
        end: end,
      });
    });
  }

  override ngOnDestroy(): void {
    this.controlSubscription.unsubscribe();
    this.datesSubscription.unsubscribe();
  }
}
