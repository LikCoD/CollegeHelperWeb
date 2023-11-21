import { Component } from '@angular/core';

import { MatButtonModule } from '@angular/material/button';
import { TranslateComponent } from '@shared/modules/ui/utils/translate/translate.component';
import { TranslateModule } from '@ngx-translate/core';

@Component({
  selector: 'warn-button',
  template:
    '<button color="warn" mat-flat-button><ng-content></ng-content>{{key | translate}}</button>',
  styles: [
    `
      button {
        width: 100%;
        height: 100%;
      }
    `,
  ],
  imports: [MatButtonModule, TranslateModule],
  standalone: true,
})
export class WarnButtonComponent extends TranslateComponent {}
