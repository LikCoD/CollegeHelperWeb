import { Injectable } from '@angular/core';
import { SelectItem, SelectItems } from '@shared/modules/ui/entities/select';
import { Observable, of, switchMap } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class SelectsService {
  parseValue<V>(values: SelectItems<V>): Observable<SelectItem<V>[]> {
    if (typeof values === 'function') return this.parseValue(values());
    if (values instanceof Observable) return values.pipe(switchMap(this.parseValue.bind(this)));
    if (!values || values.length === 0) return of([])

    const arr: SelectItem<V>[] = this.checkIfValueIsSelectItem(values[0]) ? values as SelectItem<V>[] : values.map(v => <SelectItem>{
      value: v,
      display: `${v}`,
    });

    return of(arr);
  }

  private checkIfValueIsSelectItem<V>(value: V | SelectItem<V>): boolean {
    if (!value || typeof value !== 'object') return false;
    return 'value' in value && 'display' in value;
  }
}
