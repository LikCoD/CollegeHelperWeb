import { inject, Injectable } from '@angular/core';
import { Observable, tap } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { ScheduleAddLessonFormData } from '@schedule/modules/schedule-edit/dialogs/schedule-add-lesson-dialog/schedule-add-lesson-dialog.dto';
import { ScheduleLesson, ScheduleLessonSchema } from '@schedule/entities/schedule';
import { ScheduleService } from '@schedule/services/schedule.service';
import { validate } from '@shared/rxjs/pipes/validate';

@Injectable({
  providedIn: 'root',
})
export class ScheduleLessonActionsService {
  private http = inject(HttpClient);
  private service = inject(ScheduleService);

  addLesson(dto: ScheduleAddLessonFormData): Observable<ScheduleLesson> {
    return this.http
      .post<ScheduleLesson>('api/v1/schedule/lessons', dto)
      .pipe(validate(ScheduleLessonSchema))
      .pipe(
        tap(lesson => {
          const lessons = [...this.service.lessons];
          lessons.push(lesson);
          this.service.lessons = lessons;
        })
      );
  }

  editLesson(id: string, dto: ScheduleAddLessonFormData): Observable<ScheduleLesson> {
    return this.http
      .put<ScheduleLesson>(`api/v1/schedule/lessons/${id}`, dto)
      .pipe(validate(ScheduleLessonSchema))
      .pipe(
        tap(lesson => {
          const lessons = [...this.service.lessons];
          for (let i = 0; i < lessons.length; i++) {
            if (lessons[i].id === lesson.id) lessons[i] = lesson;
          }
          this.service.lessons = lessons;
        })
      );
  }

  deleteLesson(lesson: ScheduleLesson): Observable<void> {
    return this.http
      .delete<void>(`api/v1/schedule/lessons/${lesson.id}`)
      .pipe(
        tap(() => (this.service.lessons = this.service.lessons.filter(l => l.id !== lesson.id)))
      );
  }
}
