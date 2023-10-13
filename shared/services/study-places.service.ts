import { inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of, tap } from 'rxjs';
import { StudyPlace, StudyPlaceScheme } from '@shared/entities/study-place';
import { ActivatedRoute, Params } from '@angular/router';
import { validate } from '@shared/rxjs/pipes/validate';

export interface GetStudyPlacesParams extends Params {
  isPublic?: boolean;
  isJoinPublic?: boolean;
  isSchedulePublic?: boolean;
}

@Injectable({
  providedIn: 'root',
})
export class StudyPlacesService {
  private http = inject(HttpClient);
  private route = inject(ActivatedRoute);
  private _userStudyPlace: StudyPlace | null = null;

  get currentID(): string | null {
    return this.route.snapshot.queryParams['studyPlaceID'] ?? null;
  }

  get userStudyPlace(): Observable<StudyPlace> {
    if (this._userStudyPlace) return of(this._userStudyPlace);

    return this.http
      .get<StudyPlace>('api/v1/studyPlaces/self')
      .pipe(validate(StudyPlaceScheme))
      .pipe(tap(s => (this._userStudyPlace = s)));
  }

  getStudyPlaces(params?: GetStudyPlacesParams): Observable<StudyPlace[]> {
    return this.http.get<StudyPlace[]>(`api/v1/studyPlaces`, { params });
  }
}
