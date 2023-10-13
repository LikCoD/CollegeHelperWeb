import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'map',
  standalone: true,
})
export class MapPipe<T, V> implements PipeTransform {
  transform(value: T[], transform: (item: T) => V): V[] {
    return value.map(transform);
  }
}
