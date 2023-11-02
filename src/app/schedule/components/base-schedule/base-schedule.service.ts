import { inject, Injectable } from '@angular/core';
import { DateTime } from 'luxon';
import { ScheduleLesson } from '@schedule/entities/schedule';
import { ScheduleService } from '@schedule/services/schedule.service';

@Injectable({
  providedIn: 'root',
})
export class BaseScheduleService {

  private service = inject(ScheduleService);
  offset: number = 0;

  getCellIndexYPosition(index: number): number {
    return index * 130;
  };

  getCellTimeYPosition(isoTime: string, offset: number = 0): number {
    const date = DateTime.fromISO(isoTime);
    return this.getDateY(date) - offset;
  }

  getCellY(value: ScheduleLesson[]): number {
    return this.service.mode$.value === 'time' ? this.getDateY(value[0].startDate) - this.offset : this.getIndexY(value[0].lessonIndex);
  }

  getCellX(value: ScheduleLesson[], start: DateTime): number {
    return this.getDateX(value[0].startDate, start);
  }

  getCellHeight(value: ScheduleLesson[]): number {
    return this.getDateY(value[0].endDate) - this.getDateY(value[0].startDate);
  }

  private getDateY(date: DateTime): number {
    return (date.hour * 60 + date.minute) * 2.25;
  }

  private getIndexY(i: number): number {
    return i * 130 + 10;
  }

  private getDateX(date: DateTime, start: DateTime): number {
    return Math.floor(date.diff(start, 'day').days) + 1;
  }
}
