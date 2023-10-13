import { Pipe, PipeTransform } from '@angular/core';
import { DateTime } from 'luxon';

@Pipe({
  name: 'distinct',
  standalone: true,
})
export class DistinctPipe<T, V> implements PipeTransform {
  transform(value: T[], distinctBy: (item: T) => V | V[] = v => JSON.stringify(v) as V): V[] {
    return [...new Set(value.map(distinctBy).flat() as V[])];
  }
}
