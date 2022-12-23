import {Directive, ElementRef, Input} from "@angular/core"
import {Cell} from "../../../../../models/schedule"
import {ScheduleService} from "../../../../../services/shared/schedule.service"

@Directive({
  selector: '[appScheduleCell]'
})
export class ScheduleCellDirective{

  constructor(private el: ElementRef, private scheduleService: ScheduleService) {
  }

  @Input() set appScheduleCell(cell: Cell) {
    this.update(cell)

    this.scheduleService.scale$.subscribe({
      next: _ => this.update(cell)
    })
  }

  update(cell: Cell) {
    this.el.nativeElement.style.top = this.scheduleService.getCellY(cell) + 'px'
    this.el.nativeElement.style.left = this.scheduleService.getCellX(cell) + 'px'

    this.el.nativeElement.style.width = this.scheduleService.getCellWidth(cell) + 'px'
    this.el.nativeElement.style.height = this.scheduleService.getCellHeight(cell) + 'px'
  }
}
