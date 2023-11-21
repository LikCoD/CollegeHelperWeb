import { inject, Injectable } from '@angular/core';
import { ScheduleMode, ScheduleService } from '@schedule/services/schedule.service';
import { map, Observable } from 'rxjs';
import { IModeCalculator } from '@schedule/modules/schedule-view/components/base-schedule/mode-calculators/base-mode-calculator';
import { TimeModeCalculator } from '@schedule/modules/schedule-view/components/base-schedule/mode-calculators/time.mode-calculator';
import { TableModeCalculator } from '@schedule/modules/schedule-view/components/base-schedule/mode-calculators/table.mode-calculator';
import { ExtendedTableModeCalculator } from '@schedule/modules/schedule-view/components/base-schedule/mode-calculators/extended-table.mode-calculator';

@Injectable({
  providedIn: 'root',
})
export class BaseScheduleService {
  offset: number = 0;
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
      case 'table-expanded':
        calculator = new ExtendedTableModeCalculator();
        break;
    }

    if (this.service.schedule) calculator.init(this.service.schedule);
    return (this.modeCalculators[mode] = calculator);
  }
}
