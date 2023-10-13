import { Directive, ElementRef, inject, Input, OnChanges } from '@angular/core';
import { BaseScheduleService } from '@schedule/components/base-schedule/base-schedule.service';
import { ScheduleLesson } from '@schedule/entities/schedule';
import { DateTime } from 'luxon';

@Directive({
  selector: '[scheduleCellPosition]',
  standalone: true,
})
export class ScheduleCellPositionDirective implements OnChanges {
  @Input({ required: true }) lessons!: ScheduleLesson[];
  @Input({ required: true }) startTime!: DateTime;
  @Input() offset: number = 0;

  private service = inject(BaseScheduleService);
  private host = inject(ElementRef<HTMLElement>);

  ngOnChanges(): void {
    this.host.nativeElement.style.marginTop = `${this.service.getCellY(this.lessons) - this.offset}px`;
    this.host.nativeElement.style.gridColumn = `${this.service.getCellX(this.lessons, this.startTime)}`;
    this.host.nativeElement.style.height = `${this.service.getCellHeight(this.lessons)}px`;
  }
}
