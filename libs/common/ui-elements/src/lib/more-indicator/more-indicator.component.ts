import {Component, Input} from "@angular/core"

@Component({
  selector: "ui-more-indicator",
  template: '<p *ngIf="amount" [innerText]="amount"></p>',
  styleUrls: ["./more-indicator.component.scss"],
})
export class MoreIndicatorComponent {
  @Input() amount: number
}
