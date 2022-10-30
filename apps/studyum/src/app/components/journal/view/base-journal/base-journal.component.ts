import {Component, ElementRef, EventEmitter, Host, HostListener, Input, Output, ViewChild} from "@angular/core"
import {Lesson} from "../../../../models/schedule"
import {Journal} from "../../../../models/journal"
import * as moment from "moment"
import {compareDates} from "../../../../utils"
import {JournalService} from "../../../../services/shared/journal.service"
import {DataPoint, JournalPointData} from "../../../../models/dto/points"
import {JournalMode} from "../../../../models/general"

@Component({
  selector: "app-base-journal",
  templateUrl: "./base-journal.component.html",
  styleUrls: ["./base-journal.component.scss"]
})
export class BaseJournalComponent {

  @Input() mode: JournalMode
  @Input() journal: Journal

  @Output() dateClick = new EventEmitter<DataPoint<Lesson>>()
  @Output() cellClick = new EventEmitter<DataPoint<JournalPointData[]>>()

  @ViewChild("table") table: ElementRef

  focusedCells: DataPoint<JournalPointData>[] = []
  isCtrlPressed = false
  isShiftPressed = false
  collapseType?: moment.unitOfTime.StartOf

  constructor(@Host() private host: ElementRef, public journalService: JournalService) {
  }

  focusCell(x: number, y: number) {
    let table = <HTMLTableElement>this.table.nativeElement

    if (this.focusedCells.length == 0) {
      table.tBodies[0].rows[0].cells[0].focus()
      return
    }

    let cell = table.tBodies[0].rows[y + this.focusedCells[0].y]?.cells[x + this.focusedCells[0].x]
    cell?.focus()
  }

  isFocused(x: number, y: number): boolean {
    return this.focusedCells.find(value => value.x == x && value.y == y) != undefined
  }

  addFocusedPoint(point: DataPoint<JournalPointData>) {
    if (!this.isFocused(point.x, point.y)) this.focusedCells.push(point)
    else this.focusedCells = this.focusedCells.filter(value => value.x != point.x || value.y != point.y)
  }

  focus(cell: HTMLTableCellElement, x: number, y: number, lesson: Lesson, studentID: string, journal: Journal) {
    let cellX = cell.getClientRects()[0].x
    let cellY = cell.getClientRects()[0].y
    this.host.nativeElement.scrollBy(cellX < 180 ? cellX - 180 : 0, cellY < 120 ? cellY - 120 : 0)

    if (journal.info.editable && this.isShiftPressed && this.focusedCells.length > 0) {
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

      for (let x1 = sx; x1 != ex; ex > x1 ? x1++ : x1--) {
        for (let y1 = sy; y1 != ey; ey > y1 ? y1++ : y1--) {
          let row = journal.rows[y1]
          let lesson = row.lessons[x1]

          if (this.isFocused(x, y) == this.isFocused(x1, y1))
            this.addFocusedPoint({x: x1, y: y1, data: {lesson: lesson, studentID: row.id}})
        }
      }

      this.cellClick.emit({x: cell.offsetLeft, y: cell.offsetTop, data: this.focusedCells.map(v => v.data)})
      return
    }

    if (journal.info.editable && this.isCtrlPressed) {
      this.addFocusedPoint({x: x, y: y, data: {lesson: lesson, studentID: studentID}})
      this.cellClick.emit({x: cell.offsetLeft, y: cell.offsetTop, data: this.focusedCells.map(v => v.data)})
      return
    }

    this.focusedCells = [{x: x, y: y, data: {lesson: lesson, studentID: studentID}}]
    this.cellClick.emit({x: cell.offsetLeft, y: cell.offsetTop, data: this.focusedCells.map(v => v.data)})
  }

  @HostListener("document:keydown", ["$event"])
  keyDown(event: KeyboardEvent) {
    if (event.key == "Control") this.isCtrlPressed = true
    if (event.key == "Shift") this.isShiftPressed = true
  }

  @HostListener("document:keyup", ["$event"])
  keyUp(event: KeyboardEvent) {
    if (event.key == "Control") this.isCtrlPressed = false
    if (event.key == "Shift") this.isShiftPressed = false
  }

  onDateClick(cell: HTMLDivElement, journal: Journal, date: Lesson) {
    this.focusedCells = []

    if (date.collapsedType != undefined) {
      this.collapseType = undefined

      this.journalService.collapse(journal, date, date.collapsedType)
      return
    }

    if (this.isCtrlPressed) {
      this.collapseType = undefined
      this.journalService.collapse(journal, date, "day")
      return
    }
    if (this.isShiftPressed) {
      this.collapseType = undefined
      this.journalService.collapse(journal, date, "month")
      return
    }

    this.dateClick.emit({x: cell.offsetLeft, y: cell.offsetTop, data: date})
  }

  toggleCollapse(journal: Journal) {
    this.focusedCells = []
    this.journalService.expand(journal)

    switch (this.collapseType) {
      case undefined:
        this.collapseType = "day"
        break
      case "day":
        this.collapseType = "month"
        break
      case "month":
        this.collapseType = undefined
        return
    }

    let sameExists = false
    let lastDate: moment.Moment | undefined = undefined
    let lessons: Lesson[] = []
    journal.dates.forEach(value => {
      if ((lastDate != undefined && compareDates(lastDate, value.startDate, this.collapseType!!)) || value.collapsedType != undefined) {
        sameExists = true
        return
      }

      lastDate = value.startDate
      lessons.push(value)
    })

    if (!sameExists) {
      this.toggleCollapse(journal)
      return
    }

    lessons.forEach(l => {
      this.journalService.collapse(journal, l, this.collapseType!!)
    })
  }

  filterLessons(type: string, lessons: Lesson[], dates = lessons): Lesson[] {
    return lessons.filter((_, i) => !dates[i].collapsed && dates[i].visible)
  }

  unselectCells() {
    this.focusedCells = []
  }
}

