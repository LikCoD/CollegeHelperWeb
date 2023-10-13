import { inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { GetJournalDTO } from '@journal/modules/view/entites/journal.dto';
import { Journal, JournalScheme } from '@journal/modules/view/entites/journal';
import { Observable } from 'rxjs';
import { validate } from '@shared/rxjs/pipes/validate';

@Injectable({
  providedIn: 'root',
})
export class JournalViewService {
  private http = inject(HttpClient);

  getJournal(dto: GetJournalDTO): Observable<Journal> {
    return this.http.get<Journal>('api/v1/journal', { params: dto }).pipe(validate(JournalScheme));
  }
}
