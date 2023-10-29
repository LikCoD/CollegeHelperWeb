import { Injectable } from '@angular/core';
import { DateTime } from 'luxon';

@Injectable()
export class DateTimeRangePickerService {
  time: { start: DateTime; end: DateTime } | null = null;
}
