import { NgModule } from '@angular/core';
import { Head1Component } from './head1.component';
import { Head2Component } from './head2.component';
import { Head3Component } from './head3.component';
import { P1Component } from './p1.component';
import { P2Component } from './p2.component';
import { UrlComponent } from './url.component';
import { Head4Component } from '@ui/text/head4.component';

@NgModule({
  imports: [
    Head1Component,
    Head2Component,
    Head3Component,
    Head4Component,
    P1Component,
    P2Component,
    UrlComponent,
  ],
  exports: [
    Head1Component,
    Head2Component,
    Head3Component,
    Head4Component,
    P1Component,
    P2Component,
    UrlComponent,
  ],
})
export class TextModule {
}
