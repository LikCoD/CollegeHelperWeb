import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormControlValueAccessorComponent } from '@shared/modules/ui/utils/form/form-control-value-accessor.component';

@Component({
  template: '',
  imports: [CommonModule],
  standalone: true,
})
export class MatFormControlValueAccessorComponent<T> extends FormControlValueAccessorComponent<T> {
  @Input() label?: string | null = null;
  @Input() placeholder?: string | null = null;
  @Input() type: string = 'text';
  @Input() hint?: string | null = null;
}
