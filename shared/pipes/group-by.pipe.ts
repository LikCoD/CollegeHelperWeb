import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'groupBy',
  standalone: true,
})
export class GroupByPipe<T, V> implements PipeTransform {
  transform(value: T[], groupBy: (item: T) => string | number | symbol): { [key: string | number | symbol]: T[] } {
    const obj: { [key: string | number | symbol]: T[] } = {};
    value.forEach(v => (obj[groupBy(v)] ??= []).push(v));
    return obj;
  }
}
