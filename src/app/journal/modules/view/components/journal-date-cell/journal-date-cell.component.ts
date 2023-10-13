import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { JournalLesson } from '@journal/modules/view/entites/journal';

@Component({
  selector: 'journal-date-cell',
  templateUrl: './journal-date-cell.component.html',
  styleUrls: ['./journal-date-cell.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class JournalDateCellComponent {
  @Input({ required: true }) cell!: JournalLesson;
}
