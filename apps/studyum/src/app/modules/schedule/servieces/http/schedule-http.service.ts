import {Injectable} from "@angular/core"
import {HttpClient} from "@angular/common/http"
import {Observable} from "rxjs"
import {Lesson, Schedule, ScheduleTypes} from "../../../../shared/models/schedule"

@Injectable({providedIn: "root"})
export class ScheduleHttpService {
  API_PATH = "/api"

  constructor(private http: HttpClient) {
  }

  getSchedule(
    type: string,
    name: string,
    studyPlaceID: string,
    from: string | null = null,
    to: string | null = null
  ): Observable<Schedule> {
    let url = `${type}/${name}?studyPlaceID=${studyPlaceID}&`
    if (!type || !name) url = "?"

    return this.http.get<Schedule>(
      `${this.API_PATH}/schedule/${url}startDate=${from}&endDate=${to}`
    )
  }

  getGeneralSchedule(type: string, name: string, studyPlaceID: string): Observable<Schedule> {
    let url = `${type}/${name}?studyPlaceID=${studyPlaceID}`
    if (type == undefined || name == undefined) url = ""

    return this.http.get<Schedule>(`${this.API_PATH}/schedule/general/${url}`)
  }

  addLesson(lesson: Lesson): Observable<Lesson> {
    return this.http.post<Lesson>(`${this.API_PATH}/schedule`, lesson)
  }

  updateLesson(lesson: Lesson): Observable<Lesson> {
    return this.http.put<Lesson>(`${this.API_PATH}/schedule`, lesson)
  }

  removeLesson(lesson: Lesson): Observable<string> {
    return this.http.delete<string>(`${this.API_PATH}/schedule/${lesson.id}`)
  }

  makeGeneral(type: string, typeName: string) {
    this.http
      .post(`${this.API_PATH}/schedule/makeGeneral?type=${type}&typeName=${typeName}`, {})
      .subscribe()
  }

  getTypes(studyPlaceID: string): Observable<ScheduleTypes> {
    return this.http.get<ScheduleTypes>(`${this.API_PATH}/schedule/getTypes?id=${studyPlaceID}`)
  }

  getDateLessonByID(id: string): Observable<Lesson[]> {
    return this.http.get<Lesson[]>(`${this.API_PATH}/schedule/lessons/${id}?type=date`)
  }
}
