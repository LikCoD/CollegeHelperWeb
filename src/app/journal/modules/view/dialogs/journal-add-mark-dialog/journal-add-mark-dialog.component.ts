import {
  ChangeDetectionStrategy,
  Component,
  inject,
  OnDestroy,
  OnInit,
  signal,
} from '@angular/core';
import { Subscription, tap } from 'rxjs';
import { MAT_POPUP_DATA } from '@shared/material/popup';
import { JournalAddMarkDialogData } from '@journal/modules/view/dialogs/journal-add-mark-dialog/journal-add-mark-dialog.dto';
import { FormControl } from '@angular/forms';
import { JournalMarksService } from '@journal/modules/view/services/journal-marks.service';
import { JournalLesson, Mark } from '@journal/modules/view/entites/journal';
import { provideTranslationGroup } from 'i18n';
import { MAT_TOOLTIP_SCROLL_STRATEGY_FACTORY_PROVIDER } from '@angular/material/tooltip';

@Component({
  selector: 'journal-add-mark',
  templateUrl: './journal-add-mark-dialog.component.html',
  styleUrls: ['./journal-add-mark-dialog.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [
    provideTranslationGroup(['journal', 'view', 'addMarkDialog']),
    MAT_TOOLTIP_SCROLL_STRATEGY_FACTORY_PROVIDER,
  ],
})
export class JournalAddMarkDialogComponent implements OnInit, OnDestroy {
  lesson$ = signal<JournalLesson | null>(null);

  data = inject<JournalAddMarkDialogData>(MAT_POPUP_DATA);

  inputFormControl = new FormControl<string>('');
  absenceFormControl = new FormControl<string>('');

  private marksService = inject(JournalMarksService);

  private actionsSubscription?: Subscription;
  private lessonSubscription?: Subscription;

  ngOnInit(): void {
    this.lessonSubscription = this.marksService
      .getLesson(this.data.lessonID, this.data.studentID)
      .pipe(tap(this.update.bind(this)))
      .subscribe(l => this.lesson$.set(l));
  }

  input(lesson: JournalLesson): void {
    const value = this.inputFormControl.value;
    if (!value) return;

    this.inputFormControl.setValue('');

    const absence = value === lesson.type.absenceMark && !lesson.absence;
    if (absence) return this.addAbsence();

    const markType = lesson.type.availableMarks.find(m => m.mark === value);
    if (markType) return this.addMark(markType);
  }

  addMark(mark: Mark): void {
    this.actionsSubscription?.unsubscribe();
    this.actionsSubscription = this.marksService
      .addMark({
        markID: mark.id,
        studentID: this.data.studentID,
        lessonID: this.data.lessonID,
      })
      .pipe(this.updateCell())
      .subscribe();
  }

  removeMark(mark: Mark): void {
    this.actionsSubscription?.unsubscribe();
    this.actionsSubscription = this.marksService
      .removeMark(mark)
      .pipe(this.updateCell())
      .subscribe();
  }

  addAbsence(absence: string | null = this.absenceFormControl?.value): void {
    this.actionsSubscription?.unsubscribe();
    this.actionsSubscription = this.marksService
      .addAbsence({
        time: +`${absence}` ?? null,
        studentID: this.data.studentID,
        lessonID: this.data.lessonID,
      })
      .pipe(this.updateCell())
      .subscribe();
  }

  removeAbsence(lesson: JournalLesson): void {
    if (!lesson.absence) return;

    this.actionsSubscription?.unsubscribe();
    this.actionsSubscription = this.marksService
      .removeAbsence(lesson.absence)
      .pipe(this.updateCell())
      .subscribe();
  }

  ngOnDestroy(): void {
    this.actionsSubscription?.unsubscribe();
    this.lessonSubscription?.unsubscribe();
  }

  private updateCell = () =>
    tap((lesson: JournalLesson) => {
      this.lesson$.set(lesson);
      this.update(lesson);

      this.data.updateCell(lesson);
    });

  private update(lesson: JournalLesson): void {
    this.absenceFormControl.setValue(lesson.absence?.time?.toString() ?? null);
    (lesson.absence && this.absenceFormControl.disable()) || this.absenceFormControl.enable();
  }
}
