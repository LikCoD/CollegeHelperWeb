import { inject, Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';
import { SelectItem } from '@shared/modules/ui/entities/select';
import { StudyPlacesService } from '@shared/services/study-places.service';
import { HttpClient } from '@angular/common/http';

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

  getTypeNames(type: string, studyPlaceID: string | null = null): Observable<SelectItem[]> {
    return this.http
      .get<{ [key: string]: { id: string; title: string }[] }>(`api/v1/schedule/types`, {
        params: { studyPlaceID: studyPlaceID ?? '' },
      })
      .pipe(map(v => v[`${type}s`].map(this.convertType.bind(this))));
  }

  private convertType(type: { id: string; title: string }): SelectItem {
    return {
      id: type.id,
      value: type.id,
      display: type.title,
    };
  }
}
