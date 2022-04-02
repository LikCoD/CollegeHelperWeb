import {Component, OnInit} from '@angular/core';
import {Router} from "@angular/router";
import {HttpClient} from "@angular/common/http";
import {User} from "../../../../data";
import {errorHandler, user} from "../../../../app.component";

@Component({
  selector: 'app-edit-user',
  templateUrl: './edit-user.component.html',
  styleUrls: ['./edit-user.component.scss']
})
export class EditUserComponent implements OnInit {
  studyPlaces: Array<StudyPlace> = []

  selectedStudyPlace: StudyPlace = {
    id: -1,
    name: ""
  }

  groups: Array<string> = []

  selectedType = "Student"
  selectedName: string = ""

  changeType(type: string) {
    this.selectedType = type
  }

  updateTypes(): void {
    this.http.get<Array<Types>>("api/schedule/types?studyPlaceId=" + this.selectedStudyPlace.id).subscribe((types: Array<Types>) => {
      this.groups = []

      types.forEach((item) => {
        if (item.type == "group") {
          this.groups.push(item.name)
        }
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

  continue(): void {
    if (user == undefined) console.log("not authorized")

    user!!.name = this.selectedName
    if (this.selectedType == "Student" && document.getElementById("group") != null) {
      user!!.typeName = (document.getElementById("group") as HTMLInputElement).value
      user!!.type = "group"
    }else{
      user!!.type = "teacher"
      user!!.typeName = this.selectedName
    }
    user!!.studyPlaceId = this.selectedStudyPlace.id

    this.http.put("api/user", user!!).subscribe(
      (user: any) => {
        console.log(user)
        this.router.navigateByUrl("/")
      },
      errorHandler
    )
  }

  changeStudyPlace(newName: string): void {
    this.studyPlaces.forEach((studyPlace) => {
      if (studyPlace.name != newName) return

      this.selectedStudyPlace = studyPlace
    })

    this.updateTypes()
  }

  ngOnInit(): void {
    this.http.get<User>("/api/user").subscribe({
      next: (user) => {
        this.selectedName = user.name == "" ? user.login : user.name

        if (user.type == "") return

        this.selectedStudyPlace = this.studyPlaces.find((studyPlace) => studyPlace.id == user.studyPlaceId)!!
        this.selectedType = user.type == "group" ? "Student" : "Teacher"

        let typesSelect = document.getElementById("typeSelect") as HTMLSelectElement
        if (typesSelect != undefined) {
          typesSelect.value = this.selectedType
        }

        (document.getElementById("group") as HTMLInputElement).value = user.typeName
      },
      error: errorHandler
    })
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
