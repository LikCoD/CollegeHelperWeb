import {Component, EventEmitter, Input, OnInit, Output} from "@angular/core"
import {User} from "../../../../models/user"
import {UserService} from "../../../../services/shared/user.service"
import {GeneralService} from "../../../../services/shared/general.service"
import {StudyPlace} from "../../../../models/general"
import {Observable} from "rxjs"
import {FormControl, FormGroup, Validators} from "@angular/forms"
import {ScheduleTypes} from "../../../../models/schedule"
import {ScheduleService} from "../../../../services/shared/schedule.service"
import {Router} from "@angular/router"

@Component({
  selector: "app-schedule-top-bar",
  templateUrl: "./schedule-top-bar.component.html",
  styleUrls: ["./schedule-top-bar.component.scss"]
})
export class ScheduleTopBarComponent implements OnInit {
  @Input() minScale: number
  @Input() maxScale: number
  @Input() preferredMaxScale: number

  @Output() editMode = new EventEmitter<boolean>()
  @Output() scale = new EventEmitter<number>()
  @Output() generalViewMode = new EventEmitter<boolean>()

  isEditMode = false
  isEditGeneral = false
  scaleMode = 0

  user: User | undefined

  studyPlaces$: Observable<StudyPlace[]>
  findItems$: Observable<ScheduleTypes>

  findForm = new FormGroup({
    studyPlaceID: new FormControl(""),
    type: new FormControl("group", Validators.required),
    name: new FormControl("", Validators.required)
  })

  constructor(private router: Router, private userService: UserService, private generalService: GeneralService, private scheduleService: ScheduleService) {
    this.findItems$ = this.scheduleService.getTypes("")
  }

  ngOnInit(): void {
    this.studyPlaces$ = this.generalService.getNotRestrictedStudyPlaces()

    this.userService.user$.subscribe({
      next: user => {
        this.user = user
        this.findForm.get("studyPlaceID")?.setValue(user?.studyPlaceId ?? "")
      },
    })
  }

  changeStudyPlace(studyPlaces: StudyPlace[], input: HTMLInputElement): void {
    let studyPlace = studyPlaces.find(sp => sp.name == input.value)
    if (studyPlace == undefined) {
      input.value = studyPlaces[0]?.name ?? "-"
      return
    }

    this.findForm.get("studyPlaceID")?.setValue(studyPlace.id ?? "")
    this.findItems$ = this.scheduleService.getTypes(studyPlace.id)
  }

  canEdit(user: User | null | undefined): boolean {
    return user != undefined && user.permissions != undefined && user.permissions.findIndex(value => value === "editSchedule") != -1
  }

  changeEditMode() {
    this.isEditMode = !this.isEditMode
    this.editMode.emit(this.isEditMode)
  }

  changeScaleMode() {
    switch (this.scaleMode) {
      case 0:
        this.scaleMode = 1
        this.scale.emit(this.preferredMaxScale)
        break
      case 1:
        this.scaleMode = 2
        this.scale.emit(this.maxScale)
        break
      case 2:
        this.scaleMode = 0
        this.scale.emit(this.minScale)
        break
    }
  }

  submitFind(): void {
    this.router.navigate(["schedule"], {queryParams: this.findForm.value})
  }

  changeViewMode() {
    this.isEditGeneral = !this.isEditGeneral
    this.generalViewMode.emit(this.isEditGeneral)
  }
}
