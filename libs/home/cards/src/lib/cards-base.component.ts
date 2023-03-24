import {ChangeDetectionStrategy, Component, Input} from "@angular/core"
import {Card} from "./models"
import {User} from "../../../../../apps/studyum/src/app/shared/models/user"

@Component({
  template: "",
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CardsBaseComponent {
  @Input() cards: Card[]
  @Input() user: User | undefined = undefined

  checkPermissions(permissions?: string[]): boolean {
    if (permissions == undefined) return true
    if (this.user == undefined) return false

    for (let permission of permissions)
      if (this.user?.permissions.findIndex((p) => p == permission) == -1) return false

    return true
  }
}
