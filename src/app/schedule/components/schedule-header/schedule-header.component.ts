import { ChangeDetectionStrategy, Component, inject, OnDestroy, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ScheduleMode, ScheduleService } from '@schedule/services/schedule.service';
import { map, Observable, Subscription, switchMap } from 'rxjs';
import { Schedule } from '@schedule/entities/schedule';
import { IconComponent } from '@ui/images/icon.component';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { SearchScheduleFormData } from '@schedule/dialogs/search-schedule-dialog/search-schedule-dialog.dto';
import { SearchScheduleDialogComponent } from '@schedule/dialogs/search-schedule-dialog/search-schedule-dialog.component';
import { filterNotNull } from '@shared/rxjs/pipes/filterNotNull.pipe';
import { translatePrefixProvider } from '@translate/translate.prefix-provider';
import { TranslateModule } from '@ngx-translate/core';
import { PrimaryContainerComponent } from '@shared/modules/ui/components/containers/primary-container.component';
import { SecondaryContainerComponent } from '@shared/modules/ui/components/containers/secondary-container.component';

@Component({
  selector: 'schedule-header',
  standalone: true,
  imports: [
    CommonModule,
    IconComponent,
    TranslateModule,
    PrimaryContainerComponent,
    SecondaryContainerComponent,
  ],
  templateUrl: './schedule-header.component.html',
  styleUrls: ['./schedule-header.component.scss'],
  providers: [translatePrefixProvider('header')],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ScheduleHeaderComponent implements OnInit, OnDestroy {
  schedule$!: Observable<Schedule>;
  mode$!: Observable<ScheduleMode>;

  private service = inject(ScheduleService);
  private dialogService = inject(MatDialog);
  private router = inject(Router);

  private navigateSubscription: Subscription | null = null;

  ngOnInit(): void {
    this.schedule$ = this.service.schedule$;
    this.mode$ = this.service.mode$;
  }

  showSearchDialog(): void {
    const data: SearchScheduleFormData = this.service.schedule
      ? {
          studyPlaceID: this.service.schedule.info.studyPlaceInfo.id,
          type: this.service.schedule.info.type,
          typename: this.service.schedule.info.typeName,
          startDate: this.service.schedule.info.startDate,
          endDate: this.service.schedule.info.endDate,
        }
      : {};

    this.navigateSubscription = this.dialogService
      .open(SearchScheduleDialogComponent, { data: data })
      .afterClosed()
      .pipe(filterNotNull())
      .pipe(map(v => <SearchScheduleFormData>v))
      .pipe(
        switchMap(data =>
          this.router.navigate(['schedule', data.type, data.typename], {
            queryParams: {
              studyPlaceID: data.studyPlaceID,
              startDate: data.startDate,
              endDate: data.endDate,
            },
          })
        )
      )
      .subscribe();
  }

  toggleViewType(): void {
    this.service.mode$.toggle(['time', 'table']);
  }

  toggleExpand(): void {
    this.service.mode$.toggle(['table', 'table-expanded']);
  }

  toggleViewMode(): void {
    this.service.display$.toggle();
  }

  ngOnDestroy(): void {
    this.navigateSubscription?.unsubscribe();
  }
}
