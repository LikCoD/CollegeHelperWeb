import {Component} from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {ScheduleService} from "../../../services/shared/schedule.service";
import {map, Observable} from "rxjs";
import {Schedule} from "../../../models/schedule";
import {UserService} from "../../../services/shared/user.service";
import * as moment from "moment";
import {weekdays} from "moment";

@Component({
  selector: 'app-view',
  templateUrl: './view.component.html',
  styleUrls: ['./view.component.scss']
})
export class ViewComponent {
  weekdays: string[]

  maxWidth: number = 0
  maxHeight: number = 0
  days: number[] = []

  maxDate: string = ""

  isEditMode = false

  maxTime: moment.Moment

  schedule$: Observable<Schedule>

  constructor(private router: Router, private route: ActivatedRoute, public scheduleService: ScheduleService, public userService: UserService) {
    this.weekdays = moment.weekdays().map(value => value.charAt(0).toUpperCase() + value.substring(1))
    this.weekdays = [...this.weekdays.slice(1), this.weekdays[0]]

    this.route.queryParams.subscribe(() => {
      let params = this.router.parseUrl(this.router.url).queryParams
      this.schedule$ = this.scheduleService.getSchedule(params["type"], params["name"], params["studyPlaceID"]).pipe(
        map(schedule => {
          this.maxWidth = schedule.info.daysNumber * 200 + 180
          this.maxTime = schedule.info.maxTime
          this.maxHeight = scheduleService.getTimeY(this.maxTime)
          this.days = new Array(schedule.info.daysNumber).fill(0).map((_, i) => i)

          this.maxDate = schedule.info.startWeekDate.clone().add(schedule.info.daysNumber, 'days').format('YYYY-MM-DD')

          return schedule
        })
      )

      this.scheduleService.scale$.subscribe({
        next: _ => this.maxHeight = scheduleService.getTimeY(this.maxTime)
      })
    });
  }

  makeGeneral() {
    this.scheduleService.makeGeneral()
  }
}
