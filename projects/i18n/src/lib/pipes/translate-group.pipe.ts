import { Pipe, PipeTransform } from '@angular/core';
import { TranslateObject } from '../entities/i18n.entity';

@Pipe({
  name: 'translateGroup',
  standalone: true,
})
export class TranslateGroupPipe implements PipeTransform {
  transform(
    value: string | TranslateObject,
    group: string | string[] | null = null
  ): TranslateObject {
    return {
      key: typeof value === 'string' ? value : value.key,
      group: typeof group === 'string' ? [group] : group,
      onNotFound: typeof value === 'string' ? undefined : value.onNotFound,
    };
  }
}
