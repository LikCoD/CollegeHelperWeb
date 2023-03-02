import {Directive, ElementRef} from "@angular/core"

@Directive({
  selector: "[uiButtonSmall]",
})
export class ButtonSmallDirective {
  constructor(elRef: ElementRef<HTMLButtonElement>) {
    elRef.nativeElement.classList.add("btn", "btn-sm")
  }
}
