import {Component, EventEmitter, HostBinding, Input, Output} from "@angular/core"

@Component({
  selector: 'app-action-buttons',
  template: `
    <ng-content></ng-content>
    <button
      *ngFor="let btn of buttons"
      [appActionSelectBtn]="btn == this.selectedButton"
      (click)="action.emit(btn)"
    >{{(btn == selectedButton && selectedText) ? selectedText : btn}}</button>
  `,
  styles: [":host {display: flex}"],
})
export class ActionButtonsComponent<T>{
  @Input() buttons: T[]
  @Input() selectedButton?: T
  @Input() selectedText?: string

  @Output() action = new EventEmitter<T>()
}
