import {Component, Input} from "@angular/core"
import {Lesson} from "../../../../../shared/models/schedule"
import {DialogService} from "../../../../../shared/services/ui/dialog.service"

@Component({
  selector: "app-select-subject-dialog",
  templateUrl: "./select-subject-dialog.component.html",
  styleUrls: ["./select-subject-dialog.component.scss"],
})
export class SelectSubjectDialogComponent {
  @Input() lessons: Lesson[]
  @Input() multiSelect = true

  constructor(private dialog: DialogService) {}

  select(lesson: Lesson) {
    this.dialog.close([lesson])
  }

  selectAll() {
    this.dialog.close(this.lessons)
  }

  close() {
    this.dialog.dismiss()
  }
}
