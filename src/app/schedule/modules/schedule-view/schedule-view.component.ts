import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { Schedule } from '@schedule/entities/schedule';

@Component({
  selector: 'app-schedule-view',
  templateUrl: './schedule-view.component.html',
  styleUrls: ['./schedule-view.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ScheduleViewComponent {
  @Input({ required: true }) data!: Schedule;
}
