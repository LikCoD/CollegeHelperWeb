import { NgModule } from '@angular/core';
import { TextModule } from '@ui/text';
import { ImagesModule } from '@ui/images';
import { DividersModule } from '@ui/dividers';
import { ErrorsModule } from '@ui/errors';
import { SelectsModule } from '@ui/selects';
import { IndicatorsModule } from '@ui/indicators';

@NgModule({
  imports: [
    TextModule,
    ImagesModule,
    DividersModule,
    ErrorsModule,
    SelectsModule,
    IndicatorsModule,
  ],
  exports: [
    TextModule,
    ImagesModule,
    DividersModule,
    ErrorsModule,
    SelectsModule,
    IndicatorsModule,
  ],
})
export class UiModule {
}
