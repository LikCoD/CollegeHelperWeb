import { NgModule } from '@angular/core';
import { TextModule } from '@ui/text';
import { ImagesModule } from '@ui/images';
import { DividersModule } from '@ui/dividers';
import { ErrorsModule } from '@ui/errors';
import { SelectsModule } from '@ui/selects';
import { IndicatorsModule } from '@ui/indicators';
import { PickersModule } from '@shared/modules/ui/components/pickers/pickers.module';
import { DatetimeModule } from '@shared/modules/ui/components/datetime/datetime.module';
import { CarouselsModule } from '@shared/modules/ui/components/carousels/carousels.module';
import { ContainersModule } from '@shared/modules/ui/components/containers/containers.module';

@NgModule({
  imports: [
    TextModule,
    ImagesModule,
    DividersModule,
    ErrorsModule,
    SelectsModule,
    IndicatorsModule,
    PickersModule,
    DatetimeModule,
    CarouselsModule,
    ContainersModule,
  ],
  exports: [
    TextModule,
    ImagesModule,
    DividersModule,
    ErrorsModule,
    SelectsModule,
    IndicatorsModule,
    PickersModule,
    DatetimeModule,
    CarouselsModule,
    ContainersModule,
  ],
})
export class UiModule {}
