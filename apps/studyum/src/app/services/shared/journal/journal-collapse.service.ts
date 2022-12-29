import {Injectable} from "@angular/core"
import {Lesson} from "../../../models/schedule"
import * as moment from "moment"
import {JournalService} from "./journal.service"
import {JournalDisplayModeService} from "./journal-display-mode.service"
import {Subject} from "rxjs"
import {SettingsService} from "../../ui/settings.service"

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

  change$ = new Subject<moment.Moment | null>()
  selectType$ = new Subject<CollapseType>()

  constructor(private service: JournalService, private modeService: JournalDisplayModeService, private settingsService: SettingsService) {
    this.loadType()
  }

  set type(type: CollapseType) {
    this.collapsed = []
    switch (type) {
      case "month":
        this.service.journal.dates.forEach(m => this.addMonth(m[0][0]))
        break
      case "day":
        this.service.journal.dates.forEach(m => m.forEach(d => this.addDay(d[0])))
        break
      case "smart":
        this.service.journal.dates.forEach((m, i, arr) => {
          if (i === arr.length - 1) m.forEach(d => {
              if (d[0].startDate.format("L") === moment.utc().format("L")) return

              this.addDay(d[0])
            }
          )
          else this.addMonth(m[0][0])
        })
        break
    }

    this.selectType$.next(type)
  }

  loadType = () => this.type = this.settingsService.collapseType

  getLessonCollapseType(lesson: Lesson): CollapseType {
    let year = lesson.startDate.format(JournalCollapseService.YearFormat)
    let month = lesson.startDate.format(JournalCollapseService.MonthFormat)
    let day = lesson.startDate.format(JournalCollapseService.DayFormat)

    if (this.collapsed.find(c => c === year)) return "year"
    if (this.collapsed.find(c => c === month)) return "month"
    if (this.collapsed.find(c => c === day)) return "day"

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

  getCollapseAmount(lesson: Lesson[] | Lesson[][]): number {
    if (this.modeService.mode !== "standalone") return lesson.flat().length
    return lesson.flat().filter(v => this.modeService.selectedStandaloneType?.type === v.type).length
  }

  checkAdd = (lesson: Lesson[] | Lesson[][]): boolean => this.getCollapseAmount(lesson) > 1

  addDay(lesson: Lesson): void {
    let dayIndexes = this.service.findDay(lesson.startDate)
    if (!this.checkAdd(this.service.journal.dates[dayIndexes[0]][dayIndexes[1]])) return

    this.collapsed.push(lesson.startDate.format(JournalCollapseService.DayFormat))
  }

  addMonth(lesson: Lesson): void {
    let monthIndex = this.service.findMonth(lesson.startDate)
    if (!this.checkAdd(this.service.journal.dates[monthIndex])) return

    this.collapsed.push(lesson.startDate.format(JournalCollapseService.MonthFormat))
  }

  click(lesson: Lesson): void {
    let date = lesson.startDate

    if (this.removeAll(date)) {
      this.change$.next(null)
      return
    }

    if (this.isShiftPressed) {
      this.addMonth(lesson)
      this.change$.next(lesson.startDate)
      return
    }

    if (this.isControlPressed) {
      this.addDay(lesson)
      this.change$.next(lesson.startDate)
      return
    }
  }

  buildLesson(lessons: Lesson[]): Lesson {
    let selectedLessons = lessons.filter(l =>
      this.modeService.mode !== "standalone" ||
      this.modeService.selectedStandaloneType?.type === l.type
    )

    let colors = this.service.journal.info.studyPlace.journalColors

    let color = colors.general
    selectedLessons.find(l => {
      if (l.journalCellColor === colors.warning) color = colors.warning
      if (l.journalCellColor === colors.danger) color = colors.danger

      return l.journalCellColor === colors.danger
    })

    let marks = selectedLessons.flatMap(l => l.marks ?? [])
    let absences = selectedLessons.flatMap(l => l.absences ?? [])

    if (marks.length === 0 && absences.length === 0) color = "#4a4a4a"
    return <Lesson>{...selectedLessons[0], marks: marks, absences: absences, journalCellColor: color}
  }

  buildLessons = (lessons: Lesson[][]): Lesson[] => lessons.map(this.buildLesson.bind(this))
}

export type CollapseType = ("year" | "month" | "day" | "smart" | "expanded" | "null")
