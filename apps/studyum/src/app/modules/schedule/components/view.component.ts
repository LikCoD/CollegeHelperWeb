import {Component, OnInit} from "@angular/core"
import {ActivatedRoute, Router} from "@angular/router"
import {ScheduleService} from "../servieces/schedule.service"
import {Observable} from "rxjs"
import {Schedule} from "../../../shared/models/schedule"
import {Moment} from "moment/moment"

@Component({
  selector: "app-schedule-view",
  templateUrl: "./view.component.html",
  styleUrls: ["./view.component.scss"]
})
export class ViewComponent implements OnInit {
  isEditMode: boolean = false
  schedule$: Observable<Schedule>

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    public scheduleService: ScheduleService
  ) {
  }

  ngOnInit(): void {
    this.route.queryParams.subscribe(() => {
      let params = this.router.parseUrl(this.router.url).queryParams
      this.schedule$ = this.scheduleService.getSchedule(
        params["type"],
        params["name"],
        params["studyPlaceID"]
      )
    })
  }

  makeGeneral() {
    this.scheduleService.makeGeneral()
  }

  changeViewMode(isGeneral: boolean) {
    this.scheduleService.changeViewMode(isGeneral)
  }

  changeTimeMode(isTimeMode: boolean) {
    this.scheduleService.changeTimeMode(isTimeMode)
  }

  rangeSelect(range: {from: moment.Moment; till: moment.Moment}, schedule: Schedule): void {
    this.schedule$ = this.scheduleService.getSchedule(
      schedule.info.type,
      schedule.info.typeName,
      schedule.info.studyPlaceID,
      this.formatDate(range.from),
      this.formatDate(range.till)
    )
  }

  private formatDate(moment: Moment) {
    return moment.format("YYYY-MM-DD") + "T00:00:00Z"
  }
}
