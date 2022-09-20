import {Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {HttpClient} from "@angular/common/http";
import {AppComponent} from "../../../app.component";
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

  focusedCells: Point[] = []
  isCtrlPressed = false
  isShiftPressed = false

  @ViewChild("table") table: ElementRef

  constructor(private router: Router, private http: HttpClient, private parent: AppComponent, private route: ActivatedRoute, public journalService: JournalService) {
  }

  ngOnInit(): void {
    this.route.queryParams.subscribe((params) => {
      if (params["group"] == undefined || params["subject"] == undefined || params["teacher"] == undefined) return

      this.journalService.getJournal(params["group"], params["subject"], params["teacher"])
    })
  }

  focusCell(x: number, y: number) {
    let table = <HTMLTableElement>this.table.nativeElement

    if (this.focusedCells.length == 0) {
      table.rows[1].cells[1].focus()
      return
    }

    let cell = table.rows[1+y+this.focusedCells[0].y]?.cells[1+x+this.focusedCells[0].x]
    cell?.focus()
  }

  isFocused(x: number, y: number): boolean {
    return this.focusedCells.find(value => value.x == x && value.y == y) != undefined
  }

  addFocusedPoint(point: Point) {
    if (this.isFocused(point.x, point.y)) {
      this.focusedCells = this.focusedCells.filter(value => value.x != point.x || value.y != point.y)
      return
    }

    this.focusedCells.push(point)
  }

  focus(x: number, y: number, lesson: Lesson, studentID: string, journal: Journal) {
    if (this.isShiftPressed && this.focusedCells.length > 0) {
      let previousPoint = this.focusedCells[this.focusedCells.length - 1]
      this.addFocusedPoint(previousPoint)

      let ex = x
      let ey = y
      let sx = previousPoint.x
      let sy = previousPoint.y

      if (sx > ex) ex--
      else ex++

      if (sy > ey) ey--
      else ey++

      for (let x1 = sx; x1 != ex; ex > x1 ? x1++: x1--) {
        for (let y1 = sy; y1 != ey; ey > y1 ? y1++ : y1--) {
          let row = journal.rows[y1]
          let lesson = row.lessons[x1]

          if (this.isFocused(x, y) == this.isFocused(x1, y1))
            this.addFocusedPoint({x: x1, y: y1, lesson: lesson, studentID: row.id})
        }
      }

      return
    }

    if (this.isCtrlPressed) {
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

  closeMarkPopup() {
    let focusedCell = this.focusedCells[this.focusedCells.length - 1]
    this.focusCell(focusedCell.x, focusedCell.y)

    this.focusedCells = []
  }

  hideMarkPopup() {
    let focusedCell = this.focusedCells[this.focusedCells.length - 1]
    this.focusCell(focusedCell.x, focusedCell.y)

    this.focusedCells = [focusedCell]
  }

  keyDown(event: KeyboardEvent) {
    if (event.key == 'Control') this.isCtrlPressed = true
    if (event.key == 'Shift') this.isShiftPressed = true
  }

  keyUp(event: KeyboardEvent) {
    if (event.key == 'Control') this.isCtrlPressed = false
    if (event.key == 'Shift') this.isShiftPressed = false
  }
}


interface Point {
  x: number
  y: number

  lesson: Lesson
  studentID: string
}
