import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent {

  cards: { title: string, url: string, route: string }[] = [
    { title: 'header.schedule', url: 'assets/schedule-gray.svg', route: 'schedule' },
    { title: 'header.findSchedule', url: 'assets/search-schedule-gray.svg', route: 'schedule/login' },
    { title: 'header.journal', url: 'assets/journal-gray.svg', route: 'journal' }
  ];

}
