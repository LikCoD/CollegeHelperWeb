import {Component, OnInit} from '@angular/core';
import {Router} from "@angular/router";
import {HttpClient} from "@angular/common/http";
import {User} from "../../../data";
import {HttpService} from "../../../services/http/http.service";

@Component({
  selector: 'app-register-user',
  templateUrl: './user-register.component.html',
  styleUrls: ['./user-register.component.scss']
})
export class UserRegisterComponent implements OnInit {
  studyPlaces: Array<StudyPlace> = []

  studyPlace: StudyPlace = {
    id: -1,
    name: ""
  }

  groups: Array<string> = []

  type = "Student"
  name: string = ""

  email: string = ""
  password: string = ""
  passwordRepeat: string = ""

  changeType(type: string) {
    this.type = type
  }

  updateTypes(){
    this.http.get<Array<Types>>("api/schedule/types?studyPlaceId=" + this.studyPlace.id).subscribe((types: Array<Types>) => {
      this.groups = []

      types.forEach((item) => {
        if (item.type == "group") {
          this.groups.push(item.name)
        }
      })
    })
  }

  constructor(private router: Router, private http: HttpClient, private httpService: HttpService) {
    httpService.getStudyPlaces().subscribe((places: Array<StudyPlace>) => {
      this.studyPlaces = places
      if (places.length > 0) {
        this.studyPlace = places[0]
        this.updateTypes()
      }
    })
  }

  continue(): void {
    this.httpService.register(this.email, this.password, this.passwordRepeat, this.name, this.type, this.studyPlace, (document.getElementById("group") as HTMLInputElement)?.value)
  }

  continueViaGoogle(){
    window.location.href = `/api/user/auth?redirect=http://${window.location.host}/user/callback`
  }

  changeStudyPlace(newName: string): void {
    this.studyPlaces.forEach((studyPlace) => {
      if (studyPlace.name != newName) return

      this.studyPlace = studyPlace
    })

    this.updateTypes()
  }

  ngOnInit(): void {
    this.http.get<User>("/api/user").subscribe({
      next: (user) => {
        if (user.accepted && (user.permissions == null || !user.permissions.includes("editInfo"))) {
          alert("You can't register your info")
          this.router.navigateByUrl("/")
        }

        this.name = user.name == "" ? user.login : user.name

        if (user.type == "") return

        this.studyPlace = this.studyPlaces.find((studyPlace) => studyPlace.id == user.studyPlaceId)!!
        this.type = user.type == "group" ? "Student" : "Teacher";

        (document.getElementById("type") as HTMLSelectElement).value = this.type;

        let groupInput = (document.getElementById("group") as HTMLInputElement)
        if (groupInput != null) groupInput.value = user.typeName
      },
      error: console.log
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
