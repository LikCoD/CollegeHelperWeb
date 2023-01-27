import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  Input,
  OnInit,
} from "@angular/core"
import {JournalDisplayModeService} from "../../../../../../services/shared/journal/journal-display-mode.service"
import {Entry} from "../../base-journal-cell/journal-cell.component"
import {JournalCell} from "../../../../../../models/journal"

@Component({
  selector: "app-journal-collapse-column",
  templateUrl: "./journal-collapse-column.component.html",
  styleUrls: ["./journal-collapse-column.component.scss"],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class JournalCollapseColumnComponent implements OnInit {
  @Input() date: string
  @Input() lessons: JournalCell[]
  @Input() amount: number

  constructor(
    private modeService: JournalDisplayModeService,
    private cdr: ChangeDetectorRef
  ) {}

  entries = (lesson: JournalCell): Entry[] =>
    this.modeService.getEntries(lesson)
  lessonColor = (lesson: JournalCell): string =>
    this.modeService.cellColor(lesson, true)

  ngOnInit(): void {
    this.modeService.mode$.subscribe({next: (_) => this.cdr.detectChanges()})
  }
}
