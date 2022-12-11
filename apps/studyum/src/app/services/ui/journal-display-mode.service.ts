import {Injectable} from "@angular/core"
import {Lesson} from "../../models/schedule"
import {JournalService} from "../shared/journal.service"
import {LessonType} from "../../models/general"

@Injectable({
  providedIn: 'root'
})
export class JournalDisplayModeService {

  mode: JournalMode = "general"
  selectedStandaloneType: LessonType | null = null

  constructor(private service: JournalService) { }

  getEntries(lesson: Lesson): string[] {
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
    this.mode !== "standalone" || this.selectedStandaloneType?.type=== date.type
}

export type JournalMode = ("general" | "standalone" | "absences");
