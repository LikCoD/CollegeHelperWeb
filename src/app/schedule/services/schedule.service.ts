import { inject, Injectable } from '@angular/core';
import { BehaviorSubject, Observable, tap } from 'rxjs';
import { Schedule, ScheduleSchema } from '@schedule/entities/schedule';
import { HttpClient } from '@angular/common/http';
import { validate } from '@shared/rxjs/pipes/validate';
import { GetScheduleDTO } from '@schedule/entities/schedule.dto';
import { filterNotNull } from '@shared/rxjs/pipes/filterNotNull.pipe';
import { ToggleSubject } from '@shared/rxjs/subjects/toggle.subject';

export type ScheduleMode = 'time' | 'table' | 'table-expanded';
export type ScheduleDisplay = 'current' | 'general';

@Injectable({ providedIn: 'root' })
export class ScheduleService {
  mode$ = new ToggleSubject<ScheduleMode>(['time', 'table', 'table-expanded'], 'table');
  display$ = new ToggleSubject<ScheduleDisplay>(['current', 'general']);

  private http = inject(HttpClient);
  private _schedule$ = new BehaviorSubject<Schedule | null>(null);

  get schedule$(): Observable<Schedule> {
    return this._schedule$.pipe(filterNotNull());
  }

  get schedule(): Schedule | null {
    return this._schedule$.value;
  }

  getSchedule(dto: GetScheduleDTO): Observable<Schedule> {
    return this.http
      .get<Schedule>('api/v1/schedule', { params: dto ?? {} })
      .pipe(validate(ScheduleSchema))
      .pipe(tap(s => (s.info.indexes = [...new Set(s.lessons?.map(l => l.lessonIndex))])))
      .pipe(tap(s => this._schedule$.next(s)));
  }
}
