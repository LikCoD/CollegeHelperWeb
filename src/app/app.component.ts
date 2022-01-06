import {Component, Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {SERVER_URL} from "../main";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})



@Injectable()
export class AppComponent {
  schedule: Schedule | undefined = undefined

  constructor(private http: HttpClient) {
    http.get<Schedule>(SERVER_URL + "/schedule?type=group&name=%D0%A2-095&educationPlaceId=0").subscribe(
      (schedule: Schedule) => {
        this.schedule = schedule
      }
    )
  }

}

interface Schedule {
  "status": State[]
  "subjects": Lesson[],
  "info": Info
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
