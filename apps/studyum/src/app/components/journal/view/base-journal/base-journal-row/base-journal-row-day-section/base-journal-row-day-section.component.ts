import {ChangeDetectorRef, Component, Input, OnInit} from "@angular/core"
import {JournalCell} from "../../../../../../models/journal"
import {JournalCollapseService} from "../../../../../../services/shared/journal/journal-collapse.service"
import {JournalDisplayModeService} from "../../../../../../services/shared/journal/journal-display-mode.service"
import {Entry} from "../../base-journal-cell/journal-cell.component"

@Component({
  selector: "app-base-journal-row-day-section",
  templateUrl: "./base-journal-row-day-section.component.html",
  styleUrls: ["./base-journal-row-day-section.component.scss"],
})
export class BaseJournalRowDaySectionComponent implements OnInit {
  @Input() cells: JournalCell[]

  constructor(
    private service: JournalCollapseService,
    private modeService: JournalDisplayModeService,
    private cdr: ChangeDetectorRef
  ) {}

  get collapsed(): boolean {
    return this.service.pointCollapseType(this.cells[0].point) === "day"
  }

  get collapsedCell(): JournalCell {
    return this.service.buildLesson(this.cells)
  }

  get collapsedEntries(): Entry[] {
    return this.modeService.getEntries(this.collapsedCell)
  }

  get collapsedColor(): string {
    return this.modeService.cellColor(this.collapsedCell)
  }

  expand(): void {
    this.service.click(this.cells[0].point)
  }

  showColumn = (cell: JournalCell) => this.modeService.showColumn(cell)

  ngOnInit(): void {
    this.service.selectType$.subscribe({next: (_) => this.cdr.detectChanges()})
  }
}
