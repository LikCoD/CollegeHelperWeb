import { inject, Injectable, signal, Signal } from '@angular/core';
import { map, Subscription } from 'rxjs';
import { FormControl } from '@angular/forms';
import { filterNotNull } from '@shared/rxjs/pipes/filterNotNull.pipe';
import { LoaderService, TranslateObject, TranslationService } from 'i18n';

@Injectable({
  providedIn: 'root',
})
export class ControlErrorService {
  private translate = inject(TranslationService);
  private translateLoader = inject(LoaderService);

  constructor() {
    this.translateLoader.loadGroup(['forms', 'errors']);
  }

  /*
   * {
   * "required": "This field is required"
   * "minLength": "Min length is {{minLength}}"
   * }
   * */

  getControlErrorsText$(control: FormControl): [Signal<string | null>, Subscription] {
    const error$ = signal<string | null>(null);
    const subscription = control.valueChanges
      .pipe(map(() => control.errors))
      .pipe(filterNotNull())
      .pipe(map(e => Object.entries(e!)[0]))
      .pipe(filterNotNull())
      .pipe(map(e => [<TranslateObject>{ key: e[0], group: ['forms', 'errors'] }, e[1]]))
      .subscribe(e => error$.set(`${this.translate.translate(e[0], e[1])()}`));
    return [error$, subscription];
  }
}
