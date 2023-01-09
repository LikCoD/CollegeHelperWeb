import {ChangeDetectionStrategy, ChangeDetectorRef, Component, Input, OnInit} from "@angular/core"
import {Lesson} from "../../../../../../models/schedule"
import {JournalCollapseService} from "../../../../../../services/shared/journal/journal-collapse.service"
import {JournalCell} from "../../../../../../models/journal"

@Component({
  selector: "app-journal-month",
  templateUrl: "./journal-month.component.html",
  styleUrls: ["./journal-month.component.scss"],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class JournalMonthComponent implements OnInit {
  @Input() month: Lesson[][]
  @Input() monthLessons: JournalCell[][][]

  constructor(private service: JournalCollapseService, private cdr: ChangeDetectorRef) {
  }

  get collapsed(): boolean {
    return this.service.getLessonCollapseType(this.month[0][0]) === "month"
  }

  get collapseAmount(): number {
    return this.service.getCollapseAmount(this.month)
  }

  mapMonth(monthLesson: JournalCell[][][], i: number): JournalCell[][] {
    return monthLesson.map(l => l[i])
  }

  mapCollapse = (): JournalCell[] => this.service.buildLessons(this.monthLessons.map(v => v.flat()))

  dateClick(): void {
    return this.service.click(this.month[0][0])
  }

  ngOnInit(): void {
    this.service.selectType$.subscribe({next: _ => this.cdr.detectChanges()})
  }
}
