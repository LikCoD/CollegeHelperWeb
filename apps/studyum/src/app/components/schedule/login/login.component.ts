import {Component, Injectable, OnInit} from "@angular/core"
import {Router} from "@angular/router"
import {FormControl, FormGroup, Validators} from "@angular/forms"
import {ScheduleService} from "../../../services/shared/schedule.service"
import {GeneralService} from "../../../services/shared/general.service"
import {Observable} from "rxjs"
import {UserService} from "../../../services/shared/user.service"
import {ScheduleTypes} from "../../../models/schedule"
import {StudyPlace} from "../../../models/general"

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})

@Injectable()
export class LoginScheduleComponent implements OnInit {
  form = new FormGroup({
    studyPlaceID: new FormControl(""),
    type: new FormControl("group", Validators.required),
    name: new FormControl("", Validators.required),
  })

  types$: Observable<ScheduleTypes> = this.scheduleService.getTypes("")
  studyPlaces: StudyPlace[]

  studyPlaceName = ""

  constructor(private router: Router, private scheduleService: ScheduleService, private generalService: GeneralService, private userService: UserService) {
  }

  ngOnInit(): void {
    this.userService.user$.subscribe({
      next: user => {
        this.form.get("studyPlaceID")?.setValue(user?.studyPlaceId ?? "")

        this.generalService.getNotRestrictedStudyPlaces().subscribe({
          next: studyPlaces => {
            this.studyPlaces = studyPlaces
            this.studyPlaceName = studyPlaces.find(value => value.id == user?.studyPlaceId)?.name ?? ""
            this.form.get("studyPlaceID")?.setValue(user?.studyPlaceId ?? "")
          }
        })
      }
    })
  }

  submit(): void {
    this.router.navigate(['schedule'], {queryParams: this.form.value});
  }

  getTypeByName(types: ScheduleTypes, name: string) {
    // @ts-ignore
    return types[name]
  }

  selectStudyPlace(studyPlaces: StudyPlace[], selectedName: string) {
    let studyPlace = studyPlaces.find((value) => value.name == selectedName)
    if (studyPlace == undefined) return

    this.form.get("studyPlaceID")?.setValue(studyPlace.id)
    this.types$ = this.scheduleService.getTypes(studyPlace.id)
  }
}
