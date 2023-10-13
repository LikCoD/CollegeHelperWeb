import { Component, Input } from '@angular/core';
import { TranslateModule } from '@ngx-translate/core';

@Component({
  selector: 'translate',
  template: `{{key | translate}}`,
  standalone: true,
  imports: [TranslateModule],
})
export class TranslateComponent {
  //todo move translate logic to the custom provider
  @Input() key: string = '';
}
