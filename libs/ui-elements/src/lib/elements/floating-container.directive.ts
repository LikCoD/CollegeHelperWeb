import {Directive, ElementRef} from "@angular/core"

@Directive({
  selector: "[uiFloatingContainer]",
  standalone: true,
})
export class FloatingContainerDirective {
  constructor(elRef: ElementRef<HTMLElement>) {
    elRef.nativeElement.classList.add("form-floating")
  }
}
