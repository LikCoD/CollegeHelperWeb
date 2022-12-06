import {Injectable} from "@angular/core"
import {Lesson} from "../../models/schedule"

@Injectable({
  providedIn: "root"
})
export class JournalCellService {

  selectedPoints: Point2D[] = []

  isShiftPressed = false
  isControlPressed = false

  addPoint(point: Point) {
    if (!this.isShiftPressed && !this.isControlPressed) {
      this.selectedPoints = [{...point.lesson.point!!}]
      return
    }

    if (this.isShiftPressed) {
      const lastPoint = this.selectedPoints[this.selectedPoints.length - 1]
      this.selectedPoints.push(...this.calcSquareSelector(lastPoint, {...point.lesson.point!!}))
      return
    }

    let i = this.selectedPoints.findIndex(p => p.x === point.lesson.point!!.x && p.y === point.lesson.point!!.y)
    if (i == -1) this.selectedPoints.push({...point.lesson.point!!})
    else this.selectedPoints.splice(i, 1)
  }

  private calcSquareSelector(from: Point2D, to: Point2D): Point2D[] {
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

    let points = new Array<Point2D>()
    for (let x = from.x; x <= to.x; x++) {
      for (let y = from.y; y <= to.y; y++) {
        if (!!points.find(p => p.x == x && p.y == y) || (x == lastPoint.x && y == lastPoint.y)) continue
        points.push({x: x, y: y})
      }
    }

    points.push(lastPoint)

    return points
  }
}

export interface Point {
  lesson: Lesson
  studentID: string
}

export interface Point2D {
  x: number
  y: number
}
