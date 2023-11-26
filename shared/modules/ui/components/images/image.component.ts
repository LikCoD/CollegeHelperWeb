import { Component, Input } from '@angular/core';
import { TranslatePipe } from 'i18n';

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
  imports: [TranslatePipe],
  standalone: true,
})
export class ImageComponent {
  @Input({ required: true }) src!: string;
  @Input() alt!: string;

  get source(): string {
    return this.src.startsWith('http') ? this.src : `assets/${this.src}`;
  }
}
