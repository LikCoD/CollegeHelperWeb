import {Injectable} from "@angular/core"
import {JournalHttpService} from "../http/journal-http.service"
import {Observable, Subject, tap} from "rxjs"
import {Journal, JournalOption} from "../../models/journal"

@Injectable({providedIn: "root"})
export class JournalService {
  journal$ = new Subject<Journal[]>()
  options$: Observable<JournalOption[]>

  journal: Journal

  constructor(private httpService: JournalHttpService) {
  }

  getJournal(group: string, subject: string, teacher: string): Observable<Journal[]> {
    this.httpService.getJournal(group, subject, teacher).pipe(
      tap(j => this.journal = j)).subscribe({
      next: value => this.journal$.next([{...value, dates: [...value.dates]}])
    })
    return this.journal$
  }

  getOptions(): Observable<JournalOption[]> {
    this.options$ = this.httpService.getOptions()
    return this.options$
  }
}
