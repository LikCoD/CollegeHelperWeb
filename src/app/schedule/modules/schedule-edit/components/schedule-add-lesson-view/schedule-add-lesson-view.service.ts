import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { ScheduleAddLessonFormData } from '@schedule/modules/schedule-edit/dialogs/schedule-add-lesson-dialog/schedule-add-lesson-dialog.dto';

@Injectable({
  providedIn: 'root',
})
export class ScheduleAddLessonViewService {
  private http = inject(HttpClient);

  addLesson(lesson: ScheduleAddLessonFormData): Observable<void> {
    return this.http.post<void>('api/v1/schedule/lessons', lesson);
  }
}
