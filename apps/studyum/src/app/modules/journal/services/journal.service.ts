import {Injectable} from "@angular/core"
import {JournalHttpService} from "./http/journal-http.service"
import {Observable, Subject, tap} from "rxjs"
import {Journal, JournalOption} from "../../../shared/models/journal"
import * as moment from "moment"
import {saveAs} from "file-saver"
import {Lesson} from "../../../shared/models/schedule"

@Injectable({providedIn: "root"})
export class JournalService {
  journal$ = new Subject<Journal[]>()
  options$: Observable<JournalOption[]>

  journal: Journal

  constructor(private httpService: JournalHttpService) {}

  getJournal(group: string, subject: string, teacher: string): Observable<Journal[]> {
    this.httpService
      .getJournal(group, subject, teacher)
      .pipe(tap((j) => (this.journal = j)))
      .subscribe({
        next: (value) => this.journal$.next([{...value, dates: [...value.dates]}]),
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
    function copyDates(date: Lesson[][][]): Lesson[][][] {
      let newDates: Lesson[][][] = []
      date.forEach((m, mI) => {
        newDates.push([])
        m.forEach((d, dI) => {
          newDates[mI].push([])
          d.forEach((l) => {
            newDates[mI][dI].push({...l})
          })
        })
      })
      return newDates
    }

    let journals = this.journal.rows
      .filter((j) => !!j.cells.flat(2).find((l) => l.type?.includes(type)))
      .map((r) => {
        let j = <Journal>{dates: copyDates(this.journal.dates), rows: [r], info: this.journal.info}
        j.dates.forEach((m, mI) =>
          m.forEach((d, dI) =>
            d.forEach((l, lI) => {
              l.type =
                r.cells[mI][dI][lI].type?.find((v) => v === type) ??
                r.cells[mI][dI][lI].type?.at(0) ??
                ""
            })
          )
        )
        return j
      })

    this.journal$.next(journals)
  }

  unite() {
    this.journal$.next([this.journal])
  }

  generateMarks(options: any): void {
    this.httpService.generateMarks(options).subscribe({
      next: (f) => {
        saveAs(f, "report.xlsx")
      },
    })
  }

  generateAbsences(options: any): void {
    this.httpService.generateAbsences(options).subscribe({
      next: (f) => {
        saveAs(f, "report.xlsx")
      },
    })
  }
}
