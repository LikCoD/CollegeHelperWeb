import {Component, forwardRef, Input, OnInit} from '@angular/core';
import {
  AbstractControl,
  ControlValueAccessor,
  FormControl, FormGroup, NG_VALIDATORS,
  NG_VALUE_ACCESSOR, ValidationErrors,
  Validator, Validators
} from "@angular/forms";
import {Lesson} from "../../../../models";

@Component({
  selector: 'app-schedule-subject',
  templateUrl: './schedule-subject.component.html',
  styleUrls: ['./schedule-subject.component.scss'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => ScheduleSubjectComponent),
      multi: true
    }, {
      provide: NG_VALIDATORS,
      useExisting: forwardRef(() => ScheduleSubjectComponent),
      multi: true
    }
  ]
})
export class ScheduleSubjectComponent implements OnInit, Validator, ControlValueAccessor {
  type: string = "ADDED"

  value: any = ""

  @Input()
  set lesson(value: Lesson | undefined) {
    if (value == undefined) return

    this.type = value!!.type

    this.form.get("subject")!!.setValue(value.subject);
    this.form.get("teacher")!!.setValue(value.teacher);
    this.form.get("room")!!.setValue(value.room);
    this.form.get("group")!!.setValue(value.group);
  }

  @Input() editable: boolean = false;

  @Input() topCorner: boolean = false;
  @Input() bottomCorner: boolean = false;

  onChange: any

  form = new FormGroup({
    subject: new FormControl("SUBJECT", Validators.required),
    teacher: new FormControl("TEACHER", Validators.required),
    room: new FormControl("ROOM", Validators.required),
    group: new FormControl("GROUP", Validators.required),
  })

  ngOnInit(): void {
    this.form.statusChanges.subscribe(() => {
      if (typeof this.onChange !== "function") return

      this.onChange({...this.form.value, type: this.type})
    })
  }

  validate(control: AbstractControl): ValidationErrors | null {
    if (this.form.get("subject")?.errors != null) return this.form.get("subject")!!.errors
    if (this.form.get("teacher")?.errors != null) return this.form.get("teacher")!!.errors
    if (this.form.get("room")?.errors != null) return this.form.get("room")!!.errors
    if (this.form.get("group")?.errors != null) return this.form.get("group")!!.errors

    return null
  }

  registerOnChange(fn: any): void {
    this.onChange = fn
  }

  registerOnTouched(fn: any): void {
    fn()
  }

  writeValue(obj: any): void {
    if (obj == undefined) return

    this.lesson = obj
  }
}
