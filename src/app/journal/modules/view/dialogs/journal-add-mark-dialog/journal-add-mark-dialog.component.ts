import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  inject,
  OnDestroy,
  OnInit,
} from '@angular/core';
import { StudyPlacesService } from '@shared/services/study-places.service';
import { Observable, Subscription, tap } from 'rxjs';
import { LessonType, MarkType, StudyPlace } from '@shared/entities/study-place';
import { MAT_POPUP_DATA } from '@shared/material/popup';
import { JournalAddMarkDialogData } from '@journal/modules/view/dialogs/journal-add-mark-dialog/journal-add-mark-dialog.dto';
import { FormControl } from '@angular/forms';
import { JournalMarksService } from '@journal/modules/view/services/journal-marks.service';
import { JournalCell, Mark } from '@journal/modules/view/entites/journal';
import { provideTranslationSuffix } from 'i18n';

@Component({
  selector: 'journal-add-mark',
  templateUrl: './journal-add-mark-dialog.component.html',
  styleUrls: ['./journal-add-mark-dialog.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [provideTranslationSuffix('journal.view.addMarkDialog')],
})
export class JournalAddMarkDialogComponent implements OnInit, OnDestroy {
  userStudyPlace$!: Observable<StudyPlace>;
  data = inject<JournalAddMarkDialogData>(MAT_POPUP_DATA);

  inputFormControl = new FormControl<string>('');
  absenceFormControl = new FormControl<string>('');

  private studyPlacesService = inject(StudyPlacesService);
  private marksService = inject(JournalMarksService);

  private actionsSubscription: Subscription | null = null;

  private cdr = inject(ChangeDetectorRef);

  ngOnInit(): void {
    this.userStudyPlace$ = this.studyPlacesService.userStudyPlace;
    this.absenceFormControl.setValue(this.data.absence?.time?.toString() ?? null);
    this.data.absence && this.absenceFormControl.disable();
  }

  lessonType(studyPlace: StudyPlace): LessonType | null {
    return studyPlace.lessonTypes.find(t => t.type === this.data.lessonType) ?? null;
  }

  input(studyPlace: StudyPlace, type: LessonType): void {
    const value = this.inputFormControl.value;
    if (!value) return;

    this.inputFormControl.setValue('');

    const absence = value === studyPlace.absenceMark && !this.data.absence;
    if (absence) return this.addAbsence();

    const markType = type.marks.concat(type.standaloneMarks).find(m => m.mark === value);
    if (markType) return this.addMark(markType);
  }

  addMark(mark: MarkType): void {
    this.actionsSubscription?.unsubscribe();
    this.actionsSubscription = this.marksService
      .addMark({
        mark: mark.mark,
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

  removeAbsence(): void {
    if (!this.data.absence) return;

    this.actionsSubscription?.unsubscribe();
    this.actionsSubscription = this.marksService
      .removeAbsence(this.data.absence)
      .pipe(this.updateCell())
      .subscribe();
  }

  ngOnDestroy(): void {
    this.actionsSubscription?.unsubscribe();
  }

  private updateCell = () =>
    tap((cell: JournalCell) => {
      this.data.updateCell(cell);
      this.data.marks = cell.marks ?? [];
      this.data.absence = cell.absences?.at(0) ?? null;
      this.absenceFormControl.setValue(cell?.absences?.at(0)?.time?.toString() ?? null);

      if (cell.absences) this.absenceFormControl.disable();
      else this.absenceFormControl.enable();

      this.cdr.detectChanges();
    });
}
