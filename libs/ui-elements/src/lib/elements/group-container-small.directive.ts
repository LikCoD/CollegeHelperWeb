import {Directive, ElementRef} from "@angular/core"

@Directive({
  selector: "[uiGroupContainerSmall]",
})
export class GroupContainerSmallDirective {
  constructor(elRef: ElementRef<HTMLElement>) {
    elRef.nativeElement.classList.add("input-group-sm")
  }
}
