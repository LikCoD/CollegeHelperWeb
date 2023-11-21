import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BaseScheduleComponent } from '@schedule/modules/schedule-view/components/base-schedule/base-schedule.component';
import { DistinctPipe } from '@shared/pipes/distinct.pipe';
import { FlatMapPipe } from '@shared/pipes/flatMap.pipe';
import { MinPipe } from '@shared/pipes/min.pipe';
import { MaxPipe } from '@shared/pipes/max.pipe';
import { DateBetweenPipe } from '@shared/pipes/date-between.pipe';
import { TimePipe } from '@shared/pipes/time.pipe';
import { DateTimePipe } from '@shared/pipes/datetime.pipe';
import { GroupByPipe } from '@shared/pipes/group-by.pipe';
import { ValuesPipe } from '@shared/pipes/values.pipe';
import { ScheduleCellComponent } from '@schedule/modules/schedule-view/components/schedule-cell/schedule-cell.component';
import { ScheduleCellPositionDirective } from '@schedule/modules/schedule-view/components/base-schedule/schedule-cell-position.directive';
import { P1Component } from '@ui/text/p1.component';
import { ScheduleLessonComponent } from '@schedule/components/schedule-lesson/schedule-lesson.component';
import { SchedulePlugComponent } from '@schedule/modules/schedule-view/components/schedule-plug/schedule-plug.component';
import { ScheduleViewComponent } from './schedule-view.component';
import { ScheduleEditModule } from '@schedule/modules/schedule-edit/schedule-edit.module';
import { VDividerComponent } from '@ui/dividers/v-divider.component';
import { HasPermissionDirective } from '@shared/directives/has-permission.directive';
import { WrappedCarouselComponent } from '@shared/modules/ui/components/carousels/wrapped-carousel/wrapped-carousel.component';
import { MatTooltipModule } from '@angular/material/tooltip';
import { CarouselItemDirective } from '@shared/modules/ui/components/carousels/carousel-item.directive';
import { SkeletonLoaderComponent } from '@shared/components/skeleton-loader/skeleton-loader.component';
import { SkeletonPlugComponent } from '@shared/components/skeleton-plug/skeleton-plug.component';
import { StateMapperComponent } from '../../../../../projects/state-mapper/src/lib/components/state-mapper.component';
import { DefaultStateDirective } from '../../../../../projects/state-mapper/src/lib/directives/default-state.directive';
import { LoadedStateDirective } from '../../../../../projects/state-mapper/src/lib/directives/loaded-state.directive';
import { PrimaryContainerComponent } from '@shared/modules/ui/components/containers/primary-container.component';

@NgModule({
  declarations: [
    BaseScheduleComponent,
    ScheduleCellComponent,
    ScheduleCellPositionDirective,
    SchedulePlugComponent,
    ScheduleViewComponent,
  ],
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
    P1Component,
    ScheduleEditModule,
    VDividerComponent,
    HasPermissionDirective,
    WrappedCarouselComponent,
    ScheduleLessonComponent,
    MatTooltipModule,
    CarouselItemDirective,
    SkeletonLoaderComponent,
    SkeletonPlugComponent,
    StateMapperComponent,
    DefaultStateDirective,
    LoadedStateDirective,
    PrimaryContainerComponent,
  ],
  exports: [ScheduleViewComponent, SchedulePlugComponent],
})
export class ScheduleViewModule {}
