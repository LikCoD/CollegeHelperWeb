import {Component, HostListener, Input} from "@angular/core"
import {Lesson} from "../../../../models/schedule"
import {Journal, JournalRow, MarkAmount} from "../../../../models/journal"
import {defaultLocale} from "../../../../app.component"
import {JournalCellService} from "../../../../services/ui/journal.cell.service"
import {JournalCollapseService} from "../../../../services/ui/journal-collapse.service"
import {JournalDisplayModeService, JournalMode} from "../../../../services/ui/journal-display-mode.service"

@Component({
  selector: "app-base-journal",
  templateUrl: "./base-journal.component.html",
  styleUrls: ["./base-journal.component.scss"]
})
export class BaseJournalComponent {

  @Input() journal: Journal
  @Input() showAmount = false

  constructor(private cellService: JournalCellService, private collapseService: JournalCollapseService, private modeService: JournalDisplayModeService) {
  }

  get mode(): JournalMode {
    return this.modeService.mode
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

  getAverage(row: JournalRow): string {
    if (row.numericMarksAmount == 0) return "-"

    let locale = localStorage.getItem("locale") ?? defaultLocale
    return (row.numericMarksSum / row.numericMarksAmount).toLocaleString(locale, {minimumFractionDigits: 2})
  }

  marksAmount(row: JournalRow): MarkAmount[] {
    let type = this.journal.info.studyPlace.lessonTypes
      .find(t => t.type == this.modeService.selectedStandaloneType?.type)

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
