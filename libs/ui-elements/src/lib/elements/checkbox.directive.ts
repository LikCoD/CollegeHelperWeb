import {Directive, ElementRef} from "@angular/core"

@Directive({
  selector: "[uiCheckbox]"
})
export class CheckboxDirective {
  constructor(elRef: ElementRef<HTMLElement>) {
    elRef.nativeElement.classList.add("form-check")
    elRef.nativeElement.style.minHeight = "unset"
  }
}
