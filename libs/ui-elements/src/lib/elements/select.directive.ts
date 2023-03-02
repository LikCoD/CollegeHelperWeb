import {Directive, ElementRef} from "@angular/core"

@Directive({
  selector: "[uiSelect]"
})
export class SelectDirective {
  constructor(elRef: ElementRef<HTMLElement>) {
    elRef.nativeElement.classList.add("form-select")
  }
}
