import { ChangeDetectionStrategy, Component, inject, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { GetJournalDTO } from '@journal/modules/view/entites/journal.dto';
import { map, Observable, pipe, switchMap } from 'rxjs';
import { JournalViewService } from '@journal/modules/view/services/journal-view.service';
import { Journal } from '@journal/modules/view/entites/journal';
import { JournalViewPlugComponent } from '@journal/modules/view/components/journal-view-plug/journal-view-plug.component';
import { BaseJournalComponent } from '@journal/modules/view/components/base-journal/base-journal.component';
import { Pluggable } from '@shared/components/plugable/pluggable.entites';
import { plugState } from '@shared/rxjs/pipes/plugState.pipe';

@Component({
  selector: 'journal-view',
  templateUrl: './journal-view.component.html',
  styleUrls: ['./journal-view.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class JournalViewComponent implements OnInit {
  journal$!: Observable<Pluggable<Journal>>;

  protected readonly JournalViewPlugComponent = JournalViewPlugComponent;
  protected readonly BaseJournalComponent = BaseJournalComponent;

  private route = inject(ActivatedRoute);
  private service = inject(JournalViewService);

  ngOnInit(): void {
    this.journal$ = this.route.queryParams.pipe(
      plugState(
        pipe(
          map(this.parseParams.bind(this)),
          switchMap(p => this.service.getJournal(p))
        )
      )
    );
  }

  private parseParams(): GetJournalDTO {
    const group = this.route.snapshot.queryParams['group'];
    const subject = this.route.snapshot.queryParams['subject'];
    const teacher = this.route.snapshot.queryParams['teacher'];

    if (!group || !subject || !teacher) return {};

    return {
      group: group,
      subject: subject,
      teacher: teacher,
    };
  }
}
