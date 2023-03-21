import {
  ChangeDetectionStrategy,
  Component,
  ElementRef,
  EventEmitter,
  Input,
  Output,
  ViewChild,
} from "@angular/core"
import {User} from "../../../../../apps/studyum/src/app/shared/models/user"
import {BehaviorSubject, Observable} from "rxjs"
import {StudyPlace} from "../../../../../apps/studyum/src/app/shared/models/general"
import {ScheduleTypes} from "../../../../../apps/studyum/src/app/shared/models/schedule"
import {FormControl, FormGroup, Validators} from "@angular/forms"
import {Router} from "@angular/router"
import {UserService} from "../../../../../apps/studyum/src/app/shared/services/core/user.service"
import {GeneralService} from "../../../../../apps/studyum/src/app/shared/services/core/general.service"
import {ScheduleService} from "../../../../../apps/studyum/src/app/modules/schedule/servieces/schedule.service"

@Component({
  selector: "schdl-top-bar",
  templateUrl: "./top-bar.component.html",
  styleUrls: ["./top-bar.component.scss"],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TopBarComponent {
  @ViewChild("studyPlaceInput") studyPlaceRef: ElementRef<HTMLInputElement>

  @Input() minScale: number
  @Input() maxScale: number
  @Input() preferredMaxScale: number

  @Output() editMode = new EventEmitter<boolean>()
  @Output() scale = new EventEmitter<number>()
  @Output() generalViewMode = new EventEmitter<boolean>()
  @Output() timeViewMode = new EventEmitter<boolean>()

  isEditMode = false
  isGeneralMode = false
  isTimeMode = true
  scaleMode = 0
  isSearchMode = false

  user: User | undefined

  studyPlaces$: Observable<StudyPlace[]>
  studyPlace$ = new BehaviorSubject<StudyPlace | null>(null)
  findItems$: Observable<ScheduleTypes>

  findForm = new FormGroup({
    studyPlaceID: new FormControl(""),
    type: new FormControl("group", Validators.required),
    name: new FormControl("", Validators.required),
  })

  constructor(
    private router: Router,
    private userService: UserService,
    private generalService: GeneralService,
    private scheduleService: ScheduleService
  ) {
    this.findItems$ = this.scheduleService.getTypes("")
  }

  ngOnInit(): void {
    this.studyPlaces$ = this.generalService.getNotRestrictedStudyPlaces()
    this.userService.user$.subscribe({
      next: (value) => (this.user = value),
    })

    this.scheduleService.schedule$.subscribe({
      next: (value) => {
        const info = value.info
        this.findForm.get("studyPlaceID")!.setValue(info.studyPlace.id)
        this.findForm.get("type")!.setValue(info.type)
        this.findForm.get("name")!.setValue(info.typeName)

        this.studyPlace$.next(info.studyPlace)
      },
    })
  }

  changeStudyPlace(studyPlaces: StudyPlace[], input: HTMLInputElement): void {
    let studyPlace = studyPlaces.find((sp) => sp.name == input.value)
    if (studyPlace == undefined) {
      input.value = studyPlaces[0]?.name ?? "-"
      return
    }

    this.findForm.get("studyPlaceID")?.setValue(studyPlace.id ?? "")
    this.findItems$ = this.scheduleService.getTypes(studyPlace.id)
  }

  canEdit(): boolean {
    return (
      !!this.user?.permissions &&
      this.user.permissions.findIndex((value) => value === "editSchedule") != -1
    )
  }

  toggleEdit() {
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

  toggleViewMode() {
    this.isGeneralMode = !this.isGeneralMode
    this.generalViewMode.emit(this.isGeneralMode)
  }

  toggleTime() {
    this.isTimeMode = !this.isTimeMode
    this.timeViewMode.emit(this.isTimeMode)
  }

  toggleSearch() {
    this.isSearchMode = !this.isSearchMode
  }
}
