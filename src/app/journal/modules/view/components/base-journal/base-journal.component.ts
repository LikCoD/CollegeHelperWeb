import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  inject,
  Injector,
  Input,
} from '@angular/core';
import { Journal, JournalCell, JournalRow } from '@journal/modules/view/entites/journal';
import { CellEntry } from '@journal/modules/view/components/journal-cell/journal-cell.component';
import { JournalAddMarkDialogData } from '@journal/modules/view/dialogs/journal-add-mark-dialog/journal-add-mark-dialog.dto';
import { JournalAddMarkDialogComponent } from '@journal/modules/view/dialogs/journal-add-mark-dialog/journal-add-mark-dialog.component';
import { MatPopup } from '@shared/material/popup';

@Component({
  selector: 'app-base-journal',
  templateUrl: './base-journal.component.html',
  styleUrls: ['./base-journal.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class BaseJournalComponent {
  @Input({ alias: 'data', required: true }) journal!: Journal;

  private popup = inject(MatPopup);
  private cdr = inject(ChangeDetectorRef);
  private injector = inject(Injector);

  entries(cell: JournalCell): CellEntry[] {
    return cell?.marks?.map(m => m.mark) ?? [];
  }

  openAddMarkDialog(
    journal: Journal,
    cell: JournalCell,
    row: JournalRow,
    cellRef: HTMLElement
  ): void {
    if (!cell.id) {
      //todo implement additional logic
      return;
    }

    if (cell.type?.length !== 1) {
      //todo implement additional select
      return;
    }

    if (!!cell.absences && cell.absences.length > 1) {
      //todo implement additional logic
      return;
    }

    if (!journal.info.editable) return;

    this.popup.open<JournalAddMarkDialogData>(
      JournalAddMarkDialogComponent,
      cellRef,
      {
        lessonType: cell.type[0],
        marks: cell.marks ?? [],
        absence: cell.absences?.at(0) ?? null,
        lessonID: cell.id,
        studentID: row.id,
        updateCell: c => {
          row.cells[row.cells.indexOf(cell)] = c;
          this.cdr.detectChanges();
          cell = c;
        },
      },
      this.injector
    );
  }
}
