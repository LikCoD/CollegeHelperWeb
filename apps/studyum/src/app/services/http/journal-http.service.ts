import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map, Observable } from 'rxjs';
import * as moment from 'moment';
import { Journal, JournalOption, Mark } from '../../models/journal';
import {Lesson} from "../../models/schedule";

@Injectable({ providedIn: 'root' })
export class JournalHttpService {
  constructor(private http: HttpClient) {
  }

  getJournal(group: string, subject: string, teacher: string): Observable<Journal> {
    let url = `api/journal`;
    if (group != '' && subject != '' && teacher != '') url += `/${group}/${subject}/${teacher}`;

    return this.http.get<Journal>(url).pipe(map(journal => {
      for (let i = 0; i < journal.dates.length; i++) {
        journal.dates[i].startDate = moment.utc(journal.dates[i].startDate);
        journal.dates[i].endDate = moment.utc(journal.dates[i].endDate);
      }

      journal.rows.forEach(row => {
        for (let i = 0; i < row.lessons.length; i++) {
          if (row.lessons[i].subject == "") {
            row.lessons[i] = <Lesson>{
              startDate: journal.dates[i].startDate.clone(),
              endDate: journal.dates[i].startDate.clone(),
              group: "",
              primaryColor: "",
              room: "",
              subject: "",
              teacher: ""
            }
          }

          row.lessons[i].endDate = moment.utc(row.lessons[i].endDate);
          row.lessons[i].startDate = moment.utc(row.lessons[i].startDate);

          row.lessons[i].collapsed = false;
        }
      });

      return journal;
    }));
  }

  getAbsentJournal(group: string, subject: string, teacher: string): Observable<Journal> {
    let url = `api/journal/absent`;
    if (group != '' && subject != '' && teacher != '') url += `/${group}/${subject}/${teacher}`;

    return this.http.get<Journal>(url).pipe(map(journal => {
      for (let i = 0; i < journal.dates.length; i++) {
        journal.dates[i].startDate = moment.utc(journal.dates[i].startDate);
        journal.dates[i].endDate = moment.utc(journal.dates[i].endDate);
      }

      journal.rows.forEach(row => {
        row.lessons.forEach(lesson => {
          lesson.endDate = moment.utc(lesson.endDate);
          lesson.startDate = moment.utc(lesson.startDate);

          lesson.collapsed = false;
        });
      });

      return journal;
    }));
  }

  getOptions(): Observable<JournalOption[]> {
    return this.http.get<JournalOption[]>('api/journal/options');
  }

  addMark(mark: Mark): Observable<Mark> {
    return this.http.post<Mark>('api/journal/mark', mark);
  }

  editMark(mark: Mark): Observable<Mark> {
    return this.http.put<Mark>('api/journal/mark', mark);
  }

  deleteMark(id: string): Observable<string> {
    return this.http.delete<string>(`api/journal/mark?id=${id}`);
  }

  setAbsent(data: any, absentMark: string): Observable<Mark> {
    return this.http.post<Mark>(`api/journal/absences`, data).pipe(map(v => {
      return <Mark>{ ...v, mark: v.time ? v.time : absentMark };
    }));
  }

  removeAbsent(id: string): Observable<string> {
    return this.http.delete<string>(`api/journal/absences/${id}`);
  }

  updateAbsent(data: any, absentMark: string) {
    return this.http.put<Mark>(`api/journal/absences`, data).pipe(map(v => {
      return <Mark>{ ...v, mark: v.time ? v.time : absentMark };
    }));
  }
}
