import {Injectable} from "@angular/core"
import {JournalDisplayModeService} from "./journal-display-mode.service"
import {BehaviorSubject} from "rxjs"
import {Lesson} from "../../../shared/models/schedule"
import {KeyboardService} from "../../../shared/services/core/keyboard.service"

@Injectable({
  providedIn: "root",
})
export class JournalCellService {
  points$ = new BehaviorSubject<Point[]>([])
  selectedDate$ = new BehaviorSubject<Lesson | null>(null)

  constructor(
    private modeService: JournalDisplayModeService,
    private keyboardService: KeyboardService
  ) {}

  get lastSelectedPoint(): Point {
    return this.points$.value[this.points$.value.length - 1]
  }

  selectDate(date: Lesson | null): void {
    if (this.selectedDate$.value === date) {
      this.selectedDate$.next(null)
      return
    }

    this.clearPoints()
    this.selectedDate$.next(date)
  }

  pointIndex(point: Point) {
    return this.points$.value.findIndex((p) => p.x === point.x && p.y === point.y)
  }

  moveBy(x: number, y: number): void {
    let point = {...this.lastSelectedPoint}
    point.x += x
    point.y += y

    this.addPoint(point)
  }

  addPoint(point: Point): void {
    if (this.keyboardService.key === "null") {
      this.points$.next([{...point}])
      return
    }

    if (this.keyboardService.key === "shift") {
      let squarePoints = this.calcSquareSelector(this.lastSelectedPoint, {
        ...point,
      })
      this.points$.next([...this.points$.value, ...squarePoints])
      return
    }

    let points = this.points$.value
    let i = this.pointIndex(point)
    if (i == -1) this.points$.next([...points, {...point}])
    else {
      points.splice(i, 1)
      this.points$.next(points)
    }
  }

  clearPoints(): void {
    this.points$.next([])
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
        const isPointSelected = !!this.points$.value.find((p) => p.x == x && p.y == y)
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

export type Key = "shift" | "control" | "null"
