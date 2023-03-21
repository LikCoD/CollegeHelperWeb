import {Directive, ElementRef} from "@angular/core"

@Directive({
  selector: "[uiInput]",
})
export class InputDirective {
  constructor(elRef: ElementRef<HTMLElement>) {
    elRef.nativeElement.classList.add("form-control")
  }
}
