import {Directive, ElementRef, Input} from '@angular/core';
import {Cell, Schedule} from "../../../../../models/schedule";

@Directive({
  selector: '[appScheduleCell]'
})
export class ScheduleCellDirective {

  @Input() schedule: Schedule;

  @Input() set appScheduleCell(cell: Cell) {
    this.el.nativeElement.style.top = ((cell.startDate.hours() - this.schedule!!.info.minTime.hours()) * 60 + cell.startDate.minutes()) * 2 + 'px'
    this.el.nativeElement.style.left = cell.startDate.diff(this.schedule.info.startWeekDate, 'days') * 200 + 'px'
    this.el.nativeElement.style.width = '180px'
    this.el.nativeElement.style.height = cell.endDate.diff(cell.startDate, 'minutes') * 2 + 'px'
  }

  constructor(private el: ElementRef) {
  }


}
