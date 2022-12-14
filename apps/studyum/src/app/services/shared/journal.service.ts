import {Injectable} from "@angular/core"
import {JournalHttpService} from "../http/journal-http.service"
import {Observable, Subject, tap} from "rxjs"
import {Journal, JournalOption} from "../../models/journal"
import * as moment from "moment"

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

  findDay(dayDate: moment.Moment): number[] {
    let dayFormatted = dayDate.format("DD MM YYYY")

    let dates = this.journal.dates
    let monthIndex = this.findMonth(dayDate)
    for (let j = 0; j < dates[monthIndex].length; j++) {
      if (dates[monthIndex][j][0].startDate.format("DD MM YYYY") !== dayFormatted) continue

      return [monthIndex, j]
    }

    return [-1, -1]
  }

  findMonth(monthDate: moment.Moment): number {
    let monthFormat = monthDate.format("MM YYYY")

    let dates = this.journal.dates
    for (let i = 0; i < dates.length; i++) {
      if (dates[i][0][0].startDate.format("MM YYYY") !== monthFormat) continue

      return i
    }

    return -1
  }

  split(type: string): void {
    let journals = this.journal.rows
      .filter(r => r.lessons.flat(2).find(l => l.type === type))
      .map(r => <Journal>{dates: r.lessons, rows: [r], info: this.journal.info})

    this.journal$.next(journals)
  }
}
