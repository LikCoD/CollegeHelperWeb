import { Component, inject, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { UserPreview } from '@jwt/jwt.models';
import { JwtService } from '@jwt/jwt.service';
import { CommonModule } from '@angular/common';
import { TextModule } from '@ui/text';
import { RouterModule } from '@angular/router';
import { ImagesModule } from '@ui/images';
import { DividersModule } from '@ui/dividers';
import { TranslateModule } from '@ngx-translate/core';
import { translatePrefixProvider } from '@translate/translate.prefix-provider';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
  standalone: true,
  imports: [CommonModule, TextModule, RouterModule, TranslateModule, ImagesModule, DividersModule],
  providers: [translatePrefixProvider('header')],
})
export class HeaderComponent implements OnInit {
  user$!: Observable<UserPreview | null>;

  private jwtService = inject(JwtService);

  ngOnInit(): void {
    this.user$ = this.jwtService.userPreview$;
  }
}
