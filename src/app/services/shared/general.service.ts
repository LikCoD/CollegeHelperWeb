import {Injectable} from '@angular/core';
import {HttpService} from "../http/http.service";
import {map, Observable} from "rxjs";
import {StudyPlace} from "../../models";

@Injectable({providedIn: 'root'})
export class GeneralService {
  studyPlaces$: Observable<StudyPlace[]>

  constructor(private httpService: HttpService) {
    this.studyPlaces$ = httpService.getStudyPlaces().pipe(map(value => {
      console.log(value)
      return value
    }))
  }
}
