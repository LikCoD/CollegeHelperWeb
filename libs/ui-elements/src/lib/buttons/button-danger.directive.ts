import {Directive, ElementRef} from "@angular/core"

@Directive({
  selector: "[uiButtonDanger]",
})
export class ButtonDangerDirective {
  constructor(elRef: ElementRef<HTMLButtonElement>) {
    elRef.nativeElement.classList.add("btn", "btn-danger")
  }
}
