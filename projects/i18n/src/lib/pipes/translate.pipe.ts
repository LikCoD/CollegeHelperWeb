import { inject, Injector, Pipe, PipeTransform } from '@angular/core';
import { Params } from '@angular/router';
import { TranslationService } from '../services/translation.service';
import { TranslateObject } from '../entities/i18n.entity';
import { I18N_GROUP_TOKEN } from '../providers/group.provider';

@Pipe({
  name: 'translate',
  standalone: true,
  pure: false,
})
export class TranslatePipe implements PipeTransform {
  value: string | number | null = null;

  private translationService = inject(TranslationService);
  private injector = inject(Injector);

  transform(value: string | TranslateObject, params: Params = {}): string | number {
    if (typeof value === 'string') {
      value = <TranslateObject>{
        key: value,
        group: this.injector.get(I18N_GROUP_TOKEN, null),
      };
    }
    const translation = this.translationService.translate(value, params);
    return translation();
  }
}
