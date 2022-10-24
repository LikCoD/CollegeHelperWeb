import {Component, EventEmitter, Input, Output} from "@angular/core"
import {Lesson} from "../../../../models/schedule"
import {FormControl, FormGroup, Validators} from "@angular/forms"

@Component({
  selector: "app-lesson-addition-data",
  templateUrl: "./lesson-addition-data.component.html",
  styleUrls: ["./lesson-addition-data.component.scss"]
})
export class LessonAdditionDataComponent {
  @Input() types: string[]

  @Input()
  set lesson(lesson: Lesson) {
    this._lesson = {...lesson}

    this.form.get("type")?.setValue(lesson.type ?? "")
    this.form.get("title")?.setValue(lesson.title ?? "")
    this.form.get("description")?.setValue(lesson.description ?? "")
    this.form.get("homework")?.setValue(lesson.homework ?? "")
  }

  @Output() confirm = new EventEmitter<Lesson>()

  _lesson: Lesson

  form = new FormGroup({
    type: new FormControl("", Validators.required),
    title: new FormControl(""),
    description: new FormControl(""),
    homework: new FormControl("")
  })

  submit() {
    this._lesson.type = this.form.get("type")!.value ?? ""
    this._lesson.title = this.form.get("title")!.value ?? ""
    this._lesson.description = this.form.get("description")!.value ?? ""
    this._lesson.homework = this.form.get("homework")!.value ?? ""

    this.confirm.emit(this._lesson)
  }
}
