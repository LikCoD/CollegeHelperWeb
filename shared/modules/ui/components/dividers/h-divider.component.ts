import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'h-divider',
  template: '',
  styles: [`
    :host {
      width: calc(100% - 6px);
      height: 2px;

      background-color: #FFFFFF;
      opacity: 0.2;
      border-radius: 1px;
      margin-right: 3px;
      margin-left: 3px;
    }
  `],
  imports: [CommonModule],
  standalone: true,
})
export class HDividerComponent {
}
