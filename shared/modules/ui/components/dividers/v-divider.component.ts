import { Component } from '@angular/core';

@Component({
  selector: 'v-divider',
  template: '',
  styles: [
    `
      :host {
        width: 2px;
        height: calc(100% - var(--divider-margin, 3px) * 2);

        background-color: #ffffff;
        opacity: 0.2;
        border-radius: 1px;

        margin-top: var(--divider-margin, 3px);
        margin-bottom: var(--divider-margin, 3px);
      }
    `,
  ],
  imports: [],
  standalone: true,
})
export class VDividerComponent {}
