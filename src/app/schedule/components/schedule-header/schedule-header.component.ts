import { ChangeDetectionStrategy, Component, inject, OnDestroy, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ScheduleMode, ScheduleService } from '@schedule/services/schedule.service';
import { map, Observable, Subscription, switchMap } from 'rxjs';
import { GeneralSchedule, Schedule } from '@schedule/entities/schedule';
import { IconComponent } from '@ui/images/icon.component';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { SearchScheduleFormData } from '@schedule/dialogs/search-schedule-dialog/search-schedule-dialog.dto';
import { SearchScheduleDialogComponent } from '@schedule/dialogs/search-schedule-dialog/search-schedule-dialog.component';
import { filterNotNull } from '@shared/rxjs/pipes/filterNotNull.pipe';
import { PrimaryContainerComponent } from '@shared/modules/ui/components/containers/primary-container.component';
import { SecondaryContainerComponent } from '@shared/modules/ui/components/containers/secondary-container.component';
import { provideTranslationSuffix, TranslatePipe } from 'i18n';
import { SkeletonLoaderComponent } from '@shared/components/skeleton-loader/skeleton-loader.component';
import { BreadcrumbsViewComponent } from '@shared/components/breadcrumbs-view/breadcrumbs-view.component';
import { MatTooltipModule } from '@angular/material/tooltip';

@Component({
  selector: 'schedule-header',
  standalone: true,
  imports: [
    CommonModule,
    IconComponent,
    PrimaryContainerComponent,
    SecondaryContainerComponent,
    TranslatePipe,
    SkeletonLoaderComponent,
    BreadcrumbsViewComponent,
    MatTooltipModule,
  ],
  templateUrl: './schedule-header.component.html',
  styleUrls: ['./schedule-header.component.scss'],
  providers: [provideTranslationSuffix('header')],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ScheduleHeaderComponent implements OnInit, OnDestroy {
  schedule$!: Observable<Schedule | GeneralSchedule>;
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
    const info = this.service.schedule?.info;
    const data: SearchScheduleFormData = info
      ? {
          studyPlaceID: info.studyPlaceInfo.id,
          type: info.type,
          typename: info.typeName,
          startDate: 'startDate' in info ? info.startDate : null,
          endDate: 'endDate' in info ? info.endDate : null,
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
    this.service.mode$.toggle(['table', 'tableExpanded']);
  }

  toggleViewMode(): void {
    this.service.display$.toggle();
  }

  breadcrumbs(schedule: Schedule | GeneralSchedule): string[] {
    const base = [
      schedule.info.type,
      schedule.info.typeName,
      this.service.display$.value,
      this.service.mode$.value,
    ];

    if ('startDate' in schedule.info) {
      const start = schedule.info.startDate.toLocaleString();
      const end = schedule.info.endDate.toLocaleString();
      base.push(`${start}-${end}`);
    }

    return base;
  }

  ngOnDestroy(): void {
    this.navigateSubscription?.unsubscribe();
  }
}
