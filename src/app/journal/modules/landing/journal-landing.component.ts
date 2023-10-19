import { ChangeDetectionStrategy, Component, inject, OnInit } from '@angular/core';
import { JournalOptionsService } from '@journal/modules/landing/services/journal-options.service';
import { Observable } from 'rxjs';
import { JournalCategory } from '@journal/modules/landing/entities/options';
import { BaseJournalSelectComponent } from '@journal/modules/landing/components/base-journal-select/base-journal-select.component';
import { JournalSelectPlugComponent } from '@journal/modules/landing/components/journal-select-plug/journal-select-plug.component';
import { translatePrefixProvider } from '@translate/translate.prefix-provider';

@Component({
  selector: 'journal-select',
  templateUrl: './journal-landing.component.html',
  styleUrls: ['./journal-landing.component.scss'],
  providers: [translatePrefixProvider('landing')],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class JournalLandingComponent implements OnInit {
  categories$!: Observable<JournalCategory[]>;

  private service = inject(JournalOptionsService);

  ngOnInit(): void {
    this.categories$ = this.service.getOptions();
  }

  protected readonly BaseJournalSelectComponent = BaseJournalSelectComponent;
  protected readonly JournalSelectPlugComponent = JournalSelectPlugComponent;
}
