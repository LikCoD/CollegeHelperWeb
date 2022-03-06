import {Component, Injectable} from '@angular/core';
import {Router} from "@angular/router";
import {HttpClient} from "@angular/common/http";

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

  types: Map<string, Array<Types>> = new Map<string, Array<Types>>([
    ["group", []],
    ["teacher", []],
    ["subject", []],
    ["room", []]
  ]);

  selectedType = "group"
  selectedName: string = ""

  updateTypes(): void {
    this.http.get<Array<Types>>("api/schedule/types?studyPlaceId=" + this.selectedStudyPlace.id).subscribe((types: Array<Types>) => {
      this.types.set("teacher", [])
      this.types.set("group", [])
      this.types.set("subject", [])
      this.types.set("room", [])

      types.forEach((item) => {
        this.types.get(item.type)?.push(item)
      })
    })
  }

  constructor(private router: Router, private http: HttpClient) {
    http.get<Array<StudyPlace>>("api/studyPlaces").subscribe((places: Array<StudyPlace>) => {
      this.studyPlaces = places
      if (places.length > 0) {
        this.selectedStudyPlace = places[0]
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

interface Types {
  type: string,
  name: string
}

interface StudyPlace {
  id: number,
  name: string
}
