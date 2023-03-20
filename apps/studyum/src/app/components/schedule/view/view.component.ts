import {Component, OnInit} from "@angular/core"
import {ActivatedRoute, Router} from "@angular/router"
import {ScheduleService} from "../../../services/shared/schedule.service"
import {Observable} from "rxjs"
import {Schedule} from "../../../models/schedule"

@Component({
  selector: "app-schedule-view",
  templateUrl: "./view.component.html",
  styleUrls: ["./view.component.scss"],
})
export class ViewComponent implements OnInit {
  isEditMode = false
  schedule$: Observable<Schedule>

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    public scheduleService: ScheduleService
  ) {}

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
}
