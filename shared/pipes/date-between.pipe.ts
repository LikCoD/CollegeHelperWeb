import { Pipe, PipeTransform } from '@angular/core';
import { DateTime, DurationLikeObject, DurationUnit } from 'luxon';

@Pipe({
  name: 'dateBetween',
  standalone: true,
})
export class DateBetweenPipe implements PipeTransform {
  transform(dates: DateTime[], unit: DurationUnit): DateTime[] {
    if (dates.length < 2) return [];

    const between: DateTime[] = [];
    let from = dates[0];
    for (let i = 1; i < dates.length; i++) {
      const date = dates[i];
      between.push(...this.between(from, date, unit));
      from = date;
    }
    return between;
  }


  between(from: DateTime, to: DateTime, unit: DurationUnit): DateTime[] {
    const between: DateTime[] = [];
    for (let i = 0; i < to.diff(from, unit).get(unit); i++) {
      const duration: DurationLikeObject = {};
      duration[unit] = i;
      between.push(from.plus(duration));
    }
    return between;
  }
}
