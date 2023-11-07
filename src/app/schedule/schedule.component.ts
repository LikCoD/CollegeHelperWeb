import { ChangeDetectionStrategy, Component, inject, OnDestroy, OnInit } from '@angular/core';
import { map, merge, Observable, of, pipe, Subscription, switchMap, tap } from 'rxjs';
import { SchedulePlugComponent } from '@schedule/components/schedule-plug/schedule-plug.component';
import { ScheduleService } from '@schedule/services/schedule.service';
import { ActivatedRoute } from '@angular/router';
import { GetScheduleDTO } from '@schedule/entities/schedule.dto';
import { StudyPlacesService } from '@shared/services/study-places.service';
import { BaseScheduleComponent } from '@schedule/components/base-schedule/base-schedule.component';
import { JwtService } from '@jwt/jwt.service';
import { plugState } from '@shared/rxjs/pipes/plugState.pipe';
import { Pluggable } from '@shared/components/plugable/pluggable.entites';
import { Schedule } from '@schedule/entities/schedule';

@Component({
  selector: 'app-schedule',
  templateUrl: './schedule.component.html',
  styleUrls: ['./schedule.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ScheduleComponent implements OnInit, OnDestroy {
  schedule$!: Observable<Pluggable<Schedule | null>>;

  protected readonly SchedulePlugComponent = SchedulePlugComponent;
  protected readonly BaseScheduleComponent = BaseScheduleComponent;

  private navigateSubscription: Subscription | null = null;
  private jwtService = inject(JwtService);
  private service = inject(ScheduleService);
  private route = inject(ActivatedRoute);
  private studyPlaceService = inject(StudyPlacesService);

  ngOnInit(): void {
    this.schedule$ = merge(this.route.params, this.route.queryParams).pipe(
      plugState(
        pipe(
          map(this.parseParams.bind(this)),
          map(p => p ?? (this.jwtService.data ? null : this.getParamsFromStorage())),
          tap(p => this.saveParamsToStorage(p)),
          switchMap(p => (p ? this.service.getSchedule(p) : of(null))),
          map(s => (s?.lessons ? s : null)),
          tap({ error: () => this.removeParamsFromStorage() })
        )
      )
    );
  }

  ngOnDestroy(): void {
    this.navigateSubscription?.unsubscribe();
  }

  private getParamsFromStorage(): GetScheduleDTO {
    return JSON.parse(localStorage.getItem('schedule') ?? 'null');
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
    };
  }
}
