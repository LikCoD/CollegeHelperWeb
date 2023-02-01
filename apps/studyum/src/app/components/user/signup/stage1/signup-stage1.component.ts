import {Component} from "@angular/core"
import {FormControl, FormGroup, Validators} from "@angular/forms"
import {UserService} from "../../../../services/shared/user.service"
import {StudyPlace} from "../../../../models/general"
import {User} from "../../../../models/user"
import {GeneralService} from "../../../../services/shared/general.service"
import {Router} from "@angular/router"

@Component({
  selector: "app-stage1",
  templateUrl: "./signup-stage1.component.html",
  styleUrls: [
    "./signup-stage1.component.scss",
    "../../../../../assets/scss/form.scss",
  ],
})
export class SignupStage1Component {
  form = new FormGroup({
    name: new FormControl("", Validators.required),
    studyPlaceId: new FormControl("", Validators.required),
    type: new FormControl("group", Validators.required),
    typeName: new FormControl("", Validators.required),
  })

  selectedStudyPlace = ""
  showTypeName = true

  constructor(
    public userService: UserService,
    public generalService: GeneralService,
    public router: Router
  ) {}

  studyPlaceChange(event: Event, studyPlaces: StudyPlace[]) {
    let input = event.target as HTMLInputElement

    let studyPlace = studyPlaces.find((value) => value.name == input.value)
    if (studyPlace == undefined) {
      input.value = this.selectedStudyPlace
      return
    }

    this.form.get("studyPlaceId")?.setValue(studyPlace.id)
    this.selectedStudyPlace = input.value
  }

  markStudyPlaceAsTouched() {
    this.form.get("studyPlaceId")?.markAsTouched()
  }

  onTypeChange(user: User) {
    if (this.form.get("type")?.value == "teacher") {
      this.form.get("typeName")?.setValue(user.name)
    }
  }

  submit() {
    this.userService.signUpStage1(this.form.value).subscribe({
      next: (_) => this.router.navigate([""]),
    })
  }
}
