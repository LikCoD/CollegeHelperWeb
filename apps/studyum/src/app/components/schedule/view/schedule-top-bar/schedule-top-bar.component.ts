import {Component, EventEmitter, Input, Output} from "@angular/core"
import {User} from "../../../../models/user"

@Component({
  selector: "app-schedule-top-bar",
  templateUrl: "./schedule-top-bar.component.html",
  styleUrls: ["./schedule-top-bar.component.scss"],
})
export class ScheduleTopBarComponent {
  @Input() user: User | undefined | null;
  @Input() minScale: number;
  @Input() maxScale: number;
  @Input() preferredMaxScale: number;

  @Output() editMode = new EventEmitter<boolean>();
  @Output() scale = new EventEmitter<number>();

  isEditMode = false;
  scaleMode = 0;

  canEdit(user: User | null | undefined): boolean {
    return user != undefined && user.permissions != undefined && user.permissions.findIndex(value => value === 'editSchedule') != -1;
  }

  changeEditMode() {
    this.isEditMode = !this.isEditMode;
    this.editMode.emit(this.isEditMode);
  }

  changeScaleMode() {
    switch (this.scaleMode) {
      case 0:
        this.scaleMode = 1;
        this.scale.emit(this.preferredMaxScale);
        break;
      case 1:
        this.scaleMode = 2;
        this.scale.emit(this.maxScale);
        break;
      case 2:
        this.scaleMode = 0;
        this.scale.emit(this.minScale);
        break;
    }
  }
}
