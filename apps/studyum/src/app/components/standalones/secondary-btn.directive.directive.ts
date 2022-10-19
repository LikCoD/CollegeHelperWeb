import { Directive, ElementRef } from "@angular/core"

@Directive({
  selector: "[appSecondaryBtnDirective]"
})
export class SecondaryBtnDirectiveDirective {

  constructor(private el: ElementRef<HTMLButtonElement>) {
    el.nativeElement.classList.add("btn", "btn-outline-secondary")
  }

}
