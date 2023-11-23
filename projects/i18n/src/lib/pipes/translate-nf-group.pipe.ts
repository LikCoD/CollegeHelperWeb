import { inject, Injector, Pipe, PipeTransform } from '@angular/core';
import { TranslateObject } from '../entities/i18n.entity';
import { I18N_GROUP_TOKEN } from '../providers/group.provider';

@Pipe({
  name: 'translateNFGroup',
  standalone: true,
  pure: false,
})
export class TranslateNfGroupPipe implements PipeTransform {
  private injector = inject(Injector);

  transform(value: string | TranslateObject): TranslateObject {
    return {
      key: typeof value === 'string' ? value : value.key,
      group: typeof value === 'string' ? this.injector.get(I18N_GROUP_TOKEN, []) : value.group,
      onNotFound: (object: TranslateObject) => `${object.group?.join('.') ?? ''}.${object.key}`,
    };
  }
}
