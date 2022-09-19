import {Component} from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {ScheduleService} from "../../../services/shared/schedule.service";
import {map, Observable} from "rxjs";
import {Schedule} from "../../../models/schedule";
import {UserService} from "../../../services/shared/user.service";
import {User} from "../../../models/user";

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

  constructor(private router: Router, private route: ActivatedRoute, public scheduleService: ScheduleService, public userService: UserService) {
    this.route.queryParams.subscribe(() => {
      let params = this.router.parseUrl(this.router.url).queryParams
      this.schedule$ = this.scheduleService.getSchedule(params["type"], params["name"], params["studyPlaceID"]).pipe(
        map(schedule => {
          this.maxWidth = schedule.info.daysNumber * 200 + 180
          this.maxHeight = schedule.info.maxTime.diff(schedule.info.minTime, 'minutes') * 2
          this.days = new Array(schedule.info.daysNumber).fill(0).map((_, i) => i)

          this.maxDate = schedule.info.startWeekDate.clone().add(schedule.info.daysNumber, 'days').format('YYYY-MM-DD')

          return schedule
        })
      )
    });
  }

  makeGeneral(schedule: Schedule) {
    this.scheduleService.makeGeneral()
  }
}
