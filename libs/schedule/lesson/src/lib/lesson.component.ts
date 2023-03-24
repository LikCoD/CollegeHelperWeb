import {Component, forwardRef, Input} from "@angular/core"
import {
  AbstractControl,
  ControlValueAccessor,
  FormControl,
  FormGroup,
  NG_VALIDATORS,
  NG_VALUE_ACCESSOR,
  ValidationErrors,
  Validator,
  Validators,
} from "@angular/forms"
import {Lesson} from "../../../../../apps/studyum/src/app/shared/models/schedule"

@Component({
  selector: "schdl-lesson",
  templateUrl: "./lesson.component.html",
  styleUrls: ["./lesson.component.scss"],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => LessonComponent),
      multi: true,
    },
    {
      provide: NG_VALIDATORS,
      useExisting: forwardRef(() => LessonComponent),
      multi: true,
    },
  ],
})
export class LessonComponent implements Validator, ControlValueAccessor {
  private studyPlaceID: string

  isUpdated: boolean

  @Input()
  set lesson(value: Lesson) {
    this.isUpdated = value.isGeneral ?? false
    this.studyPlaceID = value.studyPlaceId ?? ""
    this.setFormValue(value)
  }

  @Input() editable: boolean = false
  @Input() showForeground: boolean = true
  @Input() routing: boolean = false
  @Input() preview: boolean = false

  form = new FormGroup({
    id: new FormControl("", Validators.required),
    subject: new FormControl("", Validators.required),
    teacher: new FormControl("", Validators.required),
    room: new FormControl("", Validators.required),
    group: new FormControl("", Validators.required),
    primaryColor: new FormControl("#FFFFFF"),
    secondaryColor: new FormControl("transparent"),
  })

  validate(control: AbstractControl): ValidationErrors | null {
    if (this.form.get("subject")?.errors != null) return this.form.get("subject")!!.errors
    if (this.form.get("teacher")?.errors != null) return this.form.get("teacher")!!.errors
    if (this.form.get("room")?.errors != null) return this.form.get("room")!!.errors
    if (this.form.get("group")?.errors != null) return this.form.get("group")!!.errors

    return null
  }

  registerOnChange(fn: any): void {
    this.form.valueChanges.subscribe(fn)
  }

  registerOnTouched(fn: any): void {}

  writeValue(lesson: Lesson): void {
    this.setFormValue(lesson)
  }

  buildQueryParams(type: string): any {
    return {
      type: type,
      name: this.form.get(type)?.value,
      studyPlaceID: this.studyPlaceID,
    }
  }

  private setFormValue(lesson: Lesson) {
    const value = {
      id: lesson.id || null,
      subject: lesson.subject,
      teacher: lesson.teacher,
      room: lesson.room,
      group: lesson.group,
      primaryColor: lesson.primaryColor,
      secondaryColor: lesson.secondaryColor || null,
    }
    this.form.setValue(value)
  }
}
