import { Component, Input } from '@angular/core';
import { TranslateComponent } from '../../utils/translate/translate.component';
import { RouterLink } from '@angular/router';
import { TranslatePipe } from 'i18n';

@Component({
  selector: 'url',
  template: '<a [routerLink]="link"><ng-content></ng-content>{{key | translate}}</a>',
  styles: [
    `
      :host {
        cursor: pointer;
      }

      a {
        all: inherit;
        padding: 0;
        margin: 0;
      }
    `,
  ],
  imports: [RouterLink, TranslatePipe],
  standalone: true,
})
export class UrlComponent extends TranslateComponent {
  @Input({ required: true }) link!: string;
}
