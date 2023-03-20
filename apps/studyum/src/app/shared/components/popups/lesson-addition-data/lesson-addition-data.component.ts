import {ChangeDetectionStrategy, Component, EventEmitter, Input, Output} from "@angular/core"
import {Lesson} from "../../../models/schedule"
import {FormControl, FormGroup, Validators} from "@angular/forms"
import {LessonType} from "../../../models/general"
import {JournalLessonService} from "../../../../modules/journal/services/journal-lesson.service"

@Component({
  selector: "app-lesson-addition-data",
  templateUrl: "./lesson-addition-data.component.html",
  styleUrls: ["./lesson-addition-data.component.scss"],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LessonAdditionDataComponent {
  @Input() types: LessonType[]
  @Output() confirm = new EventEmitter<Lesson>()
  @Output() close = new EventEmitter<null>()

  get typesName(): string[] {
    return this.types.map((t) => t.type)
  }

  form = new FormGroup({
    type: new FormControl("", Validators.required),
    title: new FormControl(""),
    description: new FormControl(""),
    homework: new FormControl(""),
  })

  _lesson: Lesson

  @Input()
  set lesson(lesson: Lesson) {
    this._lesson = {...lesson}

    this.form.get("type")?.setValue(lesson.type ?? "")
    this.form.get("title")?.setValue(lesson.title ?? "")
    this.form.get("description")?.setValue(lesson.description ?? "")
    this.form.get("homework")?.setValue(lesson.homework ?? "")
  }

  constructor(private service: JournalLessonService) {}

  submit() {
    this._lesson.type = this.form.get("type")!.value ?? ""
    this._lesson.title = this.form.get("title")!.value ?? ""
    this._lesson.description = this.form.get("description")!.value ?? ""
    this._lesson.homework = this.form.get("homework")!.value ?? ""
    this._lesson.secondaryColor =
      this.types.find((t) => t.type == this._lesson.type)?.assignedColor ?? "transparent"

    console.log(this._lesson)

    // this.service.editLesson(this._lesson)
  }
}
