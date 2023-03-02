import {Directive, ElementRef} from "@angular/core"

@Directive({
  selector: "[uiButton]",
})
export class ButtonDirective {
  constructor(elRef: ElementRef<HTMLElement>) {
    elRef.nativeElement.classList.add("btn", "btn-outline-light")
  }
}
