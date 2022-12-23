import {Component, Inject} from "@angular/core"
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog"
import {AddSubjectDialogComponent} from "../../edit/add-subject-dialog/add-subject-dialog.component"
import {Cell, Lesson} from "../../../../../models/schedule"

@Component({
  selector: 'app-select-subject-dialog',
  templateUrl: './select-subject-dialog.component.html',
  styleUrls: ['./select-subject-dialog.component.scss']
})
export class SelectSubjectDialogComponent {

  lessons: Lesson[]

  constructor(public dialogRef: MatDialogRef<AddSubjectDialogComponent>, @Inject(MAT_DIALOG_DATA) public data: Cell) {
    this.lessons = data.lessons
  }

  select(lesson: Lesson) {
    this.dialogRef.close([lesson])
  }

  selectAll() {
    this.dialogRef.close(this.lessons)
  }

  close() {
    this.dialogRef.close()
  }
}
