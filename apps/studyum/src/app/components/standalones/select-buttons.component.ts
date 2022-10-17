import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-select-buttons',
  template: `
    <button
      *ngFor='let btn of buttons'
      [appMiniSelectBtn]='log(btn)'
      (click)='select.emit(btn)'
    >{{(btn == selectedButton && selectedText) ? selectedText : btn}}</button>
  `,
})
export class SelectButtonsComponent<T>{
  @Input() buttons: T[]
  @Input() selectedButton?: T
  @Input() selectedText?: string

  @Output() select = new EventEmitter<T>()

  log(btn: T) {
    return btn == this.selectedButton
  }
}
