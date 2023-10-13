import { ChangeDetectionStrategy, Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ScheduleService } from '@schedule/services/schedule.service';
import { Observable, tap } from 'rxjs';
import { ScheduleLesson, Schedule } from '@schedule/entities/schedule';
import { DistinctPipe } from '@shared/pipes/distinct.pipe';
import { DateTime } from 'luxon';
import { FlatMapPipe } from '@shared/pipes/flatMap.pipe';
import { MinPipe } from '@shared/pipes/min.pipe';
import { MaxPipe } from '@shared/pipes/max.pipe';
import { DateBetweenPipe } from '@shared/pipes/date-between.pipe';
import { TimePipe } from '@shared/pipes/time.pipe';
import { GroupByPipe } from '@shared/pipes/group-by.pipe';
import { ValuesPipe } from '@shared/pipes/values.pipe';
import { BaseScheduleService } from '@schedule/components/base-schedule/base-schedule.service';
import { ScheduleCellComponent } from '@schedule/components/schedule-cell/schedule-cell.component';
import { ScheduleCellPositionDirective } from '@schedule/components/base-schedule/schedule-cell-position.directive';

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
    GroupByPipe,
    ValuesPipe,
    ScheduleCellComponent,
    ScheduleCellPositionDirective,
  ],
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class BaseScheduleComponent implements OnInit {
  schedule$!: Observable<Schedule>;
  topOffset!: number;

  private scheduleService = inject(ScheduleService);
  private service = inject(BaseScheduleService);

  getCellTimeYPosition = this.service.getCellTimeYPosition.bind(this.service);

  get mode(): string {
    return this.scheduleService.mode;
  }

  ngOnInit(): void {
    this.schedule$ = this.scheduleService.schedule$.pipe(
      tap(s => {
        const time = s.lessons.flatMap(l => this.lessonTimes(l));
        this.topOffset = Math.min(...time.map(t => this.getCellTimeYPosition(t.toISOTime()!)));
      })
    );
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
