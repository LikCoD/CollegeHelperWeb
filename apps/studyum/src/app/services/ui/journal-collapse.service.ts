import {Injectable} from "@angular/core"
import {Lesson} from "../../models/schedule"
import * as moment from "moment"
import {JournalService} from "../shared/journal.service"

@Injectable({
  providedIn: "root"
})
export class JournalCollapseService {
  static readonly DayFormat = "DD MM YYYY"
  static readonly MonthFormat = "MM YYYY"
  static readonly YearFormat = "YYYY"

  collapsed: string[] = []
  isShiftPressed = false
  isControlPressed = false

  constructor(private service: JournalService) {
    this.service.journal$.subscribe({
      next: _ => {
        let type = localStorage.getItem("collapseType")
        if (type == null || !["month", "day", "smart", "expanded", "null"].find(v => v === type))
          type = "smart"

        this.type = (type as CollapseType) ?? "smart"
      }
    })
  }

  set type(type: CollapseType) {
    this.collapsed = []
    switch (type) {
      case "month":
        this.service.journal.dates.forEach(m => {
          let date = m[0][0].startDate
          this.collapsed.push(date.format(JournalCollapseService.MonthFormat))
        })
        break
      case "day":
        this.service.journal.dates.forEach(m => m.forEach(d => {
          let date = d[0].startDate
          this.collapsed.push(date.format(JournalCollapseService.DayFormat))
        }))
        break
      case "smart":
        this.service.journal.dates.forEach((m, i, arr) => {
          let date = m[0][0].startDate
          if (i === arr.length - 1) m.forEach(d => {
              let date = d[0].startDate
              if (date.format("L") === moment.utc().format("L")) return

              this.collapsed.push(date.format(JournalCollapseService.DayFormat))
            }
          )
          else this.collapsed.push(date.format(JournalCollapseService.MonthFormat))
        })
        break
    }
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

  removeAll(date: moment.Moment): boolean {
    return this.remove(date, JournalCollapseService.YearFormat) ||
      this.remove(date, JournalCollapseService.DayFormat) ||
      this.remove(date, JournalCollapseService.MonthFormat)
  }

  click(lesson: Lesson): void {
    let date = lesson.startDate

    if (this.removeAll(date)) return

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
