import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  Input,
  OnDestroy,
  OnInit,
  TemplateRef,
} from "@angular/core"
import {JournalCell} from "../../../../../models/journal"
import {
  Cells,
  JournalCollapseService,
} from "../../../../../services/shared/journal/journal-collapse.service"
import {Subscription} from "rxjs"

@Component({
  selector: "app-base-journal-collapser",
  templateUrl: "./base-journal-collapser.component.html",
  styleUrls: ["./base-journal-collapser.component.scss"],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class BaseJournalCollapserComponent implements OnInit, OnDestroy {
  @Input() cells: Cells
  @Input() active: TemplateRef<HTMLElement>
  @Input() collapsed: TemplateRef<HTMLElement>

  @Input() index = 0

  //fix TS2322 error
  //Type 'Cells' is not assignable to type '(JournalCell[] & NgIterable<JournalCell>) | null | undefined'.
  get _cells(): any {
    return this.cells as any
  }

  private change$: Subscription | undefined

  constructor(private service: JournalCollapseService, private cdr: ChangeDetectorRef) {}

  ngOnInit(): void {
    this.service.change$.subscribe({
      next: (value) => this.cdr.detectChanges(),
    })
  }

  ngOnDestroy(): void {
    this.change$?.unsubscribe()
  }

  flatten = (cells: Cells = this.cells) => cells.flat(3)
  first = (cells: Cells) => this.flatten(cells)[0].point!

  isCollapsed = (cells: Cells): boolean => this.service.isCollapsed(this.first(cells), this.index)
  collapsedCell = (cells: Cells): JournalCell => this.service.buildLesson(cells)
  collapsedType = () => this.service.collapsedType(this.index)
  collapsedAmount = (cells: Cells) => this.flatten(cells).length

  isArray = (cell: Cells | JournalCell): boolean => Array.isArray(cell)
  toArray = (cell: Cells): Cells => cell as Cells

  click(cell: JournalCell): () => void {
    return () => this.service.click(cell.point)
  }
}
