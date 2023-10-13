import { Component, Input } from '@angular/core';
import { TranslateComponent } from '../../utils/translate/translate.component';
import { TranslateModule } from '@ngx-translate/core';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'url',
  template: '<a [routerLink]="link"><ng-content></ng-content>{{key | translate}}</a>',
  styles: [`
    a {
      all: inherit;
      padding: 0;
      margin: 0;
    }
  `],
  imports: [TranslateModule, RouterLink],
  standalone: true,
})
export class UrlComponent extends TranslateComponent {
  @Input({ required: true }) link!: string;
}
