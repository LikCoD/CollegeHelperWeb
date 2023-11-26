import 'zone.js/plugins/zone-error';
import { bootstrapApplication } from '@angular/platform-browser';
import { AppComponent } from './app/app.component';
import { provideAnimations } from '@angular/platform-browser/animations';
import { provideRouter } from '@angular/router';
import { routes } from './routes';
import { provideEnvironmentNgxMask } from 'ngx-mask';
import { provideHttpClient, withInterceptors } from '@angular/common/http';
import { jwtInterceptor } from '@jwt/jwt.interceptor';
import { APP_INITIALIZER } from '@angular/core';
import { PreferencesService } from '@shared/services/preferences.service';
import { KeypressService } from '@shared/services/keypress.service';
import {
  LuxonDateAdapter,
  MAT_LUXON_DATE_ADAPTER_OPTIONS,
  MAT_LUXON_DATE_FORMATS,
} from '@angular/material-luxon-adapter';
import { DateAdapter, MAT_DATE_FORMATS, MAT_DATE_LOCALE } from '@angular/material/core';
import { provideI18nHttpLoader, Translation } from 'i18n';

bootstrapApplication(AppComponent, {
  providers: [
    provideI18nHttpLoader('api/v1/i18n/{{locale}}/{{group}}', {
      transform: (value: { translation: Translation }) => value.translation,
    }),
    provideAnimations(),
    provideRouter(routes),
    provideEnvironmentNgxMask(),
    provideHttpClient(withInterceptors([jwtInterceptor])),
    {
      provide: DateAdapter,
      useClass: LuxonDateAdapter,
      deps: [MAT_DATE_LOCALE, MAT_LUXON_DATE_ADAPTER_OPTIONS],
    },
    {
      provide: MAT_DATE_FORMATS,
      useValue: MAT_LUXON_DATE_FORMATS,
    },
    {
      provide: APP_INITIALIZER,
      multi: true,
      useFactory: (s: PreferencesService) => () => s,
      deps: [PreferencesService],
    },
    {
      provide: APP_INITIALIZER,
      multi: true,
      useFactory: (s: KeypressService) => () => s,
      deps: [KeypressService],
    },
  ],
}).catch(err => console.error(err));
