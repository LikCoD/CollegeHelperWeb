import {Component, Input, OnInit} from "@angular/core"
import {Schedule} from "../../../../shared/models/schedule"
import {ScheduleService} from "../../servieces/schedule.service"
import * as moment from "moment/moment"

@Component({
  selector: "app-base-schedule",
  templateUrl: "./base-schedule.component.html",
  styleUrls: ["./base-schedule.component.scss"],
})
export class BaseScheduleComponent implements OnInit {
  @Input() schedule: Schedule
  @Input() isEditMode: boolean

  weekdays: string[]
  days: number[]

  constructor(public scheduleService: ScheduleService) {}

  ngOnInit(): void {
    this.weekdays = moment
      .weekdays()
      .map((value) => value.charAt(0).toUpperCase() + value.substring(1))
    this.weekdays = [...this.weekdays.slice(1), this.weekdays[0]]

    this.days = new Array(this.schedule.info.daysNumber).fill(0).map((_, i) => i)
  }
}
