import {Injectable} from "@angular/core"
import {Lesson} from "../../../models/schedule"
import {JournalService} from "./journal.service"
import {LessonType} from "../../../models/general"
import {Entry} from "../../../components/journal/view/base-journal/base-journal-cell/journal-cell.component"
import {Subject} from "rxjs"

@Injectable({
  providedIn: "root"
})
export class JournalDisplayModeService {

  private _mode: JournalMode = "general"
  split = false

  standaloneType$ = new Subject<LessonType | null>()
  mode$ = new Subject<JournalMode>()

  constructor(private service: JournalService) {
  }

  private _selectedStandaloneType: LessonType | null = null

  get mode(): JournalMode {
    return this._mode
  }

  set mode(mode: JournalMode) {
    this._mode = mode
    this.mode$.next(mode)
  }

  get selectedStandaloneType(): LessonType | null {
    return this._selectedStandaloneType
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

    this._selectedStandaloneType = type
    this.standaloneType$.next(type)
  }

  getEntries(lesson: Lesson): Entry[] {
    let colors = this.service.journal.info.studyPlace.journalColors
    if (this.mode === "absences") {
      let absenceMark = this.service.journal.info.studyPlace.absenceMark
      return lesson.absences?.map(value => <Entry>{
        text: value.time?.toString() ?? absenceMark,
        color: colors.general
      }) ?? []
    }

    let type = this.service.journal.info.studyPlace.lessonTypes.find(v => v.type == lesson.type)

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

  showColumn = (date: Lesson): boolean =>
    this.mode !== "standalone" || this.selectedStandaloneType?.type === date.type

  lessonColor(lesson: Lesson, collapsed: boolean = false): string {
    return (!lesson.id && !collapsed) ? "#323232" : (!!this.getEntries(lesson)?.length) ? lesson.journalCellColor!! : "#4a4a4a"
  }

  showColumnByPoint(x: number, y: number): boolean {
    return this.showColumn(this.service.journal.rows[y].lessons.flat(2)[x])
  }
}

export type JournalMode = ("general" | "standalone" | "absences");
