import {Component} from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import * as moment from 'moment';
import {ScheduleService} from "../../../services/shared/schedule.service";
import {map, Observable} from "rxjs";
import {Cell, Schedule} from "../../../models/schedule";

@Component({
  selector: 'app-view',
  templateUrl: './view.component.html',
  styleUrls: ['./view.component.scss']
})
export class ViewComponent {
  weekDays: string[] = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"]

  maxWidth: number = 0
  maxHeight: number = 0
  days: number[] = []

  maxDate: string = ""

  isEditMode = false

  schedule$: Observable<Schedule>
  cells: Cell[] = []

  constructor(private router: Router, private route: ActivatedRoute, public scheduleService: ScheduleService) {
    this.route.queryParams.subscribe(() => {
      this.schedule$ = this.scheduleService.getSchedule().pipe(
        map(schedule => {
          this.maxWidth = schedule.info.daysNumber * 200 + 180
          this.maxHeight = ( schedule.info.maxTime.hours() - schedule.info.minTime.hours()) * 60 * 2
          this.days = new Array(schedule.info.daysNumber).fill(0).map((_, i) => i)

          this.maxDate = schedule.info.startWeekDate.clone().add(schedule.info.daysNumber, 'days').format('YYYY-MM-DD')
          this.cells = this.scheduleService.cells

          return schedule
        })
      )
    });
  }

  yTime(time: moment.Moment): number {
    return ((time.hours() - this.scheduleService.schedule!!.info.minTime.hours()) * 60 + time.minutes()) * 2
  }

  makeGeneral() {
    this.scheduleService.makeGeneral()
  }
}
