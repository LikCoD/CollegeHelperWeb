import { ChangeDetectionStrategy, Component, inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { SearchScheduleFormData } from '@schedule/dialogs/search-schedule-dialog/search-schedule-dialog.dto';
import { FormConfig, FormConfigElementTypes } from '@shared/modules/ui/entities/form.config';
import { Validators } from '@angular/forms';
import { DateTime } from 'luxon';
import { ScheduleGeneralLesson } from '@schedule/entities/schedule';
import { ScheduleAddLessonService } from '@schedule/modules/schedule-edit/dialogs/schedule-add-lesson-dialog/schedule-add-lesson-dialog.service';
import { provideTranslationGroup, provideTranslationSuffix } from 'i18n';
import { ScheduleAddGeneralLessonFormConfig } from '@schedule/modules/schedule-edit/dialogs/schedule-add-genral-lesson-dialog/schedule-add-general-lesson-dialog.dto';
import { Time } from '@shared/modules/ui/components/datetime/time-picker-view/time-picker-view.component';

@Component({
  selector: 'app-schedule-add-general-lesson-dialog',
  templateUrl: './schedule-add-general-lesson-dialog.component.html',
  styleUrls: ['./schedule-add-general-lesson-dialog.component.scss'],
  providers: [provideTranslationGroup(['schedule', 'edit', 'addGeneralLesson'])],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ScheduleAddGeneralLessonDialogComponent implements OnInit {
  private dialog = inject(MatDialogRef);
  private service = inject(ScheduleAddLessonService);
  private config = inject<ScheduleGeneralLesson | null>(MAT_DIALOG_DATA);
  private timezoneOffsetMinutes = new Date().getTimezoneOffset();

  formConfig: FormConfig<ScheduleAddGeneralLessonFormConfig> = {
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
      primaryColor: {
        type: FormConfigElementTypes.COLOR_SELECT,
        typeConfig: {
          label: 'primaryColor',
          items: this.service.primaryColors$,
        },
        initial: this.config?.primaryColor,
        validators: [Validators.required],
      },
      secondaryColor: {
        type: FormConfigElementTypes.COLOR_SELECT,
        typeConfig: {
          label: 'secondaryColor',
          items: this.service.secondaryColors$,
        },
        initial: this.config?.secondaryColor,
        validators: [Validators.required],
      },
      lessonIndex: {
        type: FormConfigElementTypes.NUMBER,
        typeConfig: { label: 'lessonNumber' },
        initial: !!this.config ? this.config.lessonIndex + 1 : undefined,
        transform: v => v - 1,
        validators: [Validators.required],
      },
      dayIndex: {
        type: FormConfigElementTypes.NUMBER,
        typeConfig: { label: 'dayNumber' },
        initial: !!this.config ? this.config.dayIndex + 1 : undefined,
        transform: v => v - 1,
        validators: [Validators.required],
      },
      startTimeMinutes: {
        type: FormConfigElementTypes.TIME,
        typeConfig: { label: 'startTime' },
        initial: this.extractTime(this.config?.startTimeMinutes),
        transform: (v: Time) => v.hours * 60 + v.minutes + this.timezoneOffsetMinutes,
        validators: [Validators.required],
      },
      endTimeMinutes: {
        type: FormConfigElementTypes.TIME,
        typeConfig: { label: 'endTime' },
        initial: this.extractTime(this.config?.endTimeMinutes),
        transform: (v: Time) => v.hours * 60 + v.minutes + this.timezoneOffsetMinutes,
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

  private extractTime(datetime: DateTime | null | undefined): Time | undefined {
    return datetime
      ? {
          hours: datetime.hour,
          minutes: datetime.minute,
        }
      : undefined;
  }
}
