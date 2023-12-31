import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { Journal } from '@journal/modules/view/entites/journal';

@Component({
  selector: 'journal-view-header',
  templateUrl: './journal-view-header.component.html',
  styleUrl: './journal-view-header.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class JournalViewHeaderComponent {
  @Input({ required: true }) journal!: Journal;
}
