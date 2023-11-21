import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'container-secondary',
  standalone: true,
  template: ` <ng-content></ng-content>`,
  styleUrl: './secondary-container.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SecondaryContainerComponent {}
