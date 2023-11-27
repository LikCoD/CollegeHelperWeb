import { ChangeDetectionStrategy, Component, inject, OnInit } from '@angular/core';
import { Schedule } from '@schedule/entities/schedule';
import { SchedulePlugComponent } from '@schedule/modules/schedule-view/components/schedule-plug/schedule-plug.component';
import { map, merge, Observable, pipe, switchMap, tap } from 'rxjs';
import { useState, State } from 'state-mapper';
import { ActivatedRoute } from '@angular/router';
import { GetScheduleDTO } from '@schedule/entities/schedule.dto';
import { JwtService } from '@jwt/jwt.service';
import { ScheduleService } from '@schedule/services/schedule.service';
import { StudyPlacesService } from '@shared/services/study-places.service';

@Component({
  selector: 'schedule-view',
  templateUrl: './schedule-view.component.html',
  styleUrls: ['./schedule-view.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ScheduleViewComponent implements OnInit {
  schedule$!: Observable<State<Schedule | null>>;

  protected readonly SchedulePlugComponent = SchedulePlugComponent;

  private route = inject(ActivatedRoute);
  private jwtService = inject(JwtService);
  private service = inject(ScheduleService);
  private studyPlaceService = inject(StudyPlacesService);

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
    const typeID = this.route.snapshot.params['typeID'];
    const studyPlaceID = this.studyPlaceService.currentID;
    const startDate = this.route.snapshot.queryParams['startDate'];
    const endDate = this.route.snapshot.queryParams['endDate'];

    if (!type || !typeID) return null;

    return {
      type: type,
      typeID: typeID,
      studyPlaceID: studyPlaceID!,
      startDate: startDate,
      endDate: endDate,
      general: this.service.display$.value === 'general',
    };
  }
}
