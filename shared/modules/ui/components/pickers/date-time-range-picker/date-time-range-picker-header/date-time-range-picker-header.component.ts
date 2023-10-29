import { ChangeDetectionStrategy, Component, inject, OnDestroy, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { PortalModule } from '@angular/cdk/portal';
import { MatButtonModule } from '@angular/material/button';
import { TimePickerViewComponent } from '@shared/modules/ui/components/datetime/time-picker-view/time-picker-view.component';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { DateTime } from 'luxon';
import { DateTimeRangePickerService } from '@shared/modules/ui/components/pickers/date-time-range-picker/date-time-range-picker.service';
import { map, merge, Subscription } from 'rxjs';
import { filterNotNull } from '@shared/rxjs/pipes/filterNotNull.pipe';
import { translateGroupProvider } from '@translate/translate.prefix-provider';

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
  providers: [translateGroupProvider('ui.pickers.datetime')],
  templateUrl: './date-time-range-picker-header.component.html',
  styleUrls: ['./date-time-range-picker-header.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DateTimeRangePickerHeaderComponent implements OnInit, OnDestroy {
  startDateFormControl = new FormControl<DateTime | string | null>(null);
  endDateFormControl = new FormControl<DateTime | string | null>(null);

  private controlsSubscription?: Subscription;
  private service = inject(DateTimeRangePickerService);

  get isTimeFilled(): boolean {
    const start = this.startDateFormControl.value;
    const end = this.endDateFormControl.value;

    if (!start || !end) return false;

    const startValid = DateTime.fromFormat(start as string, 'H:m').isValid;
    const endValid = DateTime.fromFormat(end as string, 'H:m').isValid;

    return startValid && endValid;
  }

  ngOnInit(): void {
    if (this.service.time) {
      this.startDateFormControl.setValue(this.service.time.start.toFormat('H:m'));
      this.endDateFormControl.setValue(this.service.time.end.toFormat('H:m'));
    }

    this.controlsSubscription = merge(
      this.startDateFormControl.valueChanges,
      this.endDateFormControl.valueChanges
    )
      .pipe(
        map(() => {
          if (!this.startDateFormControl.value || !this.endDateFormControl.value) return null;

          const start = DateTime.fromFormat(this.startDateFormControl.value as string, 'H:m');
          const end = DateTime.fromFormat(this.endDateFormControl.value as string, 'H:m');

          return !start.isValid || !end.isValid ? null : { start: start, end: end };
        })
      )
      .pipe(filterNotNull())
      .subscribe(v => (this.service.time = v));
  }

  ngOnDestroy(): void {
    this.controlsSubscription?.unsubscribe();
  }
}
