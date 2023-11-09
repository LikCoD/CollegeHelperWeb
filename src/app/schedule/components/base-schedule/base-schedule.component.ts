import { ChangeDetectionStrategy, Component, inject, Input, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Observable } from 'rxjs';
import { Schedule, ScheduleLesson } from '@schedule/entities/schedule';
import { DistinctPipe } from '@shared/pipes/distinct.pipe';
import { FlatMapPipe } from '@shared/pipes/flatMap.pipe';
import { MinPipe } from '@shared/pipes/min.pipe';
import { MaxPipe } from '@shared/pipes/max.pipe';
import { DateBetweenPipe } from '@shared/pipes/date-between.pipe';
import { GroupByPipe } from '@shared/pipes/group-by.pipe';
import { ValuesPipe } from '@shared/pipes/values.pipe';
import { BaseScheduleService } from '@schedule/components/base-schedule/base-schedule.service';
import { ScheduleCellComponent } from '@schedule/components/schedule-cell/schedule-cell.component';
import { ScheduleCellPositionDirective } from '@schedule/components/base-schedule/schedule-cell-position.directive';
import { TimePipe } from '@shared/pipes/time.pipe';
import { DateTimePipe } from '@shared/pipes/datetime.pipe';
import { IModeCalculator } from '@schedule/components/base-schedule/mode-calculators/base-mode-calculator';
import { P1Component } from '@ui/text/p1.component';

@Component({
  selector: 'app-base-schedule',
  templateUrl: './base-schedule.component.html',
  styleUrls: ['./base-schedule.component.scss'],
  imports: [
    CommonModule,
    DistinctPipe,
    FlatMapPipe,
    MinPipe,
    MaxPipe,
    DateBetweenPipe,
    TimePipe,
    DateTimePipe,
    GroupByPipe,
    ValuesPipe,
    ScheduleCellComponent,
    ScheduleCellPositionDirective,
    P1Component,
  ],
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class BaseScheduleComponent implements OnInit {
  schedule!: Schedule;
  modeCalculator$!: Observable<IModeCalculator>;

  private service = inject(BaseScheduleService);

  @Input('data') set _schedule(s: Schedule) {
    this.schedule = s;
  }

  ngOnInit(): void {
    this.service.reset();
    this.modeCalculator$ = this.service.modeCalculator$;
  }

  groupLessonByTime(lesson: ScheduleLesson): string {
    return `${lesson.startDate.toISO()}-${lesson.endDate.toISO()}`;
  }
}
