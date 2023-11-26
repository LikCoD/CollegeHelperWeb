import { ChangeDetectionStrategy, Component } from '@angular/core';
import { HeaderComponent } from '@shared/components/header/header.component';
import { RouterOutlet } from '@angular/router';
import {
  TranslateGroupPipe,
  TranslateNfGroupPipe,
  TranslatePipe,
  TranslatePrefixPipe,
  TranslateSuffixPipe,
} from 'i18n';
import { JsonPipe } from '@angular/common';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  imports: [
    HeaderComponent,
    RouterOutlet,
    TranslatePipe,
    TranslatePrefixPipe,
    JsonPipe,
    TranslateSuffixPipe,
    TranslateNfGroupPipe,
    TranslateGroupPipe,
  ],
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AppComponent {}
