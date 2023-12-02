import { ChangeDetectionStrategy, Component, inject, OnDestroy, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { PortalModule } from '@angular/cdk/portal';
import { MatButtonModule } from '@angular/material/button';
import {
  Time,
  TimePickerViewComponent,
} from '@shared/modules/ui/components/datetime/time-picker-view/time-picker-view.component';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { DateTime } from 'luxon';
import { DateTimeRangePickerService } from '@shared/modules/ui/components/pickers/date-time-range-picker/date-time-range-picker.service';
import { map, merge, Subscription } from 'rxjs';
import { filterNotNull } from '@shared/rxjs/pipes/filterNotNull.pipe';
import { provideTranslationGroup } from 'i18n';

@Component({
  selector: 'date-time-range-picker-header',
  standalone: true,
  imports: [
    CommonModule,
    MatDatepickerModule,
    PortalModule,
    MatButtonModule,
    TimePickerViewComponent,
    ReactiveFormsModule,
  ],
  providers: [provideTranslationGroup('ui.pickers.datetime')],
  templateUrl: './date-time-range-picker-header.component.html',
  styleUrls: ['./date-time-range-picker-header.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DateTimeRangePickerHeaderComponent implements OnInit, OnDestroy {
  startDateFormControl = new FormControl<Time | null>(null);
  endDateFormControl = new FormControl<Time | null>(null);

  private controlsSubscription?: Subscription;
  private service = inject(DateTimeRangePickerService);

  get isTimeFilled(): boolean {
    const start = this.startDateFormControl.value;
    const end = this.endDateFormControl.value;

    if (!start || !end) return false;

    const startValid = this.toDateTime(start).isValid;
    const endValid = this.toDateTime(end).isValid;

    return startValid && endValid;
  }

  ngOnInit(): void {
    if (this.service.time) {
      this.startDateFormControl.setValue(this.extractTime(this.service.time.start));
      this.endDateFormControl.setValue(this.extractTime(this.service.time.end));
    }

    this.controlsSubscription = merge(
      this.startDateFormControl.valueChanges,
      this.endDateFormControl.valueChanges
    )
      .pipe(
        map(() => {
          if (!this.startDateFormControl.value || !this.endDateFormControl.value) return null;

          const start = this.toDateTime(this.startDateFormControl.value);
          const end = this.toDateTime(this.endDateFormControl.value);

          return !start.isValid || !end.isValid ? null : { start: start, end: end };
        })
      )
      .pipe(filterNotNull())
      .subscribe(v => (this.service.time = v));
  }

  ngOnDestroy(): void {
    this.controlsSubscription?.unsubscribe();
  }

  private extractTime(datetime: DateTime): Time {
    return {
      hours: datetime.hour,
      minutes: datetime.minute,
    };
  }

  private toDateTime(time: Time): DateTime {
    return DateTime.fromObject({ hour: time.hours, minute: time.minutes });
  }
}
