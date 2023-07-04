import {ChangeDetectionStrategy, Component, EventEmitter, Input, Output} from "@angular/core"
import {User} from "../../../../../apps/studyum/src/app/shared/models/user"

@Component({
  selector: "prfl-card",
  templateUrl: "./card.component.html",
  styleUrls: ["./card.component.scss"],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class CardComponent {
  @Input() user: User

  @Output() signout = new EventEmitter<MouseEvent>()
  @Output() revoke = new EventEmitter<MouseEvent>()

  warnings(): Warning[] {
    let warnings: Warning[] = []
    if (!this.user.verifiedEmail)
      warnings.push({
        message: "Email not verified",
        routerLink: "/auth/email/verification",
        color: "#FF4B4B"
      })
    if (!this.user.studyPlaceInfo)
      warnings.push({
        message: "You're not a member",
        routerLink: "/auth/signup/stage1",
        color: "#FF4B4B"
      })

    return warnings
  }
}

interface Warning {
  message: string
  routerLink: string
  color: string
}
