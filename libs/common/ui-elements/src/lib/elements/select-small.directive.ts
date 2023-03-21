import {Directive, ElementRef} from "@angular/core"

@Directive({
  selector: "[uiSelectSmall]"
})
export class SelectSmallDirective {
  constructor(elRef: ElementRef<HTMLElement>) {
    elRef.nativeElement.classList.add("form-select-sm")
  }
}
