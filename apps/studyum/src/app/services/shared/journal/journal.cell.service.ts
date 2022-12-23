import {Injectable} from "@angular/core"
import * as moment from "moment"
import {JournalDisplayModeService} from "./journal-display-mode.service"

@Injectable({
  providedIn: "root"
})
export class JournalCellService {
  selectedPoints: Point[] = []
  selectedDate: moment.Moment | null = null

  isShiftPressed = false
  isControlPressed = false

  constructor(private modeService: JournalDisplayModeService) {
  }


  get lastSelectedPoint(): Point {
    return this.selectedPoints[this.selectedPoints.length - 1]
  }

  moveBy(x: number, y: number): void {
    let point = {...this.lastSelectedPoint}
    point.x += x
    point.y += y

    this.addPoint(point)
  }

  addPoint(point: Point): void {
    if (!this.isShiftPressed && !this.isControlPressed) {
      this.selectedPoints = [{...point}]
      return
    }

    if (this.isShiftPressed) {
      this.selectedPoints.push(...this.calcSquareSelector(this.lastSelectedPoint, {...point}))
      return
    }

    let i = this.selectedPoints.findIndex(p => p.x === point.x && p.y === point.y)
    if (i == -1) this.selectedPoints.push({...point})
    else this.selectedPoints.splice(i, 1)
  }

  clear(): void {
    this.selectedPoints = []
  }

  private calcSquareSelector(from: Point, to: Point): Point[] {
    let lastPoint = {...to}

    if (from.y > to.y) {
      let temp = from.y
      from.y = to.y
      to.y = temp
    }

    if (from.x > to.x) {
      let temp = from.x
      from.x = to.x
      to.x = temp
    }

    let points = new Array<Point>()
    for (let x = from.x; x <= to.x; x++) {
      for (let y = from.y; y <= to.y; y++) {
        const isPointSelected = !!this.selectedPoints.find(p => p.x == x && p.y == y)
        const isColumnShown = this.modeService.showColumnByPoint(x, y)
        if (isPointSelected || (x == lastPoint.x && y == lastPoint.y) || !isColumnShown) continue

        points.push({x: x, y: y})
      }
    }

    points.push(lastPoint)
    return points
  }
}

export interface Point {
  x: number
  y: number
}
