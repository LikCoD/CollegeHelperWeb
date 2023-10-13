import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'min',
  standalone: true,
})
export class MinPipe<T> implements PipeTransform {
  transform(value: T[], minBy: (item: T) => number = i => typeof i === 'number' ? i : 0): T | null {
    if (value.length === 0) return null;

    let min: [T, number] = [value[0], minBy(value[0])];
    for (let i = 1; i < value.length; i++) {
      let current = minBy(value[i]);
      if (current < min[1]) min = [value[i], current];
    }

    return min[0];
  }
}
