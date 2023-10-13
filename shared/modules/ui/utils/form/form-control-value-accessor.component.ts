import { AfterViewInit, Component, inject, Injector } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ControlValueAccessor, FormControl, NgControl } from '@angular/forms';

@Component({
  template: '',
  imports: [CommonModule],
  standalone: true,
})
export class FormControlValueAccessorComponent<T> implements ControlValueAccessor, AfterViewInit {
  control = new FormControl<T | null>(null);

  protected injector = inject(Injector);

  ngAfterViewInit(): void {
    const c = this.injector.get(NgControl, null);
    if (!c) return;

    this.control.addValidators(c.control?.validator ?? []);
  }

  registerOnChange(fn: (v: T | null) => void): void {
    this.control.valueChanges.subscribe(fn);
  }

  registerOnTouched(fn: () => void): void {
    this.control.valueChanges.subscribe(fn);
  }

  writeValue(value: T | null): void {
    this.control.setValue(value);
  }

  setDisabledState(isDisabled: boolean): void {
    if (isDisabled) this.control.disable();
    else this.control.enable();
  }
}
