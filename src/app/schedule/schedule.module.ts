import { NgModule } from '@angular/core';

import { ScheduleComponent } from './schedule.component';
import { RouterModule } from '@angular/router';
import { routes } from './schedule.routes';
import { CommonModule } from '@angular/common';
import { TranslateModule } from '@ngx-translate/core';
import { translatePrefixProvider } from '@translate/translate.prefix-provider';
import { ScheduleHeaderComponent } from '@schedule/components/schedule-header/schedule-header.component';
import { HDividerComponent } from '@ui/dividers/h-divider.component';
import { SkeletonPlugComponent } from '@shared/components/skeleton-plug/skeleton-plug.component';
import { PluggableComponent } from '@shared/components/plugable/pluggable.component';
import { ScheduleEditModule } from '@schedule/modules/schedule-edit/schedule-edit.module';
import { VDividerComponent } from '@ui/dividers/v-divider.component';
import { HasPermissionDirective } from '@shared/directives/has-permission.directive';
import { ScheduleViewModule } from '@schedule/modules/schedule-view/schedule-view.module';

@NgModule({
  declarations: [ScheduleComponent],
  imports: [
    RouterModule.forChild(routes),
    CommonModule,
    TranslateModule,
    ScheduleHeaderComponent,
    HDividerComponent,
    SkeletonPlugComponent,
    PluggableComponent,
    ScheduleEditModule,
    VDividerComponent,
    HasPermissionDirective,
    ScheduleViewModule,
  ],
  providers: [translatePrefixProvider('schedule')],
})
export class ScheduleModule {}
