import { Component } from '@angular/core';
import { provideTranslationSuffix } from 'i18n';

@Component({
  selector: 'app-home',
  template: '<home-dashboard/>',
  styles: [],
  providers: [provideTranslationSuffix('home')],
})
export class HomeComponent {}
