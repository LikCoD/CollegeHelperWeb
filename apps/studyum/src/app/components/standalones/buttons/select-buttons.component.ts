import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-select-buttons',
  template: `
    <ng-content></ng-content>
    <button
      *ngFor="let btn of buttons"
      [appMiniSelectBtn]="btn == this.selectedButton"
      (click)="action.emit(btn)"
    >{{(btn == selectedButton && selectedText) ? selectedText : btn}}</button>
  `,
})
export class SelectButtonsComponent<T>{
  @Input() buttons: T[]
  @Input() selectedButton?: T
  @Input() selectedText?: string

  @Output() action = new EventEmitter<T>()
}
