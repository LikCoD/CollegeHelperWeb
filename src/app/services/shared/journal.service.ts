import {Injectable} from '@angular/core';
import {JournalHttpService} from "../http/journal-http.service";
import {Observable} from "rxjs";
import {Journal, JournalOption, Mark} from "../../models/journal";
import {Lesson} from "../../models/schedule";
import * as moment from "moment";
import {compareDates} from "../../utils";

@Injectable({providedIn: 'root'})
export class JournalService {
  journal$: Observable<Journal>
  options$: Observable<JournalOption[]>

  constructor(private httpService: JournalHttpService) {

  }

  getJournal(group: string, subject: string, teacher: string): Observable<Journal> {
    this.journal$ = this.httpService.getJournal(group, subject, teacher)
    return this.journal$
  }

  getOptions(): Observable<JournalOption[]> {
    this.options$ = this.httpService.getOptions()
    return this.options$
  }

  addMark(mark: Mark): Observable<Mark> {
    return this.httpService.addMark(mark)
  }

  editMark(mark: Mark): Observable<Mark> {
    return this.httpService.editMark(mark)
  }

  deleteMark(id: string): Observable<string> {
    return this.httpService.deleteMark(id)
  }

  groupDate(journal: Journal, lesson: Lesson, unit: moment.unitOfTime.StartOf) {
    let addNew = true
    let collapse = lesson.collapsedType

    if (collapse != undefined && unit == "day" && collapse == "month") unit = "month"

    let indexes: number[] = []
    journal.dates.forEach((value, index) => {
      if (!compareDates(value.startDate, lesson.startDate, unit)) return

      if (value.collapsedType == unit) addNew = false

      if (value.collapsedType == undefined) indexes.push(index)
      value.collapsed = (collapse == undefined && value.collapsedType != unit) || (collapse != undefined && value.collapsedType != undefined)
    })

    if (!addNew) return

    journal.dates.splice(indexes[0], 0, {...lesson, collapsed: false, collapsedType: unit})

    journal.rows.forEach(row => {
      let collapsedLesson = <Lesson>{
        ...row.lessons[indexes[0]],
        marks: [],
      }

      indexes.forEach(i => {
        collapsedLesson.marks = collapsedLesson.marks!!.concat(row.lessons[i].marks!!)
      })

      row.lessons.splice(indexes[0], 0, collapsedLesson)
    })
  }

  expand(journal: Journal) {
    journal.dates.forEach(value => {
      value.collapsed = value.collapsedType != undefined
    })
  }
}
