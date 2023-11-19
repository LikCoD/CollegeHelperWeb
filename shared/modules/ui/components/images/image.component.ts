import { Component, Input } from '@angular/core';

import { TranslateModule } from '@ngx-translate/core';

@Component({
  selector: 'image',
  template: '<img [src]="source" [alt]="alt | translate">',
  styles: [
    `
      img {
        all: inherit;
        overflow: hidden;
        width: 100%;
        height: 100%;
        margin: unset;
        padding: unset;
        border: unset;
      }
    `,
  ],
  imports: [TranslateModule],
  standalone: true,
})
export class ImageComponent {
  @Input({ required: true }) src!: string;
  @Input() alt!: string;

  get source(): string {
    return this.src.startsWith('http') ? this.src : `assets/${this.src}`;
  }
}
