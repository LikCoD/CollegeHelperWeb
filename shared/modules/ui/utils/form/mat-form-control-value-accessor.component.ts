import { Component, Input } from '@angular/core';

import { FormControlValueAccessorComponent } from '@shared/modules/ui/utils/form/form-control-value-accessor.component';

@Component({
  template: '',
  imports: [],
  standalone: true,
})
export class MatFormControlValueAccessorComponent<T> extends FormControlValueAccessorComponent<T> {
  @Input() label?: string | null = null;
  @Input() placeholder?: string | null = null;
  @Input() type: string = 'text';
  @Input() hint?: string | null = null;
  @Input() showBottomSpace: boolean = true;
}
