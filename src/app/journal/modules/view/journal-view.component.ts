import { ChangeDetectionStrategy, Component, inject, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { GetJournalDTO } from '@journal/modules/view/entites/journal.dto';
import { map, Observable, pipe, switchMap } from 'rxjs';
import { JournalViewService } from '@journal/modules/view/services/journal-view.service';
import { Journal } from '@journal/modules/view/entites/journal';
import { JournalViewPlugComponent } from '@journal/modules/view/components/journal-view-plug/journal-view-plug.component';
import { State, useState } from 'state-mapper';

@Component({
  selector: 'journal-view',
  templateUrl: './journal-view.component.html',
  styleUrls: ['./journal-view.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class JournalViewComponent implements OnInit {
  journal$!: Observable<State<Journal>>;

  protected readonly JournalViewPlugComponent = JournalViewPlugComponent;

  private route = inject(ActivatedRoute);
  private service = inject(JournalViewService);

  ngOnInit(): void {
    this.journal$ = this.route.queryParams.pipe(
      useState(
        pipe(
          map(this.parseParams.bind(this)),
          switchMap(p => this.service.getJournal(p))
        )
      )
    );
  }

  private parseParams(): GetJournalDTO {
    const groupID = this.route.snapshot.queryParams['groupID'];
    const subjectID = this.route.snapshot.queryParams['subjectID'];
    const teacherID = this.route.snapshot.queryParams['teacherID'];

    if (!groupID || !subjectID || !teacherID) return {};

    return {
      groupID: groupID,
      subjectID: subjectID,
      teacherID: teacherID,
    };
  }
}
