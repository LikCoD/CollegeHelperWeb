import { inject, Injectable } from '@angular/core';
import { StudyPlacesService } from '@shared/services/study-places.service';
import { map } from 'rxjs';
import { SelectItem } from '@shared/modules/ui/entities/select';
import { SubmitOptions } from '@ui/forms/default-form/default-form.component';

@Injectable({
  providedIn: 'root',
})
export class SingupJoinStudyPlaceService {
  formOptions: SubmitOptions = {
    url: 'api/v1/user/join',
    method: 'PUT',
    subscribe: true,
  };

  private studyPlacesService = inject(StudyPlacesService);
  studyPlaceList$ = this.studyPlacesService.getStudyPlaces({ isJoinPublic: true })
    .pipe((map(v => v.map(s => <SelectItem>{
      display: s.name,
      value: s.id,
    }))));
}