import {ChangeDetectionStrategy, Component, EventEmitter, Input, Output} from "@angular/core"
import {LessonType} from "../../../../models/general"
import {Journal} from "../../../../models/journal"
import {JournalDisplayModeService} from "../../../../services/shared/journal/journal-display-mode.service"
import {JournalCollapseService} from "../../../../services/shared/journal/journal-collapse.service"

@Component({
  selector: "app-journal-bottom-bar",
  templateUrl: "./journal-bottom-bar.component.html",
  styleUrls: ["./journal-bottom-bar.component.scss"],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class JournalBottomBarComponent {
  @Input() journal: Journal
  @Input() isShowAmount: boolean

  @Output() selectType = new EventEmitter<LessonType | null>()
  @Output() toggleAmount = new EventEmitter()

  get isAbsencesSelected(): boolean {
    return this.modeService.mode === "absences"
  }

  get selectedType(): LessonType | null {
    return this.modeService.selectedStandaloneType
  }

  constructor(
    private modeService: JournalDisplayModeService,
    private collapseService: JournalCollapseService
  ) {}

  getLessonTypes() {
    return this.journal.info.studyPlace.lessonTypes.map((type) => {
      type.toString = () => type.type
      return type
    })
  }

  select(type: LessonType | null) {
    this.modeService.mode = type === this.selectedType ? "general" : "standalone"
    this.modeService.selectedStandaloneType = type === this.selectedType ? null : type

    this.collapseService.loadType()
  }

  toggleAbsence(): void {
    this.modeService.mode = this.modeService.mode === "absences" ? "general" : "absences"
    this.modeService.selectedStandaloneType = null
  }
}
