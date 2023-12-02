import { inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, map, Observable, pipe, UnaryFunction } from 'rxjs';
import { filterNotNull } from '@shared/rxjs/pipes/filterNotNull.pipe';
import { SelectItem, SelectItems } from '@shared/modules/ui/entities/select';
import {
  ScheduleTypeEntry,
  ScheduleTypes,
} from '@schedule/modules/schedule-edit/dialogs/schedule-add-lesson-dialog/schedule-add-lesson-dialog.entities';
import { StudyPlacesService } from '@shared/services/study-places.service';

@Injectable({
  providedIn: 'root',
})
export class ScheduleAddGeneralLessonService {
  private http = inject(HttpClient);
  private studyPlacesService = inject(StudyPlacesService);

  private _types$ = new BehaviorSubject<ScheduleTypes | null>(null);

  get types$(): Observable<ScheduleTypes> {
    return this._types$.pipe(filterNotNull());
  }

  get subjects$(): Observable<SelectItems> {
    return this.types$.pipe(ScheduleAddGeneralLessonService.mapTypesToSelectValues('subjects'));
  }

  get teachers$(): Observable<SelectItems> {
    return this.types$.pipe(ScheduleAddGeneralLessonService.mapTypesToSelectValues('teachers'));
  }

  get groups$(): Observable<SelectItems> {
    return this.types$.pipe(ScheduleAddGeneralLessonService.mapTypesToSelectValues('groups'));
  }

  get rooms$(): Observable<SelectItems> {
    return this.types$.pipe(ScheduleAddGeneralLessonService.mapTypesToSelectValues('rooms'));
  }

  get primaryColors$(): Observable<SelectItems> {
    return this.studyPlacesService.userStudyPlace.pipe(map(s => s.primaryColorSet));
  }

  get secondaryColors$(): Observable<SelectItems> {
    return this.studyPlacesService.userStudyPlace.pipe(map(s => s.secondaryColorSet));
  }

  private static typeToSelectValue(type: ScheduleTypeEntry): SelectItem {
    return {
      id: type.id,
      value: type.id,
      display: type.title,
    };
  }

  private static typesToSelectValues(types: ScheduleTypeEntry[]): SelectItems {
    return types.map(ScheduleAddGeneralLessonService.typeToSelectValue);
  }

  private static mapTypesToSelectValues(
    typeName: string
  ): UnaryFunction<Observable<ScheduleTypes>, Observable<SelectItems>> {
    return pipe(
      map(v => v[typeName]),
      map(ScheduleAddGeneralLessonService.typesToSelectValues)
    );
  }

  load(): void {
    this.http
      .get<ScheduleTypes>(`api/v1/schedule/types`)
      .subscribe(this._types$.next.bind(this._types$));
  }
}
