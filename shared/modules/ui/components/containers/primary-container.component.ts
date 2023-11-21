import { ChangeDetectionStrategy, Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'container-primary',
  standalone: true,
  template: ` <ng-content></ng-content>`,
  styleUrl: './primary-container.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PrimaryContainerComponent {}
