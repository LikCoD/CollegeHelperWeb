import { ChangeDetectionStrategy, Component, inject, OnInit } from '@angular/core';
import { JournalOptionsService } from '@journal/modules/landing/services/journal-options.service';
import { Observable, of, pipe, switchMap } from 'rxjs';
import { JournalCategory } from '@journal/modules/landing/entities/options';
import { JournalSelectPlugComponent } from '@journal/modules/landing/components/journal-select-plug/journal-select-plug.component';
import { State, useState } from 'state-mapper';
import { provideTranslationSuffix } from 'i18n';

@Component({
  selector: 'journal-select',
  templateUrl: './journal-landing.component.html',
  styleUrls: ['./journal-landing.component.scss'],
  providers: [provideTranslationSuffix('landing')],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class JournalLandingComponent implements OnInit {
  categories$!: Observable<State<JournalCategory[]>>;

  protected readonly JournalSelectPlugComponent = JournalSelectPlugComponent;

  private service = inject(JournalOptionsService);

  ngOnInit(): void {
    this.categories$ = of(null).pipe(useState(pipe(switchMap(() => this.service.getOptions()))));
  }
}
