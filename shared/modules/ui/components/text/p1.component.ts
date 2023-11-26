import { Component } from '@angular/core';
import { TranslateComponent } from '../../utils/translate/translate.component';
import { TranslatePipe } from 'i18n';

@Component({
  selector: 'p1',
  template: '<ng-content></ng-content>{{key | translate}}',
  styles: [
    `
      :host {
        font-size: 16px;
        font-weight: 400;
      }
    `,
  ],
  imports: [TranslatePipe],
  standalone: true,
})
export class P1Component extends TranslateComponent {}
