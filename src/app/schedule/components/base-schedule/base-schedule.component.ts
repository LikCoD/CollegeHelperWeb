import { ChangeDetectionStrategy, Component, inject, Input, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ScheduleMode, ScheduleService } from '@schedule/services/schedule.service';
import { Observable } from 'rxjs';
import { ScheduleLesson, Schedule } from '@schedule/entities/schedule';
import { DistinctPipe } from '@shared/pipes/distinct.pipe';
import { DateTime } from 'luxon';
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
  ],
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class BaseScheduleComponent implements OnInit {
  schedule!: Schedule;

  @Input('data') set _schedule(s: Schedule) {
    this.schedule = s;
    const time = s.lessons.flatMap(l => this.lessonTimes(l));
    this.topOffset = Math.min(...time.map(t => this.getCellTimeYPosition(t.toISOTime()!)));
    this.service.offset = this.topOffset;
  };

  mode$!: Observable<ScheduleMode>;
  topOffset!: number;

  private scheduleService = inject(ScheduleService);
  private service = inject(BaseScheduleService);

  getCellTimeYPosition = this.service.getCellTimeYPosition.bind(this.service);
  getCellIndexYPosition = this.service.getCellIndexYPosition.bind(this.service);

  ngOnInit(): void {
    this.mode$ = this.scheduleService.mode$;
  }

  lessonTimes(lesson: ScheduleLesson): DateTime[] {
    return [lesson.startDate, lesson.endDate];
  }

  distinctDateTime(time: DateTime): string | null {
    return time.toISOTime();
  }

  groupLessonByTime(lesson: ScheduleLesson): string {
    return `${lesson.startDate.toISO()}-${lesson.endDate.toISO()}`;
  }
}
