import { NgModule } from '@angular/core';
import { VDividerComponent } from './v-divider.component';
import { HDividerComponent } from './h-divider.component';

@NgModule({
  imports: [VDividerComponent, HDividerComponent],
  exports: [VDividerComponent, HDividerComponent],
})
export class DividersModule { }
