import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ScheduleLessonSelectComponent } from '@schedule/modules/schedule-edit/components/schedule-lesson-select/schedule-lesson-select.component';
import { TextInputComponent } from '@ui/inputs/text-input/text-input.component';
import { SecondaryButtonComponent } from '@shared/modules/ui/components/buttons/secondary-button.component';
import { ReactiveFormsModule } from '@angular/forms';
import { MatTooltipModule } from '@angular/material/tooltip';
import { P1Component } from '@ui/text/p1.component';
import { Head2Component } from '@ui/text/head2.component';
import { ScheduleAddLessonDialogComponent } from './dialogs/schedule-add-lesson-dialog/schedule-add-lesson-dialog.component';
import { DefaultFormComponent } from '@ui/forms/default-form/default-form.component';
import { CharacterComponent } from '@ui/images/character.component';
import { MatDialogModule } from '@angular/material/dialog';
import { ScheduleAddLessonViewComponent } from './components/schedule-add-lesson-view/schedule-add-lesson-view.component';
import { ScheduleLessonActionsComponent } from './components/schedule-lesson-actions/schedule-lesson-actions.component';
import { IconComponent } from '@ui/images/icon.component';
import { MatMenuModule } from '@angular/material/menu';
import { ConfirmationDialogComponent } from '@shared/modules/ui/components/dialogs/confirmation-dialog/confirmation-dialog.component';
import { ScheduleLessonComponent } from '@schedule/components/schedule-lesson/schedule-lesson.component';
import { SecondaryContainerComponent } from '@shared/modules/ui/components/containers/secondary-container.component';
import { provideTranslationSuffix, TranslatePipe } from 'i18n';

@NgModule({
  declarations: [
    ScheduleLessonSelectComponent,
    ScheduleAddLessonDialogComponent,
    ScheduleAddLessonViewComponent,
    ScheduleLessonActionsComponent,
  ],
  exports: [
    ScheduleLessonSelectComponent,
    ScheduleAddLessonViewComponent,
    ScheduleLessonActionsComponent,
  ],
  imports: [
    CommonModule,
    ScheduleLessonComponent,
    TextInputComponent,
    SecondaryButtonComponent,
    ReactiveFormsModule,
    MatTooltipModule,
    P1Component,
    Head2Component,
    DefaultFormComponent,
    CharacterComponent,
    MatDialogModule,
    IconComponent,
    MatMenuModule,
    ConfirmationDialogComponent,
    SecondaryContainerComponent,
    TranslatePipe,
  ],
  providers: [provideTranslationSuffix('edit')],
})
export class ScheduleEditModule {}
