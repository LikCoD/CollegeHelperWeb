import {Injectable} from "@angular/core"
import {HttpClient} from "@angular/common/http"
import {map, Observable} from "rxjs"
import {
  CellResponse,
  Journal,
  JournalCell,
  JournalOption,
  Mark,
} from "../../models/journal"
import {Lesson} from "../../models/schedule"
import {groupBy} from "../../utils"

@Injectable({providedIn: "root"})
export class JournalHttpService {
  constructor(private http: HttpClient) {}

  getJournal(
    group: string,
    subject: string,
    teacher: string
  ): Observable<Journal> {
    let url = `api/journal`
    if (group != "" && subject != "" && teacher != "")
      url += `/${group}/${subject}/${teacher}`

    return this.http.get<Journal>(url).pipe(
      map((journal) => {
        let dates: Lesson[] = journal.dates as unknown as Lesson[]
        dates.forEach((d, i) => (d.point = {x: i, y: -1}))

        let dateDays = new Array(
          ...groupBy(dates, (el) => el.startDate.dayOfYear()).values()
        )
        journal.dates = new Array(
          ...groupBy(dateDays, (el) => el[0].startDate.month()).values()
        )

        journal.rows.forEach((row, rowIndex) => {
          let lessons: JournalCell[] = row.cells as unknown as JournalCell[]

          for (let i = 0; i < lessons.length; i++) {
            if (lessons[i] != null) {
              lessons[i].point = {x: i, y: rowIndex}
              continue
            }

            lessons[i] = <JournalCell>{point: {x: i, y: rowIndex}}
          }

          let cells = new Array<JournalCell[][]>()
          let i = 0
          journal.dates.forEach((m, mIndex) => {
            cells.push([])
            m.forEach((d, dIndex) => {
              cells[mIndex].push([])
              d.forEach((l, lIndex) => {
                const cell = lessons[i]
                cell.indexes = {
                  monthIndex: mIndex,
                  dayIndex: dIndex,
                  lessonIndex: lIndex,
                }
                cells[mIndex][dIndex].push(cell)
                i++
              })
            })
          })

          row.cells = cells
        })

        return journal
      })
    )
  }

  getOptions(): Observable<JournalOption[]> {
    return this.http.get<JournalOption[]>("api/journal/options")
  }

  addMark(mark: Mark): Observable<CellResponse> {
    return this.http.post<CellResponse>("api/journal/mark", mark)
  }

  editMark(mark: Mark): Observable<CellResponse> {
    return this.http.put<CellResponse>("api/journal/mark", mark)
  }

  deleteMark(id: string): Observable<CellResponse> {
    return this.http.delete<CellResponse>(`api/journal/mark/${id}`)
  }

  setAbsence(data: any): Observable<CellResponse> {
    return this.http.post<CellResponse>(`api/journal/absences`, data)
  }

  removeAbsence(id: string): Observable<CellResponse> {
    return this.http.delete<CellResponse>(`api/journal/absences/${id}`)
  }

  updateAbsence(data: any): Observable<CellResponse> {
    return this.http.put<CellResponse>(`api/journal/absences`, data)
  }

  generateMarks(options: any): Observable<any> {
    return this.http.post(`api/journal/generate/marks`, options, {
      responseType: "blob",
    })
  }

  generateAbsences(options: any): Observable<any> {
    return this.http.post(`api/journal/generate/absences`, options, {
      responseType: "blob",
    })
  }
}
