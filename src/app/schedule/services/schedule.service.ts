import { inject, Injectable } from '@angular/core';
import { BehaviorSubject, Observable, tap } from 'rxjs';
import {
  GeneralSchedule,
  GeneralScheduleSchema,
  Schedule,
  ScheduleGeneralLesson,
  ScheduleLesson,
  ScheduleSchema,
} from '@schedule/entities/schedule';
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
  private _schedule$ = new BehaviorSubject<Schedule | GeneralSchedule | null>(null);

  get schedule$(): Observable<Schedule | GeneralSchedule> {
    return this._schedule$.pipe(filterNotNull());
  }

  get schedule(): Schedule | GeneralSchedule | null {
    return this._schedule$.value;
  }

  get lessons(): (ScheduleLesson | ScheduleGeneralLesson)[] {
    return this._schedule$.value?.lessons ?? [];
  }

  set lessons(lessons: (ScheduleLesson | ScheduleGeneralLesson)[]) {
    if (!this.schedule) return;
    const schedule = this.schedule;
    schedule.lessons = lessons as any;
    this._schedule$.next(schedule);
  }

  getSchedule(dto: GetScheduleDTO): Observable<Schedule> {
    return this.http
      .get<Schedule>('api/v1/schedule', { params: dto ?? {} })
      .pipe(validate(ScheduleSchema))
      .pipe(tap(s => this._schedule$.next(s)));
  }

  getGeneralSchedule(dto: GetScheduleDTO): Observable<GeneralSchedule> {
    return this.http
      .get<GeneralSchedule>('api/v1/schedule/general', { params: dto ?? {} })
      .pipe(validate(GeneralScheduleSchema))
      .pipe(tap(s => this._schedule$.next(s)));
  }
}
