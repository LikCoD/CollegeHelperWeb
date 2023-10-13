import { NgModule } from '@angular/core';
import { ItemsSelectComponent } from '@shared/modules/ui/components/selects/items-select/items-select.component';
import {
  SearchableSelectComponent,
} from '@shared/modules/ui/components/selects/searchable-select/searchable-select.component';

@NgModule({
  imports: [
    ItemsSelectComponent,
    SearchableSelectComponent,
  ],
  exports: [
    ItemsSelectComponent,
    SearchableSelectComponent,
  ],
})
export class SelectsModule {
}
