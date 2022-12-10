import {Injectable} from "@angular/core"
import {Lesson} from "../../models/schedule"
import * as moment from "moment"

@Injectable({
  providedIn: "root"
})
export class JournalCollapseService {
  static readonly DayFormat = "DD MM YYYY"
  static readonly MonthFormat = "MM YYYY"
  static readonly YearFormat = "YYYY"

  type: CollapseType

  collapsed: string[] = []

  isShiftPressed = false
  isControlPressed = false

  constructor() {
    let type = localStorage.getItem("collapseType")
    if (type == null || !["month", "day", "smart", "expanded", "null"].find(v => v === type))
      type = "smart"

    this.type = (type as CollapseType) ?? "smart"
  }

  getLessonCollapseType(lesson: Lesson): CollapseType {
    if (this.collapsed.find(c => c === lesson.startDate.format(JournalCollapseService.YearFormat))) return "year"
    if (this.collapsed.find(c => c === lesson.startDate.format(JournalCollapseService.MonthFormat))) return "month"
    if (this.collapsed.find(c => c === lesson.startDate.format(JournalCollapseService.DayFormat))) return "day"

    return "null"
  }

  remove(date: moment.Moment, format: string): boolean {
    let formatted = date.format(format)
    let i = this.collapsed.findIndex(v => v === formatted)
    if (i !== -1) {
      this.collapsed.splice(i, 1)
      return true
    }

    return false
  }

  click(lesson: Lesson): void {
    let date = lesson.startDate

    if (this.remove(date, JournalCollapseService.YearFormat)) return
    if (this.remove(date, JournalCollapseService.MonthFormat)) return
    if (this.remove(date, JournalCollapseService.DayFormat)) return

    if (this.isShiftPressed) {
      this.collapsed.push(date.format(JournalCollapseService.MonthFormat))
      return
    }

    if (this.isControlPressed) {
      this.collapsed.push(date.format(JournalCollapseService.DayFormat))
      return
    }
  }
}

export type CollapseType = ("year" | "month" | "day" | "smart" | "expanded" | "null")
