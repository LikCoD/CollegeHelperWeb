import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  inject,
  Input,
  OnInit,
  Output,
} from '@angular/core';
import { JournalCategory, JournalOption } from '@journal/modules/landing/entities/options';
import { JournalOptionsSearchService } from '@journal/modules/landing/services/journal-options-search.service';
import { debug } from '@shared/rxjs/pipes/debug.pipe';
import { Observable } from 'rxjs';

@Component({
  selector: 'journal-select-category',
  templateUrl: './journal-select-category.component.html',
  styleUrls: ['./journal-select-category.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class JournalSelectCategoryComponent implements OnInit {
  @Input({ required: true }) category!: JournalCategory;

  @Output() selectOption = new EventEmitter<JournalOption>();

  searchService = inject(JournalOptionsSearchService);

  searchItems$!: Observable<JournalOption[]>;

  ngOnInit(): void {
    this.searchItems$ = this.searchService.searchItems$(this.category.options);
  }

  select(option: JournalOption): void {
    if (!option.hasMembers) return;

    this.selectOption.emit(option);
  }
}
