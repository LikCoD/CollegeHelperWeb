import {Injectable} from "@angular/core"
import {JournalService} from "./journal.service"
import {LessonType} from "../../../models/general"
import {Entry} from "../../../components/journal/view/base-journal/base-journal-cell/journal-cell.component"
import {BehaviorSubject} from "rxjs"
import * as moment from "moment"
import {JournalCell} from "../../../models/journal"

@Injectable({
  providedIn: "root"
})
export class JournalDisplayModeService {

  split = false
  standaloneType$ = new BehaviorSubject<LessonType | null>(null)
  mode$ = new BehaviorSubject<JournalMode>("general")

  constructor(private service: JournalService) {
  }

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

    if (type != null && this.service.journal.dates.flat(2).find(d => d.type === "")) {
      this.service.split(type.type)
      this.split = true
    }

    this.standaloneType$.next(type)
  }

  getEntries(lesson: JournalCell): Entry[] {
    let colors = this.service.journal.info.studyPlace.journalColors
    if (this.mode === "absences") {
      let absenceMark = this.service.journal.info.studyPlace.absenceMark
      return lesson.absences?.map(value => <Entry>{
        text: value.time?.toString() ?? absenceMark,
        color: colors.general
      }) ?? []
    }

    let type = this.service.journal.info.studyPlace.lessonTypes.find(v => v.type === this.selectedStandaloneType?.type)

    let marks = lesson.marks
      ?.filter(v => this.mode == "general" || type?.standaloneMarks == null || (this.mode == "standalone" && type?.standaloneMarks?.find(t => t.mark == v.mark)))
      ?.map(value => <Entry>{text: value.mark, color: colors.general}) ?? []

    if (this.mode == "standalone") return marks

    let absences = lesson.absences?.filter(v => this.mode == "absences" || !v.time)
      ?.map(value => <Entry>{
        text: value.time?.toString() ?? this.service.journal.info.studyPlace.absenceMark,
        color: colors.general
      }) ?? []

    return marks.concat(absences)
  }

  showColumn = (date: JournalCell): boolean =>
    this.mode !== "standalone" || !!date.type?.includes(this.selectedStandaloneType?.type ?? "")

  cellColor(lesson: JournalCell): string {
    let colors = this.service.journal.info.studyPlace.journalColors

    if (this.mode === "standalone") {
      let type = this.selectedStandaloneType
      if (!type) return colors.general

      let marks = lesson.marks?.filter(m => !!type!!.standaloneMarks?.find(sm => sm.mark === m.mark)) ?? []

      let color = colors.general
      for (let mark of marks) {
        let markType = type.marks.find(m => m.mark === mark.mark)
        if (markType === undefined || markType.workOutTime === undefined || markType.workOutTime === 0) break

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

  lessonColor(lesson: JournalCell, collapsed: boolean = false): string {
    return (!lesson.id && !collapsed) ? "#323232" : (!!this.getEntries(lesson)?.length) ? this.cellColor(lesson) : "#4a4a4a"
  }

  showColumnByPoint(x: number, y: number): boolean {
    return this.showColumn(this.service.journal.rows[y].cells.flat(2)[x])
  }
}

export type JournalMode = ("general" | "standalone" | "absences");
