import { inject, Injector, Pipe, PipeTransform } from '@angular/core';
import { I18N_GROUP_TOKEN } from '../providers/group.provider';
import { TranslateObject } from '../entities/i18n.entity';

@Pipe({
  name: 'translateSuffix',
  standalone: true,
})
export class TranslateSuffixPipe implements PipeTransform {
  private injector = inject(Injector);

  transform(value: string | TranslateObject, suffix: string | string[]): TranslateObject {
    if (typeof value === 'string') {
      value = {
        key: value,
        group: this.injector.get(I18N_GROUP_TOKEN, []),
      };
    }

    if (typeof suffix === 'string') {
      suffix = [suffix];
    }

    return {
      key: value.key,
      group: [...(value.group ?? []), ...suffix],
      onNotFound: value.onNotFound,
    };
  }
}
