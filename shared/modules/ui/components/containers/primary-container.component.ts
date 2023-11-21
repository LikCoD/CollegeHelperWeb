import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'container-primary',
  standalone: true,
  template: ` <ng-content></ng-content>`,
  styleUrl: './primary-container.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PrimaryContainerComponent {}
