import { ChangeDetectorRef, effect, inject, Injector, Pipe, PipeTransform } from '@angular/core';
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
  private cdr = inject(ChangeDetectorRef);

  transform(value: string | TranslateObject, params: Params = {}): string | number {
    if (!this.value) this.subscribe(value, params);
    return this.value ?? '';
  }

  private subscribe(value: string | TranslateObject, params: Params = {}): void {
    if (typeof value === 'string') {
      value = <TranslateObject>{
        key: value,
        group: this.injector.get(I18N_GROUP_TOKEN, null),
      };
    }

    const translation = this.translationService.translate(value, params);
    setTimeout(() =>
      effect(
        () => {
          this.value = translation();
          this.cdr.markForCheck();
        },
        { injector: this.injector }
      )
    );
    this.value = translation();
  }
}
