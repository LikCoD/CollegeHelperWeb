import { inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Absence, JournalCell, Mark } from '@journal/modules/view/entites/journal';
import { map, Observable } from 'rxjs';
import { AddAbsenceDTO, AddMarkDTO } from '@journal/modules/view/entites/journal-marks.dto';

@Injectable({
  providedIn: 'root',
})
export class JournalMarksService {
  private http = inject(HttpClient);

  //todo responses

  addMark(mark: AddMarkDTO): Observable<JournalCell> {
    return this.http
      .post<{ cell: JournalCell }>('api/v1/journal/marks', mark)
      .pipe(map(d => d.cell));
  }

  removeMark(mark: Mark): Observable<JournalCell> {
    return this.http
      .delete<{ cell: JournalCell }>(`api/v1/journal/marks/${mark.id}`)
      .pipe(map(d => d.cell));
  }

  addAbsence(absence: AddAbsenceDTO): Observable<JournalCell> {
    return this.http
      .post<{ cell: JournalCell }>('api/v1/journal/absences', absence)
      .pipe(map(d => d.cell));
  }

  removeAbsence(absence: Absence): Observable<JournalCell> {
    return this.http
      .delete<{ cell: JournalCell }>(`api/v1/journal/absences/${absence.id}`)
      .pipe(map(d => d.cell));
  }
}
