import { inject, Injectable } from '@angular/core';
import { ScheduleMode, ScheduleService } from '@schedule/services/schedule.service';
import { map, Observable } from 'rxjs';
import { IModeCalculator } from '@schedule/modules/schedule-view/components/base-schedule/mode-calculators/base-mode-calculator';
import { TimeModeCalculator } from '@schedule/modules/schedule-view/components/base-schedule/mode-calculators/time.mode-calculator';
import { TableModeCalculator } from '@schedule/modules/schedule-view/components/base-schedule/mode-calculators/table.mode-calculator';
import { ExtendedTableModeCalculator } from '@schedule/modules/schedule-view/components/base-schedule/mode-calculators/extended-table.mode-calculator';
import { GeneralSchedule, Schedule } from '@schedule/entities/schedule';

@Injectable({
  providedIn: 'root',
})
export class BaseScheduleService {
  modeCalculator$!: Observable<IModeCalculator>;

  private service = inject(ScheduleService);
  private modeCalculators: { [key: string]: IModeCalculator } = {};

  constructor() {
    this.modeCalculator$ = this.service.mode$.pipe(map(this.getModeCalculator.bind(this)));
  }

  reset(): void {
    this.modeCalculators = {};
  }

  private getModeCalculator(mode: ScheduleMode): IModeCalculator {
    if (this.modeCalculators[mode]) return this.modeCalculators[mode];

    let calculator!: IModeCalculator;
    switch (mode) {
      case 'time':
        calculator = new TimeModeCalculator();
        break;
      case 'table':
        calculator = new TableModeCalculator();
        break;
      case 'tableExpanded':
        calculator = new ExtendedTableModeCalculator();
        break;
    }

    if (this.service.schedule) {
      const schedule = this.service.schedule;
      'startDate' in schedule.info
        ? calculator.initSchedule(schedule as Schedule)
        : calculator.initGeneralSchedule(schedule as GeneralSchedule);
    }

    return (this.modeCalculators[mode] = calculator);
  }
}
