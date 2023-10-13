import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'flatMap',
  standalone: true,
})
export class FlatMapPipe<T, V> implements PipeTransform {
  transform(value: T[], transform: (item: T) => V[]): V[] {
    return value.flatMap(transform);
  }
}
