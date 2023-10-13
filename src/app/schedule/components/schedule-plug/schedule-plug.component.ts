import { ChangeDetectionStrategy, Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SkeletonLoaderComponent } from '@shared/components/skeleton-loader/skeleton-loader.component';
import { HDividerComponent } from '@ui/dividers/h-divider.component';

@Component({
  selector: 'schedule-plug',
  standalone: true,
  imports: [CommonModule, SkeletonLoaderComponent, HDividerComponent],
  templateUrl: './schedule-plug.component.html',
  styleUrls: ['./schedule-plug.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class SchedulePlugComponent {

}
