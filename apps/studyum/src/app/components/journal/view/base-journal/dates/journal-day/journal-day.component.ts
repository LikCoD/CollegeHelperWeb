import {ChangeDetectionStrategy, ChangeDetectorRef, Component, Input, OnInit} from "@angular/core"
import {Lesson} from "../../../../../../models/schedule"
import {JournalCollapseService} from "../../../../../../services/shared/journal/journal-collapse.service"
import {JournalDisplayModeService} from "../../../../../../services/shared/journal/journal-display-mode.service"
import {JournalCell} from "../../../../../../models/journal"

@Component({
  selector: "app-journal-day",
  templateUrl: "./journal-day.component.html",
  styleUrls: ["./journal-day.component.scss"],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class JournalDayComponent implements OnInit {
  @Input() day: Lesson[]
  @Input() dayLessons: JournalCell[][]

  constructor(
    private service: JournalCollapseService,
    private modeService: JournalDisplayModeService,
    private cdr: ChangeDetectorRef
  ) {}

  get collapsed(): boolean {
    return this.service.pointCollapseType(this.day[0].point!) === "day"
  }

  get collapseAmount(): number {
    return this.service.getCollapseAmount(this.day)
  }

  dateClick(): void {
    return this.service.click(this.day[0].point!)
  }

  showColumn = (date: Lesson) => this.modeService.showColumn(date as JournalCell)

  ngOnInit(): void {
    this.service.selectType$.subscribe({next: (_) => this.cdr.detectChanges()})
  }
}
