import {Injectable} from "@angular/core"
import {JournalHttpService} from "../../http/journal-http.service"
import {Absence, Journal, JournalRow, Mark, MarkAmount} from "../../../models/journal"
import {JournalService} from "./journal.service"
import {JournalCellService, Point} from "./journal.cell.service"
import * as moment from "moment/moment"
import {Lesson} from "../../../models/schedule"

@Injectable({
  providedIn: "root"
})
export class JournalMarksService {

  constructor(private http: JournalHttpService, private journalService: JournalService, private cellService: JournalCellService) {
  }

  private get journal(): Journal {
    return this.journalService.journal
  }

  addMark(point: Point, mark: Mark): void {
    this.cellService.points$.value.forEach(p => {
      let row = this.journal.rows[p.y]
      let lesson = row.lessons.flat(2)[p.x]
      mark.studentID = row.id
      mark.lessonID = lesson.id

      this.http.addMark(mark).subscribe({
        next: mark => {
          if (!lesson.marks) lesson.marks = [mark]
          else lesson.marks.push(mark)

          this.refresh(this.journal.rows[p.y], lesson)
        }
      })
    })
  }

  editMark(point: Point, mark: Mark): void {
    let row = this.journal.rows[point.y]
    mark.studentID = row.id

    this.http.editMark(mark).subscribe({
      next: mark => {
        let lesson = row.lessons.flat(2)[point.x]
        let i = lesson.marks?.findIndex(m => m.id === mark.id)
        if (!i) return

        lesson.marks!![i] = mark

        this.refresh(row, lesson)
      }
    })
  }

  deleteMark(point: Point, id: string): void {
    this.http.deleteMark(id).subscribe({
      next: id => {
        let row = this.journal.rows[point.y]
        let lesson = row.lessons.flat(2)[point.x]
        lesson.marks = lesson.marks?.filter(m => m.id !== id)

        this.refresh(row, lesson)
      }
    })
  }

  truncate(point: Point, marks: Mark[]): void {
    this.cellService.points$.value.forEach(p => {
      let row = this.journal.rows[p.y]
      let lesson = row.lessons.flat(2)[p.x]

      lesson.marks?.forEach(m => this.deleteMark(p, m.id!!))
    })
  }

  addAbsence(point: Point, absence: Absence): void {
    this.cellService.points$.value.forEach(p => {
      let row = this.journal.rows[p.y]
      let lesson = row.lessons.flat(2)[p.x]
      absence.studentID = row.id
      absence.lessonID = lesson.id!!

      this.http.setAbsence(absence, this.journal.info.studyPlace.absenceMark).subscribe({
        next: absence => {
          if (!lesson.absences) lesson.absences = [absence]
          else lesson.absences.push(absence)
        }
      })
    })
  }

  editAbsence(point: Point, absence: Absence) {
    let row = this.journal.rows[point.y]
    absence.studentID = row.id

    this.http.updateAbsence(absence, this.journal.info.studyPlace.absenceMark).subscribe({
      next: absences => {
        let lesson = row.lessons.flat(2)[point.x]
        let i = lesson.absences?.findIndex(a => a.id === absences.id)
        if (!i) return

        lesson.absences!![i] = absences
      }
    })
  }

  deleteAbsence(point: Point, id: string) {
    this.http.removeAbsence(id).subscribe({
      next: id => {
        let row = this.journal.rows[point.y]
        let lesson = row.lessons.flat(2)[point.x]
        lesson.absences = lesson.absences?.filter(a => a.id !== id)
      }
    })
  }

  private refresh(row: JournalRow, lesson: Lesson): void {
    lesson.journalCellColor = this.getLessonColor(lesson)
    row.color = this.getRowColor(row)

    let marks = this.getRowNumericMarks(row)
    row.numericMarksSum = marks.reduce((s, m) => s + m, 0)
    row.numericMarksAmount = marks.length
    row.marksAmount = this.getMarksAmount(row)
  }

  private getLessonColor(lesson: Lesson): string {
    let now = moment.utc()
    let colors = this.journal.info.studyPlace.journalColors
    let lessonType = this.journal.info.studyPlace.lessonTypes.find(t => t.type === lesson.type)
    if (!lessonType) return colors.general

    let color = colors.general
    for (let mark of lesson.marks ?? []) {
      let markType = lessonType.marks.find(m => m.mark === mark.mark)
      if (markType === undefined || markType.workOutTime === 0) return colors.general

      color = lesson.startDate.clone().add(markType.workOutTime, "second") > now ? colors.warning : colors.danger
    }

    return color
  }

  private getRowColor(row: JournalRow): string {
    let colors = this.journal.info.studyPlace.journalColors
    let color = colors.general

    row.lessons.find(m => m.find(d => d.find(l => {
      if (l.journalCellColor == colors.warning) color = colors.warning
      if (l.journalCellColor == colors.danger) {
        color = colors.danger
        return true
      }

      return false
    })))

    return color
  }

  private getRowMarks = (row: JournalRow): Mark[] =>
    row.lessons.flat(2).flatMap(l => l.marks ?? [])

  private getRowNumericMarks = (row: JournalRow): number[] =>
    this.getRowMarks(row).map(m => Number(m.mark)).filter(m => !!m)

  private getMarksAmount(row: JournalRow): MarkAmount[] {
    let marks = this.journal.info.studyPlace.lessonTypes.flatMap(t => t.marks).map(t => t.mark)
    let marksMap = marks.reduce((d, m) => d.set(m, 0), new Map<string, number>)

    //TODO left map, not class array, and not fill it with 0
    let dictionary = this.getRowMarks(row).reduce(
      (d, m) => d.set(m.mark, d.get(m.mark) ? d.get(m.mark)!! + 1 : 1),
      marksMap
    )

    return Array.from(dictionary).map(v => <MarkAmount>{mark: v[0], amount: v[1]})
  }
}
