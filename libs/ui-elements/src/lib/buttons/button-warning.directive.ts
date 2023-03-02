import {Directive, ElementRef} from "@angular/core"

@Directive({
  selector: "[uiButtonWarning]",
})
export class ButtonWarningDirective {
  constructor(elRef: ElementRef<HTMLButtonElement>) {
    elRef.nativeElement.classList.add("btn", "btn-warning")
  }
}
