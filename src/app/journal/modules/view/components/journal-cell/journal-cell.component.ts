import {
  ChangeDetectionStrategy,
  Component,
  ElementRef,
  inject,
  Input,
  OnChanges,
  signal,
  SimpleChanges,
} from '@angular/core';
import { JournalCell } from '@journal/modules/view/entites/journal';

@Component({
  selector: 'journal-cell',
  templateUrl: './journal-cell.component.html',
  styleUrls: ['./journal-cell.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class JournalCellComponent implements OnChanges {
  @Input({ required: true }) cell!: JournalCell;

  entries = signal<string[]>([]);

  private hostRef = inject(ElementRef<HTMLElement>);

  get host(): HTMLElement {
    return this.hostRef.nativeElement;
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['cell']) {
      const value = changes['cell'].currentValue as JournalCell;
      this.onCellChange(value);
    }
  }

  onCellChange(cell: JournalCell): void {
    const entries = this.parseEntries(cell);

    this.host.classList.remove('empty');
    if (entries.length === 0) this.host.classList.add('empty');

    this.entries.set(entries);
  }

  private parseEntries(cell: JournalCell): string[] {
    const entries = cell.marks.map(m => m.mark);
    entries.push(...cell.absences.map(v => v.time?.toString() ?? '-'));
    return entries;
  }
}
