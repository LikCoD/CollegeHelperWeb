import { ChangeDetectionStrategy, Component, ElementRef, inject, Input, OnChanges, SimpleChanges } from '@angular/core';
import { JournalOption } from '@journal/modules/landing/entities/options';

@Component({
  selector: 'journal-select-option',
  templateUrl: './journal-select-option.component.html',
  styleUrls: ['./journal-select-option.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class JournalSelectOptionComponent implements OnChanges {
  @Input({ required: true }) option!: JournalOption;

  private hostRef = inject(ElementRef<HTMLElement>);

  get host(): HTMLElement {
    return this.hostRef.nativeElement;
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['option']) {
      if (changes['option'].currentValue.hasMembers) this.host.classList.remove('disabled');
      else this.host.classList.add('disabled');
    }
  }
}
