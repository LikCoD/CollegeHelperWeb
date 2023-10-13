import { Component } from '@angular/core';
import { TranslateComponent } from '../../utils/translate/translate.component';
import { TranslateModule } from '@ngx-translate/core';

@Component({
  selector: 'head2',
  template: '<ng-content></ng-content>{{key | translate}}',
  styles: [`
    :host {
      font-size: 26px;
      font-weight: 600;
    }
  `],
  imports: [TranslateModule],
  standalone: true,
})
export class Head2Component extends TranslateComponent {
}
