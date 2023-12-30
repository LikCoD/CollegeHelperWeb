import { NgModule } from '@angular/core';

import { ScheduleComponent } from './schedule.component';
import { RouterModule } from '@angular/router';
import { routes } from './schedule.routes';
import { CommonModule } from '@angular/common';
import { ScheduleHeaderComponent } from '@schedule/components/schedule-header/schedule-header.component';
import { HDividerComponent } from '@ui/dividers/h-divider.component';
import { SkeletonPlugComponent } from '@shared/components/skeleton-plug/skeleton-plug.component';
import { ScheduleEditModule } from '@schedule/modules/schedule-edit/schedule-edit.module';
import { VDividerComponent } from '@ui/dividers/v-divider.component';
import { HasPermissionDirective } from '@shared/directives/has-permission.directive';
import { ScheduleViewModule } from '@schedule/modules/schedule-view/schedule-view.module';
import { LoadedStateDirective, DefaultStateDirective, StateMapperComponent } from 'state-mapper';
import { PrimaryContainerComponent } from '@shared/modules/ui/components/containers/primary-container.component';
import { provideTranslationSuffix } from 'i18n';

@NgModule({
  declarations: [ScheduleComponent],
  imports: [
    RouterModule.forChild(routes),
    CommonModule,
    ScheduleHeaderComponent,
    HDividerComponent,
    SkeletonPlugComponent,
    ScheduleEditModule,
    VDividerComponent,
    HasPermissionDirective,
    ScheduleViewModule,
    StateMapperComponent,
    DefaultStateDirective,
    LoadedStateDirective,
    DefaultStateDirective,
    DefaultStateDirective,
    PrimaryContainerComponent,
  ],
  providers: [provideTranslationSuffix('schedule')],
})
export class ScheduleModule {}
