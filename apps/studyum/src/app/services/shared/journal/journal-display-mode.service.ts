import {Injectable} from "@angular/core"
import {JournalService} from "./journal.service"
import {LessonType} from "../../../models/general"
import {Entry} from "../../../components/journal/view/base-journal/base-journal-cell/journal-cell.component"
import {BehaviorSubject} from "rxjs"
import * as moment from "moment"
import {JournalCell} from "../../../models/journal"
import {SettingsService} from "../../ui/settings.service"

@Injectable({
  providedIn: "root",
})
export class JournalDisplayModeService {
  split = false
  standaloneType$ = new BehaviorSubject<LessonType | null>(null)
  mode$ = new BehaviorSubject<JournalMode>("general")

  constructor(private service: JournalService, private settings: SettingsService) {}

  get mode(): JournalMode {
    return this.mode$.value
  }

  set mode(mode: JournalMode) {
    this.mode$.next(mode)
  }

  get selectedStandaloneType(): LessonType | null {
    return this.standaloneType$.value
  }

  set selectedStandaloneType(type: LessonType | null) {
    if (this.split) {
      this.service.unite()
      this.split = false
    }

    if (type != null && this.service.journal.dates.flat(2).find((d) => d.type === "")) {
      this.service.split(type.type)
      this.split = true
    }

    this.standaloneType$.next(type)
  }

  getEntries(cell: JournalCell): Entry[] {
    const getAbsences = () => {
      const absenceMark = this.service.journal.info.studyPlace.absenceMark
      const absences = cell.absences?.map((value) => {
        return <Entry>{
          text: value.time?.toString() ?? absenceMark,
          color: colors.general,
        }
      })

      return absences ?? []
    }

    const getStandaloneMarks = (
      selectedType: string | null = this.selectedStandaloneType?.type || null
    ) => {
      const type = this.service.journal.info.studyPlace.lessonTypes.find(
        (v) => v.type === selectedType
      )

      const standalone = cell.marks
        ?.filter((v) => type?.standaloneMarks?.find((t) => t?.mark === v.mark))
        ?.map((value) => <Entry>{text: value.mark, color: colors.general})

      return standalone ?? []
    }

    const getGeneralMarks = () => {
      const standaloneMarks = this.service.journal.info.studyPlace.lessonTypes
        .flatMap((t) => t.standaloneMarks)
        .filter((v, i, a) => a.indexOf(v) === i)

      const marks = cell.marks
        ?.filter((v) => !standaloneMarks?.find((t) => t?.mark === v.mark))
        ?.map((value) => <Entry>{text: value.mark, color: colors.general})

      return marks ?? []
    }

    let colors = this.service.journal.info.studyPlace.journalColors

    switch (this.mode) {
      case "absences":
        return getAbsences()
      case "standalone":
        return getStandaloneMarks()
      case "general":
        let marks = getGeneralMarks()

        if (this.settings.absencesShow) marks = marks.concat(getAbsences())

        if (this.settings.standaloneShow) marks = marks.concat(getStandaloneMarks(cell.type?.at(0)))

        return marks
    }

    return []
  }

  showColumn = (date: JournalCell): boolean =>
    this.mode !== "standalone" || !!date.type?.includes(this.selectedStandaloneType?.type ?? "")

  notCollapsedCellColor(lesson: JournalCell): string {
    let colors = this.service.journal.info.studyPlace.journalColors

    if (this.mode === "standalone") {
      let type = this.selectedStandaloneType
      if (!type) return colors.general

      let marks =
        lesson.marks?.filter((m) => !!type!!.standaloneMarks?.find((sm) => sm.mark === m.mark)) ??
        []

      let color = colors.general
      for (let mark of marks) {
        let markType = type.marks.find((m) => m.mark === mark.mark)
        if (
          markType === undefined ||
          markType.workOutTime === undefined ||
          markType.workOutTime === 0
        )
          break

        let date = this.service.journal.dates.flat(2)[lesson.point.x].startDate.clone()
        date = date.clone().add(markType.workOutTime, "second")
        color = date.isAfter(moment.utc()) ? colors.warning : colors.danger
      }

      return color
    }
    if (this.mode === "absences") {
      return !!(lesson.absences ?? []) ? colors.general : "#4a4a4a"
    }

    return lesson.journalCellColor ?? ""
  }

  cellColor(lesson: JournalCell, collapsed: boolean = false): string {
    return !lesson.id && !collapsed
      ? "#323232"
      : !!this.getEntries(lesson)?.length
      ? this.notCollapsedCellColor(lesson)
      : "#4a4a4a"
  }

  showColumnByPoint(x: number, y: number): boolean {
    return this.showColumn(this.service.journal.rows[y].cells.flat(2)[x])
  }
}

export type JournalMode = "general" | "standalone" | "absences"
