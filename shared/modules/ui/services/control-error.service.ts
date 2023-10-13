import { inject, Injectable } from '@angular/core';
import { map, Observable, switchMap } from 'rxjs';
import { FormControl } from '@angular/forms';
import { TranslateService } from '@ngx-translate/core';
import { TranslateLoaderService } from '@translate/translate-loader.service';
import { filterNotNull } from '@shared/rxjs/pipes/filterNotNull.pipe';

@Injectable({
  providedIn: 'root',
})
export class ControlErrorService {
  private translate = inject(TranslateService);
  private translateLoader = inject(TranslateLoaderService);

  constructor() {
    this.translateLoader.addGroup('forms.errors');
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
      .pipe(switchMap(e => this.translate.get(`forms.errors.${e[0]}`)));
  }
}

