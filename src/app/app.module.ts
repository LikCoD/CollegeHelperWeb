import { APP_INITIALIZER, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppComponent } from './app.component';
import { HttpClientModule, provideHttpClient, withInterceptors } from '@angular/common/http';
import { RouterModule } from '@angular/router';
import { routes } from './app.routes';
import { HeaderComponent } from '@shared/components/header/header.component';
import { TranslateModule } from '@translate/translate.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { jwtInterceptor } from '@jwt/jwt.interceptor';
import { MatLuxonDateModule } from '@angular/material-luxon-adapter';
import { MatDialogModule } from '@angular/material/dialog';
import { MatTooltipModule } from '@angular/material/tooltip';
import { PreferencesService } from '@shared/services/preferences.service';
import { provideEnvironmentNgxMask } from 'ngx-mask';

@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    RouterModule.forRoot(routes),
    HttpClientModule,
    HeaderComponent,
    TranslateModule.http('api/v1/i18n', 'en_us'),
    MatLuxonDateModule,
    MatDialogModule,
    MatTooltipModule,
  ],
  providers: [
    provideEnvironmentNgxMask(),
    provideHttpClient(withInterceptors([jwtInterceptor])),
    {
      provide: APP_INITIALIZER,
      multi: true,
      useFactory: (s: PreferencesService) => () => s,
      deps: [PreferencesService],
    },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
