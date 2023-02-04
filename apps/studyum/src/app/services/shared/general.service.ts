import {Injectable} from "@angular/core"
import {HttpService} from "../http/http.service"
import {Observable} from "rxjs"
import {StudyPlace} from "../../models/general"

@Injectable({providedIn: "root"})
export class GeneralService {
  studyPlaces$: Observable<StudyPlace[]>
  currentStudyPlace$: Observable<StudyPlace>

  constructor(private httpService: HttpService) {
    this.studyPlaces$ = httpService.getStudyPlaces()
  }

  getCurrentStudyPlace(id: string): Observable<StudyPlace> {
    this.currentStudyPlace$ = this.httpService.getCurrentStudyPlace(id)
    return this.currentStudyPlace$
  }

  getNotRestrictedStudyPlaces() {
    return this.httpService.getStudyPlaces(false)
  }
}
