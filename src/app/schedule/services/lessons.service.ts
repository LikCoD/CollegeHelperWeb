import { inject, Injectable } from '@angular/core';
import { CrudService } from '@shared/services/crud.service';
import { ScheduleLesson, ScheduleLessonSchema } from '@schedule/entities/schedule';
import { ScheduleService } from '@schedule/services/schedule.service';
import { ScheduleAddLessonFormData } from '@schedule/modules/schedule-edit/dialogs/schedule-add-lesson-dialog/schedule-add-lesson-dialog.dto';

@Injectable({ providedIn: 'root' })
export class LessonsService extends CrudService<ScheduleLesson, ScheduleAddLessonFormData> {
  private service = inject(ScheduleService);

  constructor() {
    super('api/v1/schedule/lessons');
    this.schema = ScheduleLessonSchema;
    this.onAction = {
      POST: response => {
        const lessons = [...this.service.lessons];
        lessons.push(response);
        this.service.lessons = lessons;
      },
      PUT: response => {
        const lessons = [...this.service.lessons];
        for (let i = 0; i < lessons.length; i++) {
          if (lessons[i].id === response.id) lessons[i] = response;
        }
        this.service.lessons = lessons;
      },
      DELETE: (_, request) => {
        this.service.lessons = this.service.lessons.filter(l => l.id !== request.id);
      },
    };
  }
}
