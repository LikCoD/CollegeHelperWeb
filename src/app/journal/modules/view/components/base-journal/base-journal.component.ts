import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  ElementRef,
  inject,
  Injector,
  Input,
  OnChanges,
  OnInit,
  signal,
  SimpleChanges,
  ViewChild,
} from '@angular/core';
import { Journal, JournalCell, Point } from '@journal/modules/view/entites/journal';
import { MatPopup } from '@shared/material/popup';
import { JournalAddMarkDialogData } from '@journal/modules/view/dialogs/journal-add-mark-dialog/journal-add-mark-dialog.dto';
import { JournalAddMarkDialogComponent } from '@journal/modules/view/dialogs/journal-add-mark-dialog/journal-add-mark-dialog.component';
import { JournalCellComponent } from '@journal/modules/view/components/journal-cell/journal-cell.component';
import { JournalCollapseService } from '@journal/modules/view/services/journal-collapse.service';

@Component({
  selector: 'base-journal',
  templateUrl: './base-journal.component.html',
  styleUrls: ['./base-journal.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class BaseJournalComponent implements OnInit, OnChanges {
  @Input({ alias: 'data', required: true }) journal!: Journal;
  @ViewChild('cellsContainer', { read: ElementRef<HTMLElement> })
  cellsContainer!: ElementRef<HTMLElement>;

  cellsWidth$$ = signal(0);
  emptyPoints$$ = signal<Point[]>([]);

  private popup = inject(MatPopup);
  private cdr = inject(ChangeDetectorRef);
  private injector = inject(Injector);
  private collapseService = inject(JournalCollapseService);

  dates$$ = this.collapseService.dates$$;
  cells$$ = this.collapseService.cells$$;

  ngOnInit(): void {
    this.collapseService.journal$$.set(this.journal);
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['journal']) {
      const journal = changes['journal'].currentValue as Journal;
      const points = journal.cells.map(c => c.point);

      const maxX = Math.max(...points.map(p => p.x)) + 1;
      const maxY = Math.max(...points.map(p => p.y)) + 1;

      const emptyPoints: Point[] = [];
      for (let i = 0; i < maxX; i++) {
        for (let j = 0; j < maxY; j++) {
          emptyPoints.push({ x: i, y: j });
        }
      }

      this.emptyPoints$$.set(emptyPoints);
    }
  }

  openAddMarkDialog(
    cell: JournalCell,
    cellRef: HTMLElement,
    cellComponent: JournalCellComponent
  ): void {
    // if (!this.journal.info.editable) return;

    const lessonID = this.journal.dates[cell.point.x].id;
    const studentID = this.journal.rowTitles[cell.point.y].id;
    if (!studentID || !lessonID) return;

    this.popup.open<JournalAddMarkDialogData>(
      JournalAddMarkDialogComponent,
      cellRef,
      {
        lessonID: lessonID,
        studentID: studentID,
        updateCell: l => {
          cell.marks = l.marks;
          cell.absences = l.absence ? [l.absence] : [];

          cellComponent.onCellChange(cell);
          this.cdr.detectChanges();
        },
      },
      this.injector
    );
  }
}
