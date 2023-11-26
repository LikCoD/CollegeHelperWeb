import { NgModule } from '@angular/core';

import { JournalComponent } from './journal.component';
import { RouterModule } from '@angular/router';
import { routes } from './journal.routes';
import { provideTranslationSuffix } from 'i18n';

@NgModule({
  declarations: [JournalComponent],
  imports: [RouterModule.forChild(routes)],
  providers: [provideTranslationSuffix('journal')],
})
export class JournalModule {}
