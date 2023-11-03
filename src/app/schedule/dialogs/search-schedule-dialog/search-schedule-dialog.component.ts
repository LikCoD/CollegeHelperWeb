import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DefaultFormComponent } from '@ui/forms/default-form/default-form.component';
import { Validators } from '@angular/forms';
import {
  SearchScheduleFormConfig,
  SearchScheduleFormData,
} from '@schedule/dialogs/search-schedule-dialog/search-schedule-dialog.dto';
import { SearchScheduleDialogService } from '@schedule/dialogs/search-schedule-dialog/search-schedule-dialog.service';
import { translatePrefixProvider } from '@translate/translate.prefix-provider';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { FormConfig, FormConfigElementTypes } from '@shared/modules/ui/entities/form.config';
import { DateTime } from 'luxon';
import { CharacterComponent } from '@ui/images/character.component';
import { environment } from '../../../../enviroments/environment';

@Component({
  selector: 'app-search-schedule-dialog',
  standalone: true,
  imports: [CommonModule, DefaultFormComponent, CharacterComponent],
  templateUrl: './search-schedule-dialog.component.html',
  styleUrls: ['./search-schedule-dialog.component.scss'],
  providers: [translatePrefixProvider('search')],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SearchScheduleDialogComponent {
  private dialog = inject(MatDialogRef);
  private service = inject(SearchScheduleDialogService);
  private config = inject<SearchScheduleFormData>(MAT_DIALOG_DATA);
  formConfig: FormConfig<SearchScheduleFormConfig> = {
    elements: {
      studyPlaceID: {
        type: FormConfigElementTypes.SEARCHABLE_SELECT,
        typeConfig: {
          label: 'studyPlace',
          items: this.service.studyPlaceList$,
        },
        hidden: environment.standalone,
        initial: environment.studyPlaceID,
        validators: [Validators.required],
      },
      type: {
        type: FormConfigElementTypes.SELECT,
        typeConfig: {
          label: 'type',
          items: ['group', 'teacher', 'subject', 'room'],
        },
        initial: this.config.type!,
        validators: [Validators.required],
      },
      typename: {
        type: FormConfigElementTypes.AUTOCOMPLETE_TEXT,
        typeConfig: {
          label: 'typename',
          items: [],
        },
        dependable: {
          dependsOn: 'type',
          cacheable: true,
          dependsItems: item => this.service.getTypeNames(item),
        },
        initial: this.config.typename!,
        validators: [Validators.required],
      },
      range: {
        type: FormConfigElementTypes.DATE_RANGE,
        typeConfig: {
          label: 'range',
          expand: true,
          startControlName: 'startDate',
          endControlName: 'endDate',
          utc: true,
        },
        initial: {
          start: this.config.startDate ?? null,
          end: this.config.endDate ?? null,
        },
        formatter: (date: DateTime) => date?.toISO(),
      },
    },
  };

  onSubmit(data: SearchScheduleFormData): void {
    this.dialog.close(data);
  }
}
