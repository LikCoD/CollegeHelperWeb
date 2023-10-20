import { ChangeDetectionStrategy, Component, inject, OnInit } from '@angular/core';
import { StudyPlacesService } from '@shared/services/study-places.service';
import { Observable } from 'rxjs';
import { StudyPlace } from '@shared/entities/study-place';

@Component({
  selector: 'study-place-info',
  templateUrl: './study-place-info.component.html',
  styleUrls: ['./study-place-info.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class StudyPlaceInfoComponent implements OnInit {
  userStudyPlace$!: Observable<StudyPlace>;

  private studyPlacesService = inject(StudyPlacesService);

  ngOnInit(): void {
    this.userStudyPlace$ = this.studyPlacesService.userStudyPlace;
  }
}
