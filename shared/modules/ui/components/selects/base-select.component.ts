import { ChangeDetectionStrategy, Component, inject, Input } from '@angular/core';
import { SelectItem, SelectItems } from '@shared/modules/ui/entities/select';
import { Observable } from 'rxjs';
import { SelectsService } from '@ui/selects/selects.service';
import {
  MatFormControlValueAccessorComponent,
} from '@shared/modules/ui/utils/form/mat-form-control-value-accessor.component';

@Component({
  template: '',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class BaseSelectComponent<V> extends MatFormControlValueAccessorComponent<V> {
  items$!: Observable<SelectItem<V>[]>;

  private service = inject(SelectsService);

  @Input({ required: true, alias: 'items' }) set _items(value: SelectItems<V>) {
    this.items$ = this.service.parseValue(value);
  }

  trackBy = (_: number, item: SelectItem<V>) => item.id ?? item.value ?? null;
}
