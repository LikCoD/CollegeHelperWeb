import { Directive, ElementRef } from "@angular/core"

@Directive({
  selector: "[appSecondaryBtnDirective]"
})
export class SecondaryBtnDirective {

  constructor(private el: ElementRef<HTMLButtonElement>) {
    el.nativeElement.classList.add("btn", "btn-outline-secondary")
  }

}
