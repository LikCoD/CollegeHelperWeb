import { Component } from '@angular/core';
import { TranslateComponent } from '../../utils/translate/translate.component';
import { TranslateModule } from '@ngx-translate/core';

@Component({
  selector: 'p2',
  template: '<ng-content></ng-content>{{key | translate}}',
  styles: [`
    :host {
      font-size: 13px;
      font-weight: 400;
    }
  `],
  imports: [TranslateModule],
  standalone: true,
})
export class P2Component extends TranslateComponent {
}
