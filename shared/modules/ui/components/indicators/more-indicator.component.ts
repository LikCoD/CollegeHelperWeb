import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'ui-more-indicator',
  standalone: true,
  imports: [CommonModule],
  template: '{{amount}}',
  styles: [
    `
      @import 'themes';
      @import 'indents';

      :host {
        display: grid;
        place-items: center;
        width: $indent4;
        height: $indent4;
        border-radius: 50%;
        scale: 0.7;
        transition: scale 0.1s ease-in;

        @include theme {
          background-color: $secondaryColor;
          color: $onSecondaryColor;
        }
      }
    `,
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MoreIndicatorComponent {
  @Input() amount: number | null = null;
}
