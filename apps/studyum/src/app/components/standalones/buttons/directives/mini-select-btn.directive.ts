import {Directive, ElementRef, Input} from '@angular/core';

@Directive({
  selector: '[appMiniSelectBtn]'
})
export class MiniSelectBtnDirective {

  @Input() set appMiniSelectBtn(value: boolean) {
    this.el.nativeElement.classList.remove(!value ? 'btn-dark' : 'btn-outline-dark');
    this.el.nativeElement.classList.add(value ? 'btn-dark' : 'btn-outline-dark');
  };

  constructor(private el: ElementRef<HTMLButtonElement>) {
    el.nativeElement.style.width = '30px'
    el.nativeElement.style.height = '30px'
    el.nativeElement.style.padding = '0'
    el.nativeElement.style.margin = '0'
    el.nativeElement.style.alignItems = 'center'

    el.nativeElement.classList.add('btn', this.appMiniSelectBtn ? 'btn-dark' : 'btn-outline-dark');
  }
}
