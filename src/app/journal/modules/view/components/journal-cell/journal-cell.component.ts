import { ChangeDetectionStrategy, Component, ElementRef, inject, Input, OnChanges, SimpleChanges } from '@angular/core';

export type CellEntry = string;

@Component({
  selector: 'journal-cell',
  templateUrl: './journal-cell.component.html',
  styleUrls: ['./journal-cell.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class JournalCellComponent implements OnChanges {
  @Input({ required: true }) entries!: CellEntry[];

  private hostRef = inject(ElementRef<HTMLElement>);

  get host(): HTMLElement {
    return this.hostRef.nativeElement;
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['entries']) {
      this.host.classList.remove('empty');
      if (changes['entries'].currentValue.length === 0) this.host.classList.add('empty');
    }
  }
}
