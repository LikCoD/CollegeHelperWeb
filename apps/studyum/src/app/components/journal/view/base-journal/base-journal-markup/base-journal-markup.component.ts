import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  ElementRef,
  OnInit,
} from "@angular/core"
import {
  JournalCellService,
  Point,
} from "../../../../../services/shared/journal/journal.cell.service"

@Component({
  selector: "app-base-journal-markup",
  templateUrl: "./base-journal-markup.component.html",
  styleUrls: ["./base-journal-markup.component.scss"],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class BaseJournalMarkupComponent implements OnInit {
  currentY: number | null = null
  currentX: number | null = null
  currentHoverY: number | null = null
  currentHoverX: number | null = null

  constructor(
    private service: JournalCellService,
    private ref: ElementRef,
    private cdr: ChangeDetectorRef
  ) {
    service.points$.subscribe({
      next: (value) => {
        const point = value.at(-1)

        this.checkYChange(point)
        this.checkXChange(point)

        this.cdr.detectChanges()
      },
    })
  }

  ngOnInit(): void {
    const el = this.ref.nativeElement as HTMLElement

    el.parentElement!.parentElement!.onmousemove = (e) => {
      const y = e.clientY - el.getBoundingClientRect().y
      const x = e.clientX - el.getBoundingClientRect().x
      this.currentHoverY = Math.floor(y / 66)
      this.currentHoverX = Math.floor(x / 66)
      this.cdr.detectChanges()
    }
  }

  checkYChange(point: Point | undefined) {
    if ((point === undefined && this.currentY === null) || point?.y === this.currentY) return
    this.currentY = point?.y || null
  }

  checkXChange(point: Point | undefined) {
    if ((point === undefined && this.currentX === null) || point?.x === this.currentX) return
    this.currentX = point?.x || null
  }
}
