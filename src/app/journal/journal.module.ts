import { NgModule } from '@angular/core';

import { JournalComponent } from './journal.component';
import { RouterModule } from '@angular/router';
import { routes } from './journal.routes';
import { translatePrefixProvider } from '@translate/translate.prefix-provider';

@NgModule({
  declarations: [JournalComponent],
  imports: [RouterModule.forChild(routes)],
  providers: [translatePrefixProvider('journal')],
})
export class JournalModule {}
