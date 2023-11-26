import { Component } from '@angular/core';
import { TranslateComponent } from '../../utils/translate/translate.component';
import { TranslatePipe } from 'i18n';

@Component({
  selector: 'head4',
  template: '<ng-content></ng-content>{{key | translate}}',
  styles: [
    `
      :host {
        font-size: 18px;
        font-weight: 600;
      }
    `,
  ],
  imports: [TranslatePipe],
  standalone: true,
})
export class Head4Component extends TranslateComponent {}
