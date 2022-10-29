import {Directive, ElementRef, Input} from "@angular/core"

@Directive({
  selector: '[appActionSelectBtn]'
})
export class ActionSelectBtnDirective {

  @Input() set appActionSelectBtn(value: boolean) {
    this.el.nativeElement.classList.remove(!value ? 'btn-light' : 'btn-outline-light');
    this.el.nativeElement.classList.add(value ? 'btn-light' : 'btn-outline-light');
  };

  constructor(private el: ElementRef<HTMLButtonElement>) {
    this.el.nativeElement.classList.add("btn")
  }

}
