import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ScheduleLessonSelectComponent } from '@schedule/modules/schedule-edit/components/schedule-lesson-select/schedule-lesson-select.component';
import { ScheduleLessonComponent } from '@schedule/components/schedule-lesson/schedule-lesson.component';
import { TextInputComponent } from '@ui/inputs/text-input/text-input.component';
import { SecondaryButtonComponent } from '@shared/modules/ui/components/buttons/secondary-button.component';
import { ReactiveFormsModule } from '@angular/forms';
import { MatTooltipModule } from '@angular/material/tooltip';
import { TranslateModule } from '@ngx-translate/core';
import { P1Component } from '@ui/text/p1.component';
import { Head2Component } from '@ui/text/head2.component';
import { ScheduleAddLessonDialogComponent } from './dialogs/schedule-add-lesson-dialog/schedule-add-lesson-dialog.component';
import { DefaultFormComponent } from '@ui/forms/default-form/default-form.component';
import { CharacterComponent } from '@ui/images/character.component';
import { MatDialogModule } from '@angular/material/dialog';
import { ScheduleAddLessonViewComponent } from './components/schedule-add-lesson-view/schedule-add-lesson-view.component';
import { translatePrefixProvider } from '@translate/translate.prefix-provider';



@NgModule({
  declarations: [
    ScheduleLessonSelectComponent,
    ScheduleAddLessonDialogComponent,
    ScheduleAddLessonViewComponent,
  ],
  exports: [ScheduleLessonSelectComponent, ScheduleAddLessonViewComponent],
  imports: [
    CommonModule,
    ScheduleLessonComponent,
    TextInputComponent,
    SecondaryButtonComponent,
    ReactiveFormsModule,
    MatTooltipModule,
    TranslateModule,
    P1Component,
    Head2Component,
    DefaultFormComponent,
    CharacterComponent,
    MatDialogModule,
  ],
  providers: [
    translatePrefixProvider('edit')
  ]
})
export class ScheduleEditModule {}
