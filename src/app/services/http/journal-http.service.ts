import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {map, Observable} from "rxjs";
import {Journal, JournalOption} from "../../models";
import * as moment from "moment";
import {Options} from "../../data";

@Injectable({providedIn: 'root'})
export class JournalHttpService {
  constructor(private http: HttpClient) {
  }

  getJournal(group: string, subject: string, teacher: string): Observable<Journal>  {
    return this.http.get<Journal>(`api/journal/${group}/${subject}/${teacher}`).pipe(map(journal => {
      for (let i = 0; i < journal.dates.length; i++) {
        journal.dates[i].startDate = moment.utc(journal.dates[i].startDate)
        journal.dates[i].endDate = moment.utc(journal.dates[i].endDate)
      }

      return journal
    }))
  }

  getOptions(): Observable<JournalOption[]> {
    return this.http.get<Options[]>("api/journal/options")
  }
}
