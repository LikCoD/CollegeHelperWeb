import { inject, Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';
import { SelectItem } from '@shared/modules/ui/entities/select';
import { StudyPlacesService } from '@shared/services/study-places.service';
import { HttpClient } from '@angular/common/http';
import { debug } from '@shared/rxjs/pipes/debug.pipe';

@Injectable({
  providedIn: 'root',
})
export class SearchScheduleDialogService {
  private http = inject(HttpClient);
  private studyPlacesService = inject(StudyPlacesService);

  studyPlaceList$ = this.studyPlacesService.getStudyPlaces({ isSchedulePublic: true }).pipe(
    map(v =>
      v.map(
        s =>
          <SelectItem>{
            display: s.name,
            value: s.id,
          }
      )
    )
  );

  getTypeNames(type: string, studyPlaceID: string | null = null): Observable<string[]> {
    return this.http
      .get<{ [key: string]: {id: string, title: string}[] }>(`api/v1/schedule/types`, {
        params: { studyPlaceID: studyPlaceID ?? '' },
      })
      .pipe(map(v => v[`${type}s`].map(v => v.title)))
  }
}
