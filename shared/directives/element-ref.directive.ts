import { Directive, ElementRef, inject } from '@angular/core';

@Directive({
  selector: '[elementRef]',
  exportAs: 'elementRef',
  standalone: true,
})
export class ElementRefDirective {
  ref = inject(ElementRef<HTMLElement>);

  get el(): HTMLElement {
    return this.ref.nativeElement;
  }
}
