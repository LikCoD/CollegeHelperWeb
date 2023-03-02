import {Component, OnInit} from "@angular/core"
import {FormControl, FormGroup, Validators} from "@angular/forms"
import {UserService} from "../../../../services/shared/user.service"
import {StudyPlace} from "../../../../models/general"
import {User} from "../../../../models/user"
import {GeneralService} from "../../../../services/shared/general.service"
import {Router} from "@angular/router"
import {map, Observable} from "rxjs"
import {Data} from "../../../../../../../../libs/ui-elements/src/lib/models/selectData"

@Component({
  selector: "app-stage1",
  templateUrl: "./signup-stage1.component.html",
  styleUrls: ["./signup-stage1.component.scss", "../../../../../assets/scss/form.scss"]
})
export class SignupStage1Component implements OnInit {
  form = new FormGroup({
    name: new FormControl("", Validators.required),
    studyPlaceId: new FormControl("", Validators.required),
    type: new FormControl("group", Validators.required),
    typeName: new FormControl("", Validators.required)
  })

  studyPlaces$: Observable<Data<StudyPlace, string>[]>

  constructor(
    public userService: UserService,
    private generalService: GeneralService,
    public router: Router
  ) {
  }

  ngOnInit(): void {
    this.studyPlaces$ = this.generalService.studyPlaces$.pipe(
      map((v) => v.map((s) => new Data<StudyPlace, string>(s, s.id, s.name)))
    )
  }

  selectType(user: User) {
    if (this.form.get("type")?.value == "teacher") {
      this.form.get("typeName")?.setValue(user.name)
    }
  }

  submit() {
    this.userService.signUpStage1(this.form.value).subscribe({
      next: (_) => this.router.navigate([""])
    })
  }
}
