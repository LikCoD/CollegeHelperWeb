import {Injectable} from "@angular/core"
import {HttpClient} from "@angular/common/http"
import {map, Observable} from "rxjs"
import * as moment from "moment"
import {Absence, Journal, JournalOption, Mark} from "../../models/journal"
import {Lesson} from "../../models/schedule"
import {groupBy} from "../../utils"

@Injectable({providedIn: "root"})
export class JournalHttpService {
  constructor(private http: HttpClient) {
  }

  getJournal(group: string, subject: string, teacher: string): Observable<Journal> {
    let url = `api/journal`
    if (group != "" && subject != "" && teacher != "") url += `/${group}/${subject}/${teacher}`

    return this.http.get<Journal>(url).pipe(map(journal => {
      journal.info.time = moment(journal.info.time)

      let dates: Lesson[] = journal.dates as unknown as Lesson[]
      dates.forEach(l => {
        l.startDate = moment.utc(l.startDate)
        l.endDate = moment.utc(l.endDate)
      })

      let dateDays = new Array(...groupBy(dates, el => el.startDate.dayOfYear()).values())
      journal.dates = new Array(...groupBy(dateDays, el => el[0].startDate.month()).values())

      journal.rows.forEach((row, rowIndex) => {
        let lessons: Lesson[] = row.lessons as unknown as Lesson[]
        lessons.forEach(l => {
          l.startDate = moment.utc(l.startDate)
          l.endDate = moment.utc(l.endDate)
        })

        for (let i = 0; i < lessons.length; i++) {
          if (lessons[i] != null) {
            lessons[i].point = {x: i, y: rowIndex}
            continue
          }

          lessons[i] = <Lesson>{
            startDate: dates[i].startDate.clone(),
            endDate: dates[i].startDate.clone(),
            group: "",
            primaryColor: "",
            room: "",
            subject: "",
            teacher: "",
            point: {x: i, y: rowIndex}
          }
        }

        let rowDays = new Array(...groupBy(lessons, el => el.startDate.dayOfYear()).values())
        row.lessons = new Array(...groupBy(rowDays, el => el[0].startDate.month()).values())
      })

      return journal
    }))
  }

  getOptions(): Observable<JournalOption[]> {
    return this.http.get<JournalOption[]>("api/journal/options")
  }

  addMark(mark: Mark): Observable<Mark> {
    return this.http.post<Mark>("api/journal/mark", mark)
  }

  editMark(mark: Mark): Observable<Mark> {
    return this.http.put<Mark>("api/journal/mark", mark)
  }

  deleteMark(id: string): Observable<string> {
    return this.http.delete<string>(`api/journal/mark/${id}`)
  }

  setAbsence(data: any, absenceMark: string): Observable<Absence> {
    return this.http.post<Absence>(`api/journal/absences`, data).pipe(map(v => {
      return <Absence>{...v, mark: v.time ? v.time : absenceMark}
    }))
  }

  removeAbsence(id: string): Observable<string> {
    return this.http.delete<string>(`api/journal/absences/${id}`)
  }

  updateAbsence(data: any, absenceMark: string) {
    return this.http.put<Absence>(`api/journal/absences`, data).pipe(map(v => {
      return <Absence>{...v, mark: v.time ? v.time : absenceMark}
    }))
  }
}
