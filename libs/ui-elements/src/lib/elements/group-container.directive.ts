import {Directive, ElementRef} from "@angular/core"

@Directive({
  selector: "[uiGroupContainer]",
})
export class GroupContainerDirective {
  constructor(elRef: ElementRef<HTMLElement>) {
    elRef.nativeElement.classList.add("input-group")
  }
}
