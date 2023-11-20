import { Component } from '@angular/core';
import { HeaderComponent } from '@shared/components/header/header.component';
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  imports: [HeaderComponent, RouterOutlet],
  standalone: true,
})
export class AppComponent {}
