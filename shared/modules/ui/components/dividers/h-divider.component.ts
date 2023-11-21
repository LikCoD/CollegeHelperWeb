import { Component } from '@angular/core';

@Component({
  selector: 'h-divider',
  template: '',
  styles: [
    `
      :host {
        width: calc(100% - 6px);
        height: 2px;

        background-color: #ffffff;
        opacity: 0.2;
        border-radius: 1px;
        margin-right: 3px;
        margin-left: 3px;
      }
    `,
  ],
  imports: [],
  standalone: true,
})
export class HDividerComponent {}
