import {Directive, ElementRef, Input} from "@angular/core"

@Directive({
  selector: "[appActionSelectBtn]"
})
export class ActionSelectBtnDirective {

  constructor(private el: ElementRef<HTMLButtonElement>) {
    this.el.nativeElement.classList.add("btn")
  }

  @Input() set appActionSelectBtn(value: boolean | string) {
    if (typeof value == "string") value = false

    this.el.nativeElement.classList.remove(!value ? "btn-light" : "btn-outline-light")
    this.el.nativeElement.classList.add(value ? "btn-light" : "btn-outline-light")
  };

}
