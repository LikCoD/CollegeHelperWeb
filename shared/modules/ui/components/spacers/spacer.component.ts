import { ChangeDetectionStrategy, Component, HostBinding, Input } from '@angular/core';

@Component({
  selector: 'spacer',
  standalone: true,
  imports: [],
  template: ``,
  styles: [
    `
      :host {
        display: block;
      }
    `,
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SpacerComponent {
  @HostBinding('style.flex-grow')
  @Input()
  weight: number = 1;
}
