import {
  ChangeDetectionStrategy,
  Component,
  forwardRef,
  inject,
  OnDestroy,
  OnInit,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { PortalModule } from '@angular/cdk/portal';
import { MatButtonModule } from '@angular/material/button';
import { TimePickerViewComponent } from '@shared/modules/ui/components/datetime/time-picker-view/time-picker-view.component';
import { ControlErrorComponent } from '@ui/errors/control-error/control-error.component';
import { MatFormFieldModule } from '@angular/material/form-field';
import { FormControl, NG_VALUE_ACCESSOR, ReactiveFormsModule } from '@angular/forms';
import { MatFormControlValueAccessorComponent } from '@shared/modules/ui/utils/form/mat-form-control-value-accessor.component';
import { DateTime } from 'luxon';
import { merge, Subscription } from 'rxjs';
import { DateTimeRangePickerHeaderComponent } from '@shared/modules/ui/components/pickers/date-time-range-picker/date-time-range-picker-header/date-time-range-picker-header.component';
import { DateTimeRangePickerService } from '@shared/modules/ui/components/pickers/date-time-range-picker/date-time-range-picker.service';
import { TranslatePipe } from 'i18n';

@Component({
  selector: 'date-time-range-picker',
  standalone: true,
  imports: [
    CommonModule,
    MatDatepickerModule,
    PortalModule,
    MatButtonModule,
    TimePickerViewComponent,
    ControlErrorComponent,
    MatFormFieldModule,
    ReactiveFormsModule,
    TranslatePipe,
  ],
  providers: [
    DateTimeRangePickerService,
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => DateTimeRangePickerComponent),
      multi: true,
    },
  ],
  templateUrl: './date-time-range-picker.component.html',
  styleUrls: ['./date-time-range-picker.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DateTimeRangePickerComponent
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

  protected readonly DateTimeRangePickerHeaderComponent = DateTimeRangePickerHeaderComponent;

  private service = inject(DateTimeRangePickerService);

  get startTime(): string {
    return `"${this.startDateControl.value?.toFormat('HH:mm') ?? ''}"`;
  }

  get endTime(): string {
    return `"${this.endDateControl.value?.toFormat('HH:mm') ?? ''}"`;
  }

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
      if (!this.service.time) return;

      let start = this.startDateControl.value;
      let end = this.endDateControl.value;
      const control = this.control.value;

      start =
        start?.set({
          minute: this.service.time.start.minute,
          hour: this.service.time.start.hour,
        }) ?? start;

      end =
        end?.set({
          minute: this.service.time.end.minute,
          hour: this.service.time.end.hour,
        }) ?? end;

      if (
        (start?.toMillis() === control?.start?.toMillis() &&
          end?.toMillis() === control?.end?.toMillis()) ||
        (start !== end && (!start || !end))
      )
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
