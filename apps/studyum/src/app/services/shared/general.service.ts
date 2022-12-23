import {Injectable} from "@angular/core"
import {HttpService} from "../http/http.service"
import {Observable} from "rxjs"
import {StudyPlace} from "../../models/general"

@Injectable({providedIn: 'root'})
export class GeneralService {
  studyPlaces$: Observable<StudyPlace[]>

  constructor(private httpService: HttpService) {
    this.studyPlaces$ = httpService.getStudyPlaces()
  }

  getNotRestrictedStudyPlaces() {
    return this.httpService.getStudyPlaces(false)
  }
}
