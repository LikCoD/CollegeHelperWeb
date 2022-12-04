import {Component, Input} from "@angular/core"

@Component({
  selector: "app-more-indicator",
  template: `<p *ngIf="amount" [innerText]="amount"></p>`,
  styles: [`
      @use '../../../styles';

      :host {
          position: absolute;

          aspect-ratio: 1 / 1;

          min-height: 7px;

          height: fit-content;
          width: fit-content;
          background-color: styles.$secondaryColor;
          border-radius: 50%;
      }

      p {
        display: grid;
        place-items: center;

        font-size: 14px;
        line-height: 16px;

        aspect-ratio: 1/1;
        min-height: 16px;

        color: white;
      }
  `]
})
export class MoreIndicatorComponent {
  @Input() amount: number | null = null
}
