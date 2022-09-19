import {Component, EventEmitter, Input, Output} from '@angular/core';
import {User} from "../../../../models/user";

@Component({
  selector: 'app-schedule-bottom-controller',
  templateUrl: './schedule-bottom-controller.component.html',
  styleUrls: ['./schedule-bottom-controller.component.scss']
})
export class ScheduleBottomControllerComponent {

  @Input() user: User | undefined | null
  @Input() minScale: number
  @Input() maxScale: number
  @Input() preferredMaxScale: number

  @Output() editMode = new EventEmitter<boolean>()
  @Output() makeGeneral = new EventEmitter<null>()
  @Output() scale = new EventEmitter<number>()

  isEditMode = false

  canEdit(user: User | null | undefined): boolean {
    return user != undefined && user.permissions.findIndex(value => value == "editSchedule") != -1
  }

  changeEditMode() {
    this.isEditMode = !this.isEditMode
    this.editMode.emit(this.isEditMode)
  }

  rangeChange(value: string) {
    this.scale.emit(Number(value))
  }

  setScale(scale: number, range: HTMLInputElement) {
    this.scale.emit(scale)
    range.value = scale.toString()
  }
}
