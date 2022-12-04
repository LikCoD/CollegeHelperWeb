import {Injectable} from "@angular/core"
import {JournalHttpService} from "../http/journal-http.service"
import {Observable, Subject, tap} from "rxjs"
import {Journal, JournalOption, Mark} from "../../models/journal"
import {Lesson} from "../../models/schedule"
import * as moment from "moment"
import {JournalColors, LessonType, StudyPlace} from "../../models/general"

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

  getCellColor(colors: JournalColors, types: LessonType[], lessonType: string, date: moment.Moment, marks: Mark[]): string {
    let color = colors.general
    for (let mark of marks) {
      let type = types.find(v => v.type === lessonType)
      if (type === undefined) return color = colors.general

      let markType = type.marks.find(m => m.mark === mark.mark)
      if (markType === undefined || markType.workOutTime === 0) return colors.general

      color = date.clone().add(markType.workOutTime, "second") > moment.utc() ? colors.warning : colors.danger
    }

    return color
  }

  addMark(studyPlace: StudyPlace, lesson: Lesson, mark: Mark) {
    return this.httpService.addMark(mark).subscribe({
      next: value => {
        if (lesson.marks == undefined)
          lesson.marks = []

        lesson.marks.push(value)

        let row = this.journal.rows.find(r => r.id === value.studentID)!
        if (!!Number.parseInt(value.mark) && row) {
          row.numericMarksAmount++
          row.numericMarksSum += Number.parseInt(value.mark)
        }

        lesson.journalCellColor = this.getCellColor(studyPlace.journalColors, studyPlace.lessonTypes, lesson.type ?? "", lesson.startDate, lesson.marks)
        row.color = this.getColorOfLessons(this.journal, row.lessons)
      }
    })
  }

  editMark(studyPlace: StudyPlace, lesson: Lesson, mark: Mark) {
    this.httpService.editMark(mark).subscribe({
      next: value => {
        lesson.marks!![lesson!!.marks?.findIndex(v => v.id == value.id)!!] = value

        let row = this.journal.rows.find(r => r.id === value.studentID)!
        if (!!Number.parseInt(value.mark) && row) {
          row.numericMarksSum += Number.parseInt(value.mark) - Number.parseInt(mark.mark) ?? 0
        }

        lesson.journalCellColor = this.getCellColor(studyPlace.journalColors, studyPlace.lessonTypes, lesson.type ?? "", lesson.startDate, lesson.marks!!)
        row.color = this.getColorOfLessons(this.journal, row.lessons)
      }
    })
  }

  deleteMark(studyPlace: StudyPlace, lesson: Lesson, id: string) {
    this.httpService.deleteMark(id).subscribe({
      next: value => {
        let mark = lesson.marks?.find(v => v.id === value)!
        lesson.marks = lesson.marks?.filter(v => v.id !== value)

        let row = this.journal.rows.find(r => r.id === mark.studentID)!
        if (!!Number.parseInt(mark.mark) && row) {
          row.numericMarksAmount--
          row.numericMarksSum -= Number.parseInt(mark.mark)
        }

        lesson.journalCellColor = this.getCellColor(studyPlace.journalColors, studyPlace.lessonTypes, lesson.type ?? "", lesson.startDate, lesson.marks!!)
        row.color = this.getColorOfLessons(this.journal, row.lessons)
      }
    })
  }

  getColorOfLessons(journal: Journal, lessons: Lesson[][][]) {
    let colors = journal.info.studyPlace.journalColors
    let color = colors.general

    lessons.find(m => m.find(d => d.find(l => {
      if (l.journalCellColor == colors.warning) color = colors.warning
      if (l.journalCellColor == colors.danger) {
        color = colors.danger
        return true
      }

      return false
    })))

    return color
  }

  selectStandaloneType(type: string) {
    if (this.journal.rows.find(r => r.lessons.find(m => m.find(d => d.find(l => l?.teacher == ""))))) {
      let journals: Journal[] = []
      this.journal.rows.forEach(row => {
        let lessons = [...row.lessons]
        lessons.forEach(m => m.forEach(d => d.forEach(l => {
          l.visible = l.type == type
        })))

        journals.push(<Journal>{
          dates: lessons,
          rows: [{...row, lessons: lessons}],
          info: this.journal.info
        })
      })

      if (journals.length > 0) this.journal$.next(journals)
      return
    }

    this.journal.dates.forEach(m => m.forEach(d => d.forEach(l => {
      l.visible = l.type == type
    })))
  }

  setAbsence(lesson: Lesson, id: string, time: number | null) {
    return this.httpService.setAbsence(
      {lessonID: lesson.id, studentID: id, time: time},
      this.journal.info.studyPlace.absenceMark
    )
  }

  removeAbsence(id: string) {
    return this.httpService.removeAbsence(id)
  }

  updateAbsence(lesson: Lesson, id: string, time: number | null) {
    return this.httpService.updateAbsence(
      {id: lesson.absences!![0].id, lessonID: lesson.id, studentID: id, time: time},
      this.journal.info.studyPlace.absenceMark
    )
  }
}
