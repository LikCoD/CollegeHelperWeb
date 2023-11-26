import { inject, Injectable } from '@angular/core';
import { map, Observable, switchMap } from 'rxjs';
import { FormControl } from '@angular/forms';
import { filterNotNull } from '@shared/rxjs/pipes/filterNotNull.pipe';
import { LoaderService, TranslateObject, TranslationService } from 'i18n';
import { toObservable } from '@angular/core/rxjs-interop';

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

  getControlErrorsText$(control: FormControl): Observable<string> {
    return control.valueChanges
      .pipe(map(() => control.errors))
      .pipe(filterNotNull())
      .pipe(map(e => Object.entries(e!)[0]))
      .pipe(filterNotNull())
      .pipe(map(e => [<TranslateObject>{ key: e[0], group: ['forms', 'errors'] }, e[1]]))
      .pipe(switchMap(e => toObservable(this.translate.translate(e[0], e[1]))))
      .pipe(map(e => `${e}`));
  }
}
