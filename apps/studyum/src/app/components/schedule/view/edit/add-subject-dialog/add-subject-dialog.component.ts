import {AfterViewInit, Component, ElementRef, Input, ViewChild} from "@angular/core"
import * as moment from "moment"
import {FormControl, FormGroup, Validators} from "@angular/forms"
import {Lesson} from "../../../../../models/schedule"
import {DialogService} from "../../../../../services/ui/dialog.service"
import {GeneralService} from "../../../../../services/shared/general.service"
import {Observable, tap} from "rxjs"
import {StudyPlace} from "../../../../../models/general"

@Component({
  selector: "app-add-subject-dialog",
  templateUrl: "./add-subject-dialog.component.html",
  styleUrls: ["./add-subject-dialog.component.scss"],
})
export class AddSubjectDialogComponent implements AfterViewInit {
  @ViewChild("primaryColorInput") primaryColorInput: ElementRef
  @ViewChild("secondaryColorInput") secondaryColorInput: ElementRef

  @Input()
  set lesson(value: Lesson | undefined | null) {
    if (!value)
      value = {
        group: "GROUP",
        room: "ROOM",
        teacher: "TEACHER",
        subject: "SUBJECT",
        primaryColor: "#F1F1F1",
        secondaryColor: "transparent",
        type: "LESSON TYPE",
        lessonIndex: 0,
        startDate: moment().add(1, "days"),
        endDate: moment().add(1, "days"),
      }

    this.form.get("lesson")!!.setValue(value)
    this.form.get("startDate")!!.setValue(value.startDate!!.format("YYYY-MM-DDTHH:mm"))
    this.form.get("endDate")!!.setValue(value.endDate!!.format("YYYY-MM-DDTHH:mm"))
  }

  form = new FormGroup({
    startDate: new FormControl(
      moment().add(1, "days").format("YYYY-MM-DDTHH:mm"),
      Validators.required
    ),
    endDate: new FormControl(
      moment().add(1, "days").add(1, "hour").format("YYYY-MM-DDTHH:mm"),
      Validators.required
    ),
    lessonIndex: new FormControl(1, [Validators.required, Validators.pattern("[0-9]+")]),
    primaryColor: new FormControl("#000000"),
    secondaryColor: new FormControl("transparent"),
    type: new FormControl("", Validators.required),
    lesson: new FormControl<Lesson | null>(null),
  })

  currentDate: string = moment().format("YYYY-MM-DD")

  studyPlace$: Observable<StudyPlace>

  constructor(public dialog: DialogService, private generalService: GeneralService) {
    this.studyPlace$ = generalService
      .getCurrentStudyPlace()
      .pipe(tap((value) => this.form.get("type")?.setValue(value.lessonTypes[0].type)))
  }

  close() {
    this.dialog.dismiss()
  }

  submit() {
    const value = this.form.value
    const lessonRaw = value.lesson
    delete value.lesson

    const lesson = <Lesson>{
      ...value,
      ...lessonRaw,
      startDate: moment.utc(value.startDate),
      endDate: moment.utc(value.endDate),
    }

    this.dialog.close(lesson)
  }

  ngAfterViewInit(): void {
    const lesson = this.form.get("lesson")!.value!

    this.form.get("primaryColor")?.setValue(lesson.primaryColor)
    this.form.get("secondaryColor")?.setValue(lesson.secondaryColor ?? "transparent")

    this.form.get("primaryColor")?.valueChanges.subscribe({
      next: (v) => {
        const lesson = this.form.get("lesson")!.value!
        lesson.primaryColor = v ?? ""
        this.form.get("lesson")!.setValue(lesson)
      },
    })
    this.form.get("secondaryColor")?.valueChanges.subscribe({
      next: (v) => {
        const lesson = this.form.get("lesson")!.value!
        lesson.secondaryColor = v ?? ""
        this.form.get("lesson")!.setValue(lesson)
      },
    })
  }
}
