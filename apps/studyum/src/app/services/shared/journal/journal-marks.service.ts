import {Injectable} from "@angular/core"
import {JournalHttpService} from "../../http/journal-http.service"
import {
  Absence,
  CellResponse,
  Journal,
  JournalCell,
  Mark,
} from "../../../models/journal"
import {JournalService} from "./journal.service"
import {JournalCellService, Point} from "./journal.cell.service"
import {Subject} from "rxjs"

@Injectable({
  providedIn: "root",
})
export class JournalMarksService {
  refresh$ = new Subject<JournalCell>()

  constructor(
    private http: JournalHttpService,
    private journalService: JournalService,
    private cellService: JournalCellService
  ) {}

  private get journal(): Journal {
    return this.journalService.journal
  }

  addMark(point: Point, mark: Mark): void {
    this.cellService.points$.value.forEach((p) => {
      let row = this.journal.rows[p.y]
      let lesson = row.cells.flat(2)[p.x]
      mark.studentID = row.id
      mark.lessonID = lesson.id

      this.http.addMark(mark).subscribe({
        next: (response) => this.refresh(p, response),
      })
    })
  }

  editMark(point: Point, mark: Mark): void {
    let row = this.journal.rows[point.y]
    mark.studentID = row.id

    this.http.editMark(mark).subscribe({
      next: (response) => this.refresh(point, response),
    })
  }

  deleteMark(point: Point, id: string): void {
    this.http.deleteMark(id).subscribe({
      next: (response) => this.refresh(point, response),
    })
  }

  truncate(point: Point, marks: Mark[]): void {
    this.cellService.points$.value.forEach((p) => {
      let lesson = this.journal.rows[p.y].cells.flat(2)[p.x]
      lesson.marks?.forEach((m) => this.deleteMark(p, m.id!!))
    })
  }

  addAbsence(point: Point, absence: Absence): void {
    this.cellService.points$.value.forEach((p) => {
      let row = this.journal.rows[p.y]
      let lesson = row.cells.flat(2)[p.x]
      absence.studentID = row.id
      absence.lessonID = lesson.id!!

      this.http.setAbsence(absence).subscribe({
        next: (response) => this.refresh(p, response),
      })
    })
  }

  editAbsence(point: Point, absence: Absence) {
    let row = this.journal.rows[point.y]
    absence.studentID = row.id

    this.http.updateAbsence(absence).subscribe({
      next: (response) => this.refresh(point, response),
    })
  }

  deleteAbsence(point: Point, id: string) {
    this.http.removeAbsence(id).subscribe({
      next: (response) => this.refresh(point, response),
    })
  }

  refresh(point: Point, response: CellResponse): void {
    const row = this.journal.rows[point.y]
    const i = row.cells.flat(2)[point.x].indexes!
    response.cell.point = point
    response.cell.indexes = i

    row.cells[i.monthIndex][i.dayIndex][i.lessonIndex] = response.cell
    row.averageMark = response.average
    row.marksAmount = response.markAmount
    row.color = response.rowColor

    this.refresh$.next(response.cell)
  }
}
