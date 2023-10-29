import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'v-divider',
  template: '',
  styles: [`
    :host {
      width: 2px;
      height: calc(100% - var(--divider-margin, 3px) * 2);

      background-color: #FFFFFF;
      opacity: 0.2;
      border-radius: 1px;

      margin-top: var(--divider-margin, 3px);
      margin-bottom: var(--divider-margin, 3px);
    }
  `],
  imports: [CommonModule],
  standalone: true,
})
export class VDividerComponent {
}
