import {Component, EventEmitter, HostListener, Input, Output} from "@angular/core"
import {Lesson} from "../../../../models/schedule"
import {Journal, JournalRow, MarkAmount} from "../../../../models/journal"
import {JournalMode, LessonType} from "../../../../models/general"
import {defaultLocale} from "../../../../app.component"
import {JournalCellService} from "../../../../services/ui/journal.cell.service"
import {JournalCollapseService} from "../../../../services/ui/journal-collapse.service"

@Component({
  selector: "app-base-journal",
  templateUrl: "./base-journal.component.html",
  styleUrls: ["./base-journal.component.scss"]
})
export class BaseJournalComponent {

  @Input() mode: JournalMode
  @Input() journal: Journal

  @Output() collapseChange = new EventEmitter<null>()

  @Input()
  showAmount = false

  @Input()
  selectedLessonType: LessonType | null = null

  constructor(private cellService: JournalCellService, private collapseService: JournalCollapseService) {
  }

  @HostListener("document:keyup.shift", ["false", "'shift'"])
  @HostListener("document:keyup.control", ["false", "'control'"])
  @HostListener("document:keyup.meta", ["false", "'control'"])
  @HostListener("document:keydown.shift", ["true", "'shift'"])
  @HostListener("document:keydown.control", ["true", "'control'"])
  @HostListener("document:keydown.meta", ["true", "'control'"])
  keyEvent(down: boolean, key: string) {
    if (key == "shift") {
      this.collapseService.isShiftPressed = down
      this.cellService.isShiftPressed = down
    }

    if (key == "control") {
      this.collapseService.isControlPressed = down
      this.cellService.isControlPressed = down
    }
  }

  @HostListener("document:keydown.arrowUp", ["0", "-1"])
  @HostListener("document:keydown.arrowRight", ["1", "0"])
  @HostListener("document:keydown.arrowDown", ["0", "1"])
  @HostListener("document:keydown.arrowLeft", ["-1", "0"])
  arrowEvent(x: number, y: number) {
    this.cellService.moveBy(x, y)
  }

  cellEntities(lesson: Lesson): string[] {
    let type = this.journal.info.studyPlace.lessonTypes.find(v => v.type == lesson.type)

    let marks = lesson.marks
      ?.filter(v => this.mode == "general" || (this.mode == "standalone" && type?.standaloneMarks?.find(t => t.mark == v.mark)))
      ?.map(value => value.mark) ?? []

    if (this.mode == "standalone") return marks

    let absences = lesson.absences?.filter(v => this.mode == "absences" || !v.time)
      ?.map(value => value.time?.toString() ?? this.journal.info.studyPlace.absenceMark) ?? []

    return marks.concat(absences)
  }

  getAverage(row: JournalRow): string {
    if (row.numericMarksAmount == 0) return "-"

    let locale = localStorage.getItem("locale") ?? defaultLocale
    return (row.numericMarksSum / row.numericMarksAmount).toLocaleString(locale, {minimumFractionDigits: 2})
  }

  marksAmount(row: JournalRow): MarkAmount[] {
    let type = this.journal.info.studyPlace.lessonTypes
      .find(t => t.type == this.selectedLessonType?.type)

    let marks = type?.standaloneMarks ? type.standaloneMarks : type?.marks ?? []

    return row.marksAmount.filter(v =>
      this.mode == "general" ||
      !!marks.find(m => m.mark == v.mark)
    )
  }

  monthLessons(journal: Journal, i: number): Lesson[][][] {
    return journal.rows.map(r => r.lessons[i])
  }
}
