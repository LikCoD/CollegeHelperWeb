import {Component, Injectable} from '@angular/core';
import {Router} from "@angular/router";
import {HttpService} from "../../../services/http/http.service";
import {Types} from "../../../data";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.sass']
})

@Injectable()
export class LoginScheduleComponent {

  studyPlaces: Array<StudyPlace> = []

  selectedStudyPlace: StudyPlace = {
    id: -1,
    name: ""
  }

  types: Types = new Types()

  selectedType = "group"
  selectedName: string = ""

  updateTypes(): void {
    this.httpService.getTypes(this.selectedStudyPlace).subscribe(types => {
      this.types = types
    })
  }

  constructor(private router: Router, private httpService: HttpService) {
    httpService.getStudyPlaces().subscribe(studyPlaces => {
      this.studyPlaces = studyPlaces
      if (studyPlaces.length > 0) {
        this.selectedStudyPlace = studyPlaces[0]
        this.updateTypes()
      }
    })
  }

  login(): void {
    this.router.navigate(['schedule'], {
      queryParams: {
        studyPlaceId: this.selectedStudyPlace.id,
        type: this.selectedType,
        name: this.selectedName
      }
    });
  }

  changeStudyPlace(newName: string): void {
    this.studyPlaces.forEach((studyPlace) => {
      if (studyPlace.name != newName) return

      this.selectedStudyPlace = studyPlace
    })

    this.updateTypes()
  }
}

interface StudyPlace {
  id: number,
  name: string
}
