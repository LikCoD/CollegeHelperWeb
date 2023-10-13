import { inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { validate } from '@shared/rxjs/pipes/validate';
import { JournalCategory, JournalOption, JournalOptionsScheme } from '@journal/modules/landing/entities/options';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class JournalOptionsService {
  private http = inject(HttpClient);

  getOptions(): Observable<JournalCategory[]> {
    return this.http.get<JournalCategory[]>('api/v1/journal/options').pipe(validate(JournalOptionsScheme));
  }
}
