import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  inject,
  Input,
  ViewChild,
} from '@angular/core';
import { ScheduleLesson } from '@schedule/entities/schedule';
import { MatDialog } from '@angular/material/dialog';
import { ScheduleAddLessonDialogComponent } from '@schedule/modules/schedule-edit/dialogs/schedule-add-lesson-dialog/schedule-add-lesson-dialog.component';
import { filterNotNull } from '@shared/rxjs/pipes/filterNotNull.pipe';
import { switchMap } from 'rxjs';
import { ScheduleLessonActionsService } from '@schedule/modules/schedule-edit/components/schedule-lesson-actions/schedule-lesson-actions.service';
import { ConfirmationDialogComponent } from '@shared/modules/ui/components/dialogs/confirmation-dialog/confirmation-dialog.component';
import { translatePrefixProvider } from '@translate/translate.prefix-provider';
import { MatMenuTrigger } from '@angular/material/menu';
import { ConfirmationDialogData } from '@shared/modules/ui/components/dialogs/confirmation-dialog/confirmation-dialog.entities';

@Component({
  selector: 'schedule-lesson-actions',
  templateUrl: './schedule-lesson-actions.component.html',
  styleUrls: ['./schedule-lesson-actions.component.scss'],
  providers: [translatePrefixProvider('edit.actions')],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ScheduleLessonActionsComponent {
  @Input({ required: true }) lesson!: ScheduleLesson;

  @ViewChild(MatMenuTrigger) menuTrigger!: MatMenuTrigger;

  private dialogService = inject(MatDialog);
  private service = inject(ScheduleLessonActionsService);
  private cdr = inject(ChangeDetectorRef);

  editLesson(): void {
    this.closeMenu();

    this.dialogService
      .open(ScheduleAddLessonDialogComponent, { data: this.lesson })
      .afterClosed()
      .pipe(filterNotNull())
      .pipe(switchMap(lesson => this.service.editLesson(this.lesson.id!, lesson)))
      .subscribe();
  }

  duplicateLesson(): void {
    this.closeMenu();

    this.dialogService
      .open(ScheduleAddLessonDialogComponent, { data: this.lesson })
      .afterClosed()
      .pipe(filterNotNull())
      .pipe(switchMap(lesson => this.service.addLesson(lesson)))
      .subscribe();
  }

  deleteLesson(): void {
    this.closeMenu();

    const data: ConfirmationDialogData = {
      title: 'confirmDeletionTitle',
      description: 'confirmDeletionDescription',
      icon: 'delete',
      color: 'danger',
    };
    this.dialogService
      .open(ConfirmationDialogComponent, { data: data })
      .afterClosed()
      .pipe(filterNotNull())
      .pipe(switchMap(() => this.service.deleteLesson(this.lesson)))
      .subscribe();
  }

  private closeMenu(): void {
    this.menuTrigger.closeMenu();
    this.cdr.detectChanges();
  }
}
