import { Component, inject, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { UserPreview } from '@jwt/jwt.models';
import { JwtService } from '@jwt/jwt.service';
import { CommonModule } from '@angular/common';
import { TextModule } from '@ui/text';
import { RouterModule } from '@angular/router';
import { ImagesModule } from '@ui/images';
import { DividersModule } from '@ui/dividers';
import { PrimaryContainerComponent } from '@shared/modules/ui/components/containers/primary-container.component';
import {
  provideTranslationSuffix,
  TranslateGroupPipe,
  TranslateNfGroupPipe,
  TranslatePipe,
} from 'i18n';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
  standalone: true,
  imports: [
    CommonModule,
    TextModule,
    RouterModule,
    ImagesModule,
    DividersModule,
    PrimaryContainerComponent,
    TranslateGroupPipe,
    TranslatePipe,
  ],
  providers: [provideTranslationSuffix('header')],
})
export class HeaderComponent implements OnInit {
  user$!: Observable<UserPreview | null>;

  private jwtService = inject(JwtService);

  ngOnInit(): void {
    this.user$ = this.jwtService.userPreview$;
  }
}
