import { Directive, ElementRef, inject, Input, OnChanges, OnDestroy } from '@angular/core';
import { BaseScheduleService } from '@schedule/components/base-schedule/base-schedule.service';
import { ScheduleLesson } from '@schedule/entities/schedule';
import { DateTime } from 'luxon';
import { Subscription } from 'rxjs';
import { ScheduleService } from '@schedule/services/schedule.service';

@Directive({
  selector: '[scheduleCellPosition]',
  standalone: true,
})
export class ScheduleCellPositionDirective implements OnChanges, OnDestroy {
  @Input({ required: true }) lessons!: ScheduleLesson[];
  @Input({ required: true }) startTime!: DateTime;

  private scheduleService = inject(ScheduleService);
  private service = inject(BaseScheduleService);

  private host = inject(ElementRef<HTMLElement>);
  private modeSubscription?: Subscription;

  ngOnChanges(): void {
    this.modeSubscription = this.scheduleService.mode$.subscribe(() => {
      this.host.nativeElement.style.marginTop = `${this.service.getCellY(this.lessons)}px`;
      this.host.nativeElement.style.gridColumn = `${this.service.getCellX(this.lessons, this.startTime)}`;
      this.host.nativeElement.style.height = `${this.service.getCellHeight(this.lessons)}px`;
    });
  }

  ngOnDestroy(): void {
    this.modeSubscription?.unsubscribe();
  }


}
