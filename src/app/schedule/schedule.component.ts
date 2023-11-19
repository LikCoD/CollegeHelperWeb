import { ChangeDetectionStrategy, Component, inject, OnDestroy, OnInit } from '@angular/core';
import { map, merge, Observable, pipe, Subscription, switchMap, tap } from 'rxjs';
import { ScheduleService } from '@schedule/services/schedule.service';
import { ActivatedRoute } from '@angular/router';
import { GetScheduleDTO } from '@schedule/entities/schedule.dto';
import { StudyPlacesService } from '@shared/services/study-places.service';
import { JwtService } from '@jwt/jwt.service';
import { Schedule } from '@schedule/entities/schedule';
import { State, useState } from 'state-mapper';
import { SchedulePlugComponent } from '@schedule/modules/schedule-view/components/schedule-plug/schedule-plug.component';

@Component({
  selector: 'app-schedule',
  templateUrl: './schedule.component.html',
  styleUrls: ['./schedule.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ScheduleComponent implements OnInit, OnDestroy {
  schedule$!: Observable<State<Schedule | null>>;

  private jwtService = inject(JwtService);
  private service = inject(ScheduleService);
  private route = inject(ActivatedRoute);
  private studyPlaceService = inject(StudyPlacesService);

  private navigateSubscription: Subscription | null = null;

  ngOnInit(): void {
    const schedule$ = merge(this.route.params, this.route.queryParams, this.service.display$).pipe(
      useState(
        pipe(
          map(this.parseParams.bind(this)),
          map(p => p ?? (this.jwtService.data ? null : this.getParamsFromStorage())),
          tap(p => this.saveParamsToStorage(p)),
          switchMap(p => this.service.getSchedule(p)),
          map(s => (s?.lessons ? s : null)),
          tap({ error: () => this.removeParamsFromStorage() })
        )
      )
    );

    this.schedule$ = merge(
      schedule$,
      this.service.schedule$.pipe(
        map(
          s =>
            <State<Schedule>>{
              state: 'loaded',
              data: s,
            }
        )
      )
    );
  }

  ngOnDestroy(): void {
    this.navigateSubscription?.unsubscribe();
  }

  private getParamsFromStorage(): GetScheduleDTO {
    const params = JSON.parse(localStorage.getItem('schedule') ?? 'null');
    params['general'] = this.service.display$.value === 'general';
    return params;
  }

  private saveParamsToStorage(p: GetScheduleDTO): void {
    localStorage.setItem('schedule', JSON.stringify(p));
  }

  private removeParamsFromStorage(): void {
    localStorage.removeItem('schedule');
  }

  private parseParams(): GetScheduleDTO {
    const type = this.route.snapshot.params['type'];
    const typename = this.route.snapshot.params['typename'];
    const studyPlaceID = this.studyPlaceService.currentID;
    const startDate = this.route.snapshot.queryParams['startDate'];
    const endDate = this.route.snapshot.queryParams['endDate'];

    if (!type || !typename) return null;

    return {
      type: type,
      typename: typename,
      studyPlaceID: studyPlaceID!,
      startDate: startDate,
      endDate: endDate,
      general: this.service.display$.value === 'general',
    };
  }

  protected readonly SchedulePlugComponent = SchedulePlugComponent;
}
