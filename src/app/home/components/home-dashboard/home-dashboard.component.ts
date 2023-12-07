import { ChangeDetectionStrategy, Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CharacterComponent } from '@ui/images/character.component';
import { HomeDashboardNavCardComponent } from '@home/components/home-dashboard-nav-card/home-dashboard-nav-card.component';
import { Head2Component } from '@ui/text/head2.component';
import { HomeDashboardChartComponent } from '@home/components/home-dashboard-chart/home-dashboard-chart.component';
import { Observable } from 'rxjs';
import { UserPreview } from '@jwt/jwt.models';
import { JwtService } from '@jwt/jwt.service';
import { RouterLink } from '@angular/router';
import { P1Component } from '@ui/text/p1.component';
import { UrlComponent } from '@ui/text/url.component';
import { Head4Component } from '@ui/text/head4.component';
import { HDividerComponent } from '@ui/dividers/h-divider.component';
import { PrimaryContainerComponent } from '@shared/modules/ui/components/containers/primary-container.component';

@Component({
  selector: 'home-dashboard',
  standalone: true,
  imports: [
    CommonModule,
    CharacterComponent,
    HomeDashboardNavCardComponent,
    Head2Component,
    HomeDashboardChartComponent,
    RouterLink,
    P1Component,
    UrlComponent,
    Head4Component,
    HDividerComponent,
    PrimaryContainerComponent,
  ],
  templateUrl: './home-dashboard.component.html',
  styleUrls: ['./home-dashboard.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HomeDashboardComponent implements OnInit {
  user$!: Observable<UserPreview | null>;

  private jwtService = inject(JwtService);

  ngOnInit(): void {
    this.user$ = this.jwtService.userPreview$;
  }
}
