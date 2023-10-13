import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'v-divider',
  template: '',
  styles: [`
    :host {
      width: 2px;
      height: calc(100% - 6px);

      background-color: #FFFFFF;
      opacity: 0.2;
      border-radius: 1px;

      margin-top: 3px;
      margin-bottom: 3px;
    }
  `],
  imports: [CommonModule],
  standalone: true,
})
export class VDividerComponent {
}
