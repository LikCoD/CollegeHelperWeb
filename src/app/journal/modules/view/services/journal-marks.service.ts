import { inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Absence, JournalLesson, Mark } from '@journal/modules/view/entites/journal';
import { Observable } from 'rxjs';
import { AddAbsenceDTO, AddMarkDTO } from '@journal/modules/view/entites/journal-marks.dto';
import { validate } from '@shared/rxjs/pipes/validate';
import { JournalLessonScheme } from '@journal/modules/view/entites/schemes/journal.scheme';

@Injectable({
  providedIn: 'root',
})
export class JournalMarksService {
  private http = inject(HttpClient);

  getLesson(lessonID: string, studentID: string): Observable<JournalLesson> {
    return this.http
      .get<JournalLesson>(`api/v1/journal/lessons/${lessonID}`, {
        params: { studentID: studentID },
      })
      .pipe(validate(JournalLessonScheme));
  }

  addMark(mark: AddMarkDTO): Observable<JournalLesson> {
    return this.http
      .post<JournalLesson>('api/v1/journal/marks', mark)
      .pipe(validate(JournalLessonScheme));
  }

  removeMark(mark: Mark): Observable<JournalLesson> {
    return this.http
      .delete<JournalLesson>(`api/v1/journal/marks/${mark.id}`)
      .pipe(validate(JournalLessonScheme));
  }

  addAbsence(absence: AddAbsenceDTO): Observable<JournalLesson> {
    return this.http
      .post<JournalLesson>('api/v1/journal/absences', absence)
      .pipe(validate(JournalLessonScheme));
  }

  removeAbsence(absence: Absence): Observable<JournalLesson> {
    return this.http
      .delete<JournalLesson>(`api/v1/journal/absences/${absence.id}`)
      .pipe(validate(JournalLessonScheme));
  }
}
