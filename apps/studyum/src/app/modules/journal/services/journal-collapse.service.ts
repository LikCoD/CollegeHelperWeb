import {Injectable} from "@angular/core"
import {Lesson} from "../../../shared/models/schedule"
import * as moment from "moment"
import {JournalService} from "./journal.service"
import {JournalDisplayModeService} from "./journal-display-mode.service"
import {Subject} from "rxjs"
import {SettingsService} from "../../../shared/services/ui/settings.service"
import {JournalCell} from "../../../shared/models/journal"
import {KeyboardService} from "../../../shared/services/core/keyboard.service"
import {Point} from "./journal.cell.service"

@Injectable({
  providedIn: "root",
})
export class JournalCollapseService {
  static readonly DayFormat = "DD MM YYYY"
  static readonly MonthFormat = "MM YYYY"
  static readonly YearFormat = "YYYY"

  collapsed: string[] = []

  change$ = new Subject<moment.Moment | null>()
  selectType$ = new Subject<CollapseType>()

  constructor(
    private service: JournalService,
    private modeService: JournalDisplayModeService,
    private settingsService: SettingsService,
    private keyboardService: KeyboardService
  ) {
    this.loadType()
  }

  set type(type: CollapseType) {
    this.collapsed = []
    switch (type) {
      case "month":
        this.service.journal?.dates?.forEach((m) => this.addMonth(m[0][0].startDate))
        break
      case "day":
        this.service.journal?.dates?.forEach((m) => m.forEach((d) => this.addDay(d[0].startDate)))
        break
      case "smart":
        this.service.journal?.dates?.forEach((m, i, arr) => {
          if (i === arr.length - 1)
            m.forEach((d) => {
              if (d[0].startDate.format("L") === moment.utc().format("L")) return

              this.addDay(d[0].startDate)
            })
          else this.addMonth(m[0][0].startDate)
        })
        break
    }

    this.selectType$.next(type)
  }

  loadType = () => (this.type = this.settingsService.collapseType)

  dateCollapseType(startDate: moment.Moment): CollapseType {
    let year = startDate.format(JournalCollapseService.YearFormat)
    let month = startDate.format(JournalCollapseService.MonthFormat)
    let day = startDate.format(JournalCollapseService.DayFormat)

    if (this.collapsed.find((c) => c === year)) return "year"
    if (this.collapsed.find((c) => c === month)) return "month"
    if (this.collapsed.find((c) => c === day)) return "day"

    return "null"
  }

  pointCollapseType = (point: Point): CollapseType =>
    this.dateCollapseType(this.service.journal.dates.flat(2)[point.x].startDate)

  isCollapsed = (point: Point, index: number) =>
    this.pointCollapseType(point) === this.collapsedType(index)

  collapsedType = (index: number) => ["month", "day"][index]

  remove(date: moment.Moment, format: string): boolean {
    let formatted = date.format(format)
    let i = this.collapsed.findIndex((v) => v === formatted)
    if (i !== -1) {
      this.collapsed.splice(i, 1)
      return true
    }

    return false
  }

  removeAll(date: moment.Moment): boolean {
    return (
      this.remove(date, JournalCollapseService.YearFormat) ||
      this.remove(date, JournalCollapseService.DayFormat) ||
      this.remove(date, JournalCollapseService.MonthFormat)
    )
  }

  getCollapseAmount(lesson: JournalCell[] | JournalCell[][] | Lesson[] | Lesson[][]): number {
    if (this.modeService.mode !== "standalone") return lesson.flat().length
    return lesson
      .flat()
      .filter((v) => v.type?.includes(this.modeService.selectedStandaloneType?.type ?? "")).length
  }

  checkAdd = (lesson: Lesson[] | Lesson[][]): boolean => this.getCollapseAmount(lesson) > 1

  addDay(date: moment.Moment): void {
    let dayIndexes = this.service.findDay(date)
    if (!this.checkAdd(this.service.journal.dates[dayIndexes[0]][dayIndexes[1]])) return

    this.collapsed.push(date.format(JournalCollapseService.DayFormat))
  }

  addMonth(date: moment.Moment): void {
    let monthIndex = this.service.findMonth(date)
    if (!this.checkAdd(this.service.journal.dates[monthIndex])) return

    this.collapsed.push(date.format(JournalCollapseService.MonthFormat))
  }

  click(point: Point): void {
    const date = this.service.journal.dates.flat(2)[point.x].startDate

    if (this.removeAll(date)) {
      this.change$.next(null)
      return
    }

    if (this.keyboardService.key === "shift") {
      this.addMonth(date)
      this.change$.next(date)
      return
    }

    if (this.keyboardService.key === "control") {
      this.addDay(date)
      this.change$.next(date)
      return
    }
  }

  buildLesson(lessons: Cells): JournalCell {
    let selectedLessons = lessons
      .flat(3)
      .filter(
        (l) =>
          this.modeService.mode !== "standalone" ||
          !!l.type?.includes(this.modeService.selectedStandaloneType?.type ?? "")
      )

    let colors = this.service.journal.info.studyPlace.journalColors

    let color = colors.general
    selectedLessons.find((l) => {
      if (l.journalCellColor === colors.warning) color = colors.warning
      if (l.journalCellColor === colors.danger) color = colors.danger

      return l.journalCellColor === colors.danger
    })

    let marks = selectedLessons.flatMap((l) => l.marks ?? [])
    let absences = selectedLessons.flatMap((l) => l.absences ?? [])

    if (marks.length === 0 && absences.length === 0) color = "#4a4a4a"
    return <JournalCell>{
      ...selectedLessons[0],
      marks: marks,
      absences: absences,
      journalCellColor: color,
    }
  }
}

export type CollapseType = "year" | "month" | "day" | "smart" | "expanded" | "null"

export type Cells = MultiDimensionArray<JournalCell> | MultiDimensionArray<Lesson>
export type MultiDimensionArray<T> = T[] | T[][] | T[][][] | T[][][][]
