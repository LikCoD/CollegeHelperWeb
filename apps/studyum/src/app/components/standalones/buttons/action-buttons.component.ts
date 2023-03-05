import {Component, EventEmitter, Input, Output} from "@angular/core"

@Component({
  selector: "app-action-buttons",
  template: `
    <ng-content></ng-content>
    <button
      *ngFor="let btn of buttons"
      [uiToggleDarkButton]="btn == this.selectedButton && !!selectedText"
      [text]="btn!.toString()"
      [selectedText]="selectedText!"
      (click)="action.emit(btn)"
    ></button>
  `,
  styles: [":host {display: flex}"],
})
export class ActionButtonsComponent<T> {
  @Input() buttons: T[]
  @Input() selectedButton?: T
  @Input() selectedText?: string

  @Output() action = new EventEmitter<T>()
}
