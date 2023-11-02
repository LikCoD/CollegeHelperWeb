import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';

import { AppModule } from './app/app.module';

import 'zone.js/plugins/zone-error';

export const studyPlaceID = "6541ff439a77dc2b9df600fa" //todo move to env

platformBrowserDynamic().bootstrapModule(AppModule)
  .catch(err => console.error(err));
