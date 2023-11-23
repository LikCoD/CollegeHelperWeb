import { inject, Injector, Pipe, PipeTransform } from '@angular/core';
import { I18N_GROUP_TOKEN } from '../providers/group.provider';
import { TranslateObject } from '../entities/i18n.entity';

@Pipe({
  name: 'translatePrefix',
  standalone: true,
})
export class TranslatePrefixPipe implements PipeTransform {
  private injector = inject(Injector);

  transform(value: string | TranslateObject, prefix: string | string[]): TranslateObject {
    if (typeof value === 'string') {
      value = {
        key: value,
        group: this.injector.get(I18N_GROUP_TOKEN, []),
      };
    }

    if (typeof prefix === 'string') {
      prefix = [prefix];
    }

    return {
      key: value.key,
      group: [...prefix, ...(value.group ?? [])],
      onNotFound: value.onNotFound,
    };
  }
}
