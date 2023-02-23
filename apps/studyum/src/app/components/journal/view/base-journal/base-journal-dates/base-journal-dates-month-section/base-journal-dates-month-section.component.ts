import {ChangeDetectionStrategy, ChangeDetectorRef, Component, Input, OnInit} from "@angular/core"
import {Lesson} from "../../../../../../models/schedule"
import {JournalCollapseService} from "../../../../../../services/shared/journal/journal-collapse.service"

@Component({
  selector: "app-base-journal-dates-month-section",
  templateUrl: "./base-journal-dates-month-section.component.html",
  styleUrls: ["./base-journal-dates-month-section.component.scss"],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class BaseJournalDatesMonthSectionComponent implements OnInit {
  @Input() month: Lesson[][]

  constructor(private service: JournalCollapseService, private cdr: ChangeDetectorRef) {}

  get collapsed(): boolean {
    return this.service.pointCollapseType(this.month[0][0].point!) === "month"
  }

  get collapseAmount(): number {
    return this.service.getCollapseAmount(this.month)
  }

  dateClick(): void {
    return this.service.click(this.month[0][0].point!)
  }

  ngOnInit(): void {
    this.service.selectType$.subscribe({next: (_) => this.cdr.detectChanges()})
  }
}
