import { Pipe, PipeTransform } from '@angular/core';
import { DateTime } from 'luxon';

@Pipe({
  name: 'time',
  standalone: true
})
export class TimePipe implements PipeTransform {
  transform(time: string, format: string): string {
    return DateTime.fromISO(time).toFormat(format)
  }
}
