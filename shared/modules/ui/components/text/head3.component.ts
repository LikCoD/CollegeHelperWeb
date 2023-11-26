import { Component } from '@angular/core';
import { TranslateComponent } from '../../utils/translate/translate.component';
import { TranslatePipe } from 'i18n';

@Component({
  selector: 'head3',
  template: '<ng-content></ng-content>{{key | translate}}',
  styles: [
    `
      :host {
        font-size: 22px;
        font-weight: 600;
      }
    `,
  ],
  imports: [TranslatePipe],
  standalone: true,
})
export class Head3Component extends TranslateComponent {}
