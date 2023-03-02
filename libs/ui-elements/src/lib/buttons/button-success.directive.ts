import {Directive, ElementRef} from "@angular/core"

@Directive({
  selector: "[uiButtonSuccess]",
})
export class ButtonSuccessDirective {
  constructor(elRef: ElementRef<HTMLButtonElement>) {
    elRef.nativeElement.classList.add("btn", "btn-success")
  }
}
