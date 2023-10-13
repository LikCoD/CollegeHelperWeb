import { Observable } from 'rxjs';

export type SelectItems<V = any> = V[] | SelectItem<V>[] | Observable<SelectItems<V>> | (() => SelectItems)

export interface SelectItem<C = any> {
  id?: string | number
  value: C,
  display: string
}