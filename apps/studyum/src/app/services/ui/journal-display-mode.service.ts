import {Injectable} from "@angular/core"
import {Lesson} from "../../models/schedule"
import {JournalService} from "../shared/journal.service"
import {LessonType} from "../../models/general"

@Injectable({
  providedIn: "root"
})
export class JournalDisplayModeService {

  mode: JournalMode = "general"

  constructor(private service: JournalService) {
  }

  private _selectedStandaloneType: LessonType | null = null

  get selectedStandaloneType(): LessonType | null {
    return this._selectedStandaloneType
  }

  set selectedStandaloneType(type: LessonType | null) {
    if (type != null && this.service.journal.dates.flat(2).find(d => d.type === ""))
      this.service.split(type.type)

    this._selectedStandaloneType = type
  }

  getEntries(lesson: Lesson): string[] {
    if (this.mode === "absences") {
      let absenceMark = this.service.journal.info.studyPlace.absenceMark
      return lesson.absences?.map(value => value.time?.toString() ?? absenceMark) ?? []
    }

    let type = this.service.journal.info.studyPlace.lessonTypes.find(v => v.type == lesson.type)

    let marks = lesson.marks
      ?.filter(v => this.mode == "general" || type?.standaloneMarks == null || (this.mode == "standalone" && type?.standaloneMarks?.find(t => t.mark == v.mark)))
      ?.map(value => value.mark) ?? []

    if (this.mode == "standalone") return marks

    let absences = lesson.absences?.filter(v => this.mode == "absences" || !v.time)
      ?.map(value => value.time?.toString() ?? this.service.journal.info.studyPlace.absenceMark) ?? []

    return marks.concat(absences)
  }

  showColumn = (date: Lesson): boolean =>
    this.mode !== "standalone" || this.selectedStandaloneType?.type === date.type

  lessonColor(lesson: Lesson): string {
    return !lesson.id ? "#323232" : !!lesson.marks?.length ? lesson.journalCellColor!! : "#4a4a4a"
  }
}

export type JournalMode = ("general" | "standalone" | "absences");
