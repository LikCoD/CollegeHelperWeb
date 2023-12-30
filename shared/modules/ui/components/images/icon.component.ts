import { Component, HostBinding, Input } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'icon',
  template: '<mat-icon [svgIcon]="svgIcon">{{matIcon}}</mat-icon>',
  styles: [
    `
      mat-icon {
        all: inherit;
        rotate: unset;
        padding: unset;
        margin: unset;
      }
    `,
  ],
  imports: [MatIconModule],
  standalone: true,
})
export class IconComponent {
  @Input({ required: true }) src!: string;
  @Input() isSVG: boolean = false;

  @HostBinding('class') class = ['material-icons', 'mat-icon'];

  get svgIcon(): string {
    return this.isSVG ? this.src : '';
  }

  get matIcon(): string {
    return this.isSVG ? '' : this.src;
  }
}
