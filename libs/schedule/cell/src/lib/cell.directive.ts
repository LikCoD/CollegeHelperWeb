import {Directive, ElementRef, Input} from "@angular/core"
import {Cell} from "../../../../../apps/studyum/src/app/shared/models/schedule"
import {ScheduleService} from "../../../../../apps/studyum/src/app/modules/schedule/servieces/schedule.service"

@Directive({
  selector: "[schdlCell]",
})
export class CellDirective {
  constructor(private el: ElementRef, private scheduleService: ScheduleService) {}

  @Input() set schdlCell(cell: Cell) {
    this.update(cell)

    this.scheduleService.scale$.subscribe({
      next: () => this.update(cell),
    })

    this.scheduleService.timeViewMode$.subscribe({
      next: () => this.update(cell),
    })
  }

  update(cell: Cell) {
    this.el.nativeElement.style.top = this.scheduleService.getCellY(cell) + "px"
    this.el.nativeElement.style.left = this.scheduleService.getCellX(cell) + "px"

    this.el.nativeElement.style.width = this.scheduleService.getCellWidth(cell) + "px"
    this.el.nativeElement.style.height = this.scheduleService.getCellHeight(cell) + "px"
  }
}
