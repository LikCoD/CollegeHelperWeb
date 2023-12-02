import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ScheduleAddLessonFormData } from '@schedule/modules/schedule-edit/dialogs/schedule-add-lesson-dialog/schedule-add-lesson-dialog.dto';
import { ScheduleGeneralLesson, ScheduleLesson } from '@schedule/entities/schedule';
import { ScheduleService } from '@schedule/services/schedule.service';
import { LessonsService } from '@schedule/services/lessons.service';
import { GeneralLessonsService } from '@schedule/services/generalLessons.service';
import { CrudService } from '@shared/services/crud.service';
import { ScheduleAddGeneralLessonFormData } from '@schedule/modules/schedule-edit/dialogs/schedule-add-genral-lesson-dialog/schedule-add-general-lesson-dialog.dto';

@Injectable({
  providedIn: 'root',
})
export class ScheduleLessonActionsService {
  private service = inject(ScheduleService);
  private lessonsService = inject(LessonsService);
  private generalLessonsService = inject(GeneralLessonsService);

  get isGeneral(): boolean {
    return this.service.isGeneral;
  }

  get crudService(): CrudService<
    ScheduleLesson | ScheduleGeneralLesson,
    ScheduleAddLessonFormData | ScheduleAddGeneralLessonFormData
  > {
    return this.isGeneral ? this.generalLessonsService : this.lessonsService;
  }

  addLesson(
    dto: ScheduleAddLessonFormData | ScheduleAddGeneralLessonFormData
  ): Observable<ScheduleLesson | ScheduleGeneralLesson> {
    return this.crudService.post(dto);
  }

  editLesson(
    id: string,
    dto: ScheduleAddLessonFormData | ScheduleAddGeneralLessonFormData
  ): Observable<ScheduleLesson | ScheduleGeneralLesson> {
    return this.crudService.put(id, dto);
  }

  deleteLesson(lesson: ScheduleLesson | ScheduleGeneralLesson): Observable<void> {
    return this.crudService.delete(lesson.id!, lesson);
  }
}
