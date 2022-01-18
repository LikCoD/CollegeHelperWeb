import {Component, Injectable, OnInit} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {ActivatedRoute, Router} from "@angular/router";
import {AppComponent} from "../../../app.component";

@Component({
  selector: 'app-view',
  templateUrl: './view.component.html',
  styleUrls: ['./view.component.css']
})

@Injectable()
export class ViewComponent implements OnInit {
  schedule: Schedule | undefined = undefined

  constructor(private router: Router, private http: HttpClient) {
    let studyPlaceId = localStorage.getItem("studyPlaceId")
    let type = localStorage.getItem("type")
    let name = localStorage.getItem("name")

    http.get<Schedule>(SERVER_URL + "/schedule?type=" + type +"&name=" + name +"&educationPlaceId=" + studyPlaceId).subscribe(
      (schedule: Schedule) => {
        if (schedule.error != undefined){
          alert(schedule.error)
          this.router.navigateByUrl('schedule/login')

          return
        }
        this.schedule = schedule
      }
    )
  }

  ngOnInit(): void {
  }


}


interface Schedule {
  status: State[]
  subjects: Lesson[],
  info: Info,
  error? : string
}

interface State {
  status: string,
  weekIndex: number,
  dayIndex: number
}

interface Lesson {
  weekIndex: number,
  columnIndex: number,
  rowIndex: number,
  isStay: boolean,
  subjects: Subject[]
}

interface Subject {
  subject: string,
  teacher: string,
  group: string,
  room: string,
  type: string
}

interface Info {
  weeksCount: number,
  daysCount: number,
  subjectsCount: number,
  type: string,
  name: string,
  educationPlaceId: number,
  educationPlaceName: string
}
