import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'values',
  standalone: true,
})
export class ValuesPipe<T> implements PipeTransform {

  transform(obj: { [key: string | number | symbol]: T }): T[] {
    return Object.values(obj);
  }

}
