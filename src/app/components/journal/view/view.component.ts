import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {HttpClient} from "@angular/common/http";
import {AppComponent} from "../../../app.component";
import {JournalCellComponent} from "./cell/journal-cell.component";
import {JournalService} from "../../../services/shared/journal.service";
import {Lesson} from "../../../models/schedule";
import {Journal, Mark} from "../../../models/journal";

@Component({
  selector: 'app-login',
  templateUrl: './view.component.html',
  styleUrls: ['./view.component.scss']
})
export class JournalViewComponent implements OnInit {
  lessons: Lesson[] = []
  lessonTypes: string[] = ["Laboratory", "Practice", "General"]

  selectedCell: JournalCellComponent | undefined

  focusedCells: Point[] = []
  isCtrlPressed = false
  isShiftPressed = false

  constructor(private router: Router, private http: HttpClient, private parent: AppComponent, private route: ActivatedRoute, public journalService: JournalService) {
  }

  ngOnInit(): void {
    this.route.queryParams.subscribe((params) => {
      if (params["group"] == undefined || params["subject"] == undefined || params["teacher"] == undefined) return

      this.journalService.getJournal(params["group"], params["subject"], params["teacher"])
    })
  }

  focusCell(x: number, y: number) {
    this.hidePopup()

    let table = <HTMLTableElement>document.getElementById("mainTable")
    let cell = table.rows[y]?.cells[x]
    cell?.focus()
  }

  showPopup(cell: JournalCellComponent, x: number, y: number) {
    if (cell != this.selectedCell)
      this.hidePopup()

    this.selectedCell = cell
    cell.onMarkClick()
  }

  hidePopup(cell: JournalCellComponent | undefined = this.selectedCell) {
    if (cell != undefined) cell.selectMarkPopup = false
  }

  onKeyPressed(key: string, cell: JournalCellComponent) {
    this.selectedCell = cell

    if (key.length == 1 && cell.show) {
      cell.selectMarkPopup = true
    }
  }

  isFocused(x: number, y: number): boolean {
    return this.focusedCells.find(value => value.x == x && value.y == y) != undefined
  }

  addFocusedPoint(point: Point) {
    if (this.isFocused(point.x, point.y)) return

    this.focusedCells.push(point)
  }

  focus(x: number, y: number, lesson: Lesson, studentID: string, journal: Journal) {
    if (this.isShiftPressed && this.focusedCells.length > 0) {
      this.hidePopup()

      let previousPoint = this.focusedCells[this.focusedCells.length - 1]

      let sx = x
      let sy = y
      let ex = previousPoint.x
      let ey = previousPoint.y

      if (sx > ex) {
        let temp = ex
        ex = sx
        sx = temp
      }

      if (sy > ey) {
        let temp = ey
        ey = sy
        sy = temp
      }

      for (let x = sx; x <= ex; x++) {
        for (let y = sy; y <= ey; y++) {
          let row = journal.rows[y]
          let lesson = row.lessons[x]

          this.addFocusedPoint({x: x, y: y, lesson: lesson, studentID: row.id})
        }
      }
      return;
    }

    if (this.isCtrlPressed) {
      this.hidePopup()
      this.addFocusedPoint({x: x, y: y, lesson: lesson, studentID: studentID})
      return
    }

    this.focusedCells = [{x: x, y: y, lesson: lesson, studentID: studentID}]
  }

  markAdd(mark: Mark) {
    this.focusedCells.forEach(value => {
      let mark_ = {
        mark: mark.mark,
        lessonId: value.lesson.id,
        studentID: value.studentID,
        studyPlaceId: mark.studyPlaceId
      }

      this.journalService.addMark(mark_).subscribe({
        next: m => {
          if (value.lesson.marks == null)
            value.lesson.marks = [m]
          else
            value.lesson.marks?.push(m)
        }
      })
    })
  }

  markEdit(mark: Mark) {
    this.journalService.editMark(mark).subscribe({
      next: m => {
        mark.mark = m.mark
      }
    })
  }

  markDelete(id: string) {
    let lesson = this.focusedCells[0]?.lesson
    if (lesson == undefined) return

    this.journalService.deleteMark(id).subscribe({
      next: id => {
        lesson!!.marks = lesson!!.marks?.filter(value => value.id != id)
      }
    })
  }
}


interface Point {
  x: number
  y: number

  lesson: Lesson
  studentID: string
}
