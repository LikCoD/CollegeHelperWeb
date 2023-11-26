import { Component, Input } from '@angular/core';
import { TranslatePipe } from 'i18n';

@Component({
  selector: 'translate',
  template: `{{ key | translate }}`,
  standalone: true,
  imports: [TranslatePipe],
})
export class TranslateComponent {
  @Input() key: string = '';
}
