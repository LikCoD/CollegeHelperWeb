import { Component } from '@angular/core';

@Component({
  selector: 'app-home',
  template: `
    Test home
  `,
  styles: [`:host {
    display: block;
    width: 100%;
    height: 400px;
    background-color: #4318FF;
  }`],
})
export class HomeComponent {

}
