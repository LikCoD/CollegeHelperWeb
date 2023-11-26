import { ChangeDetectionStrategy, Component, inject, Input } from '@angular/core';
import { ScheduleLesson } from '@schedule/entities/schedule';
import { MatDialog } from '@angular/material/dialog';
import { ScheduleAddLessonDialogComponent } from '@schedule/modules/schedule-edit/dialogs/schedule-add-lesson-dialog/schedule-add-lesson-dialog.component';
import { switchMap } from 'rxjs';
import { ScheduleAddLessonViewService } from '@schedule/modules/schedule-edit/components/schedule-add-lesson-view/schedule-add-lesson-view.service';
import { filterNotNull } from '@shared/rxjs/pipes/filterNotNull.pipe';
import { provideTranslationSuffix } from 'i18n';

@Component({
  selector: 'schedule-add-lesson-view',
  templateUrl: './schedule-add-lesson-view.component.html',
  styleUrls: ['./schedule-add-lesson-view.component.scss'],
  providers: [provideTranslationSuffix('edit.addLessonView')],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ScheduleAddLessonViewComponent {
  @Input({ required: true }) availableLessons: ScheduleLesson[] = [];

  private dialogService = inject(MatDialog);
  private service = inject(ScheduleAddLessonViewService);

  addLesson(template: ScheduleLesson | null): void {
    this.dialogService
      .open(ScheduleAddLessonDialogComponent, { data: template })
      .afterClosed()
      .pipe(filterNotNull())
      .pipe(switchMap(lesson => this.service.addLesson(lesson)))
      .subscribe();
  }
}
