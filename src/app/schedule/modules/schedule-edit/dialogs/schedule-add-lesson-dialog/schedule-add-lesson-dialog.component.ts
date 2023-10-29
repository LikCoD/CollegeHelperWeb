import { ChangeDetectionStrategy, Component, inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { SearchScheduleFormData } from '@schedule/dialogs/search-schedule-dialog/search-schedule-dialog.dto';
import { FormConfig, FormConfigElementTypes } from '@shared/modules/ui/entities/form.config';
import { Validators } from '@angular/forms';
import { DateTime } from 'luxon';
import { ScheduleLesson } from '@schedule/entities/schedule';
import { ScheduleAddLessonService } from '@schedule/modules/schedule-edit/dialogs/schedule-add-lesson-dialog/schedule-add-lesson-dialog.service';
import { ScheduleAddLessonFormConfig } from '@schedule/modules/schedule-edit/dialogs/schedule-add-lesson-dialog/schedule-add-lesson-dialog.dto';
import { debug } from '@shared/rxjs/pipes/debug.pipe';
import { translateGroupProvider } from '@translate/translate.prefix-provider';

@Component({
  selector: 'app-schedule-add-lesson-dialog',
  templateUrl: './schedule-add-lesson-dialog.component.html',
  styleUrls: ['./schedule-add-lesson-dialog.component.scss'],
  providers: [translateGroupProvider('schedule.edit.addLesson')],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ScheduleAddLessonDialogComponent implements OnInit {
  private dialog = inject(MatDialogRef);
  private service = inject(ScheduleAddLessonService);
  private config = inject<ScheduleLesson | null>(MAT_DIALOG_DATA);

  formConfig: FormConfig<ScheduleAddLessonFormConfig> = {
    elements: {
      subjectID: {
        type: FormConfigElementTypes.SEARCHABLE_SELECT,
        typeConfig: {
          label: 'subject',
          items: this.service.subjects$,
        },
        initial: this.config?.subjectID,
        validators: [Validators.required],
      },
      teacherID: {
        type: FormConfigElementTypes.SEARCHABLE_SELECT,
        typeConfig: {
          label: 'teacher',
          items: this.service.teachers$,
        },
        initial: this.config?.teacherID,
        validators: [Validators.required],
      },
      groupID: {
        type: FormConfigElementTypes.SEARCHABLE_SELECT,
        typeConfig: {
          label: 'group',
          items: this.service.groups$,
        },
        initial: this.config?.groupID,
        validators: [Validators.required],
      },
      roomID: {
        type: FormConfigElementTypes.SEARCHABLE_SELECT,
        typeConfig: {
          label: 'room',
          items: this.service.rooms$,
        },
        initial: this.config?.roomID,
        validators: [Validators.required],
      },
      lessonIndex: {
        type: FormConfigElementTypes.NUMBER,
        typeConfig: { label: 'lessonIndex' },
        initial: this.config?.lessonIndex,
        validators: [Validators.required],
      },
      range: {
        type: FormConfigElementTypes.DATE_TIME_RANGE,
        typeConfig: {
          label: 'range',
          expand: true,
          startControlName: 'startDate',
          endControlName: 'endDate',
        },
        initial: {
          start: this.config?.startDate,
          end: this.config?.endDate,
        },
        formatter: (date: DateTime) => date.toISO(),
        validators: [Validators.required],
      },
    },
  };

  ngOnInit(): void {
    this.service.load();
  }

  onSubmit(data: SearchScheduleFormData): void {
    this.dialog.close(data);
  }
}
