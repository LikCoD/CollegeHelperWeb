import { ChangeDetectionStrategy, Component, inject, Input } from '@angular/core';
import { JournalDate } from '@journal/modules/view/entites/journal';
import {
  CollapsedStates,
  JournalCollapseService,
} from '@journal/modules/view/services/journal-collapse.service';

@Component({
  selector: 'journal-date-cell',
  templateUrl: './journal-date-cell.component.html',
  styleUrls: ['./journal-date-cell.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class JournalDateCellComponent {
  @Input({ required: true }) cell!: JournalDate;
  @Input() collapsed: CollapsedStates | null = null;

  private collapseService = inject(JournalCollapseService);

  collapse = this.collapseService.setState.bind(this.collapseService);
  expand = this.collapseService.removeState.bind(this.collapseService);
}
