import { ChangeDetectionStrategy, Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { P1Component } from '@ui/text/p1.component';

@Component({
  selector: 'home-dashboard-chart',
  standalone: true,
  imports: [CommonModule, P1Component],
  templateUrl: './home-dashboard-chart.component.html',
  styleUrls: ['./home-dashboard-chart.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HomeDashboardChartComponent {}
