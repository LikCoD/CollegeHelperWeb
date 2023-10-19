import { Component } from '@angular/core';
import { translatePrefixProvider } from '@translate/translate.prefix-provider';

@Component({
  selector: 'app-home',
  template: '<home-dashboard/>',
  styles: [],
  providers: [translatePrefixProvider('home')]
})
export class HomeComponent {

}
