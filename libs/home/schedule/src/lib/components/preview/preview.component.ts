import {ChangeDetectionStrategy, Component, OnInit} from "@angular/core"
import {ScheduleService} from "../../../../../../../apps/studyum/src/app/modules/schedule/servieces/schedule.service"
import * as moment from "moment"
import {Moment} from "moment"
import {map, Observable} from "rxjs"
import {Lesson} from "../../../../../../../apps/studyum/src/app/shared/models/schedule"
import {groupBy} from "apps/studyum/src/app/utils"

@Component({
  selector: "hm-schdl-preview",
  templateUrl: "./preview.component.html",
  styleUrls: ["./preview.component.scss"],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class PreviewComponent implements OnInit {
  days$: Observable<Day[]>

  constructor(private service: ScheduleService) {
  }

  ngOnInit(): void {
    const from = this.formatDate(moment())
    const to = this.formatDate(moment().add(2, "day"))
    this.days$ = this.service.getScheduleRaw("", "", "", from, to).pipe(
      map((v) => {
        const cells = groupBy(v.lessons, (l) => l.startDate.format()).values()
        const entries = groupBy(Array(...cells), (l) => l[0].startDate.format("l")).entries()
        return Array(...entries).map(
          (v) =>
            <Day>{
              date: v[1][0][0].startDate,
              cells: v[1]
            }
        )
      })
    )
  }

  private formatDate(moment: Moment) {
    return moment.format("YYYY-MM-DD") + "T00:00:00Z"
  }
}

export interface Day {
  date: moment.Moment
  cells: Lesson[][]
}
