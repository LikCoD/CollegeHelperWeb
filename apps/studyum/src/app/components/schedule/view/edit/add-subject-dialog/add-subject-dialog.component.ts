import {AfterViewInit, Component, ElementRef, Inject, ViewChild} from '@angular/core';
import * as moment from "moment";
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
import {Lesson} from "../../../../../models/schedule";

@Component({
  selector: 'app-add-subject-dialog',
  templateUrl: './add-subject-dialog.component.html',
  styleUrls: ['./add-subject-dialog.component.scss']
})
export class AddSubjectDialogComponent implements AfterViewInit {

  lesson: Lesson | undefined

  @ViewChild('primaryColorInput') primaryColorInput: ElementRef;
  @ViewChild('secondaryColorInput') secondaryColorInput: ElementRef;

  set templateSubject(value: Lesson | undefined) {
    if (value == undefined) value = {
      group: "GROUP",
      room: "ROOM",
      teacher: "TEACHER",
      subject: "SUBJECT",
      primaryColor: "#F1F1F1",
      secondaryColor: "transparent",
      startDate: moment().add(1, "days"),
      endDate: moment().add(1, "days")
    }

    this.lesson = {...value}

    this.form.get("lesson")!!.setValue(this.lesson)
    this.form.get("startDate")!!.setValue(this.lesson.startDate!!.format("YYYY-MM-DDTHH:mm"))
    this.form.get("endDate")!!.setValue(this.lesson.endDate!!.format("YYYY-MM-DDTHH:mm"))
  }

  form = new FormGroup({
    startDate: new FormControl(moment().add(1, "days").format("YYYY-MM-DDTHH:mm"), Validators.required),
    endDate: new FormControl(moment().add(1, "days").format("YYYY-MM-DDTHH:mm"), Validators.required),
    lesson: new FormControl<Lesson | null>(null),
  })

  currentDate: string = moment().format('YYYY-MM-DD');

  constructor(public dialogRef: MatDialogRef<AddSubjectDialogComponent>, @Inject(MAT_DIALOG_DATA) public data: any) {
    this.templateSubject = data.lesson
  }

  close() {
    this.dialogRef.close()
  }

  submit() {
    let value = this.form.value

    let lesson = <Lesson>{
      ...value.lesson,
      startDate: moment.utc(value.startDate),
      endDate: moment.utc(value.endDate)
    }

    this.dialogRef.close(lesson)
  }

  onPrimaryColorChange(color: string) {
    let lesson = this.form.get("lesson")!!
    lesson.value!!.primaryColor = color
    lesson.setValue(lesson.value)
  }

  onSecondaryColorChange(color: string) {
    let lessonControl = this.form.get("lesson")!!
    lessonControl.value!!.secondaryColor = color
    lessonControl.setValue(lessonControl.value)
  }

  ngAfterViewInit(): void {
    this.primaryColorInput.nativeElement.value = this.lesson!!.primaryColor
    this.secondaryColorInput.nativeElement.value = this.lesson!!.secondaryColor == "" || !this.lesson!!.secondaryColor ? this.lesson!!.primaryColor : this.lesson!!.secondaryColor
  }
}
