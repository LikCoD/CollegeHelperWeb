import {Component, OnInit} from '@angular/core';
import {Router} from "@angular/router";
import {HttpClient} from "@angular/common/http";
import {User} from "../../../data";
import {errorHandler, user} from "../../../app.component";

@Component({
  selector: 'app-register-user',
  templateUrl: './user-register.component.html',
  styleUrls: ['./user-register.component.scss']
})
export class UserRegisterComponent implements OnInit {
  studyPlaces: Array<StudyPlace> = []

  selectedStudyPlace: StudyPlace = {
    id: -1,
    name: ""
  }

  groups: Array<string> = []

  selectedType = "Student"
  selectedName: string = ""

  email: string = ""
  password: string = ""
  passwordRepeat: string = ""

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
    if (this.email == "" || this.password == "" || this.passwordRepeat == "" || this.selectedName == "" || this.selectedStudyPlace.id == -1) {
      return
    }

    if (this.password != this.passwordRepeat || this.password.length < 8) {
      return
    }

    let user = new User(this.email, this.selectedName, this.selectedName, this.selectedType, this.selectedName, this.selectedStudyPlace.id, this.password, this.passwordRepeat)
    if (this.selectedType == "Student" && document.getElementById("group") != null) {
      user!!.typeName = (document.getElementById("group") as HTMLInputElement).value
      user!!.type = "group"
    }else{
      user!!.type = "teacher"
      user!!.typeName = this.selectedName
    }

    this.http.post("api/user", user).subscribe({
      next: (user: any) => {
        console.log(user)
        this.router.navigate(["/login"])
      },
      error: errorHandler
    })
  }

  continueViaGoogle(){
    window.location.href = `/api/user/auth?redirect=http://${window.location.host}/user/callback`
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
        if (user.accepted && (user.permissions == null || !user.permissions.includes("editInfo"))) {
          alert("You can't register your info")
          this.router.navigateByUrl("/")
        }

        this.selectedName = user.name == "" ? user.login : user.name

        if (user.type == "") return

        this.selectedStudyPlace = this.studyPlaces.find((studyPlace) => studyPlace.id == user.studyPlaceId)!!
        this.selectedType = user.type == "group" ? "Student" : "Teacher";

        (document.getElementById("type") as HTMLSelectElement).value = this.selectedType;

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
