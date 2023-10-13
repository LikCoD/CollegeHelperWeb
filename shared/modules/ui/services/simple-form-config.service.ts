import { Injectable } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Observable, of } from 'rxjs';
import { cacheable } from '@shared/rxjs/pipes/cacheable.pipe';
import {
  FormConfig,
  FormConfigElement,
  FormConfigElements,
  FormConfigElementTypes,
  FormValue,
} from '@shared/modules/ui/entities/form.config';

@Injectable({
  providedIn: 'root',
})
export class SimpleFormConfigService {
  getFormValue<V extends Object>(config?: FormConfig<any, V> | null): Observable<V | null> {
    return config && config.value ? this._getFormValue(config.value) : of(null);
  }

  buildForm<C extends FormConfigElements<C>>(config: FormConfig<C>): FormGroup {
    const controls = Object.entries(config.elements)
      .map(v => v as unknown as [string, FormConfigElement<any>])
      .map(v => [v[0], v[1].control ?? this.buildControl(v[1])]);

    const form = new FormGroup<any>(Object.fromEntries(controls));
    this._registerDependentElements(form, config);
    return form;
  }

  buildControl(element: FormConfigElement<any>): FormControl {
    return new FormControl(element.initial, element.validators);
  }

  private _getFormValue<V extends Object>(value: FormValue<V>): Observable<V | null> {
    if (typeof value === 'function') return this._getFormValue(value());
    if (value instanceof Observable) return value;
    return of(value);
  }

  private _registerDependentElements<T extends FormConfigElements<T>>(form: FormGroup, config: FormConfig<T>): void {
    for (let key in config.elements) {
      this._registerDependentElement(form, config.elements[key]);
    }
  }

  private _registerDependentElement(form: FormGroup, element: FormConfigElement<any>): void {
    if (
      !element.dependable ||
      (element.type !== FormConfigElementTypes.SELECT &&
        element.type !== FormConfigElementTypes.SEARCHABLE_SELECT &&
        element.type !== FormConfigElementTypes.AUTOCOMPLETE_TEXT)
    )
      return;

    element.typeConfig.items = form.controls[element.dependable.dependsOn].valueChanges.pipe(
      cacheable(element.dependable.dependsItems, element.dependable.cacheable)
    );
  }
}
