import {Component, EventEmitter, Input, Output} from "@angular/core"

@Component({
  selector: "app-select-buttons",
  template: `
    <ng-content></ng-content>
    <button
      *ngFor="let btn of buttons"
      [uiToggleDarkButton]="btn == this.selectedButton"
      [text]="btn!.toString()"
      [selectedText]="selectedButton!.toString()"
      (click)="action.emit(btn)"
    ></button>
  `,
  styles: [
    `
      button {
        width: 30px;
        height: 30px;
        padding: 0;
        margin: 0;
        align-items: center;
      }
    `,
  ],
})
export class SelectButtonsComponent<T> {
  @Input() buttons: T[]
  @Input() selectedButton?: T
  @Input() selectedText?: string

  @Output() action = new EventEmitter<T>()
}
