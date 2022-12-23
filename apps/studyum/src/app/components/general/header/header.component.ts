import {Component, OnInit} from "@angular/core"
import {delay, Observable, tap} from "rxjs"
import {HeaderService} from "../../../services/ui/header.service"
import {animate, style, transition, trigger} from "@angular/animations"
import {UserService} from "../../../services/shared/user.service"
import {User} from "../../../models/user"

@Component({
  selector: "app-header",
  templateUrl: "./header.component.html",
  styleUrls: ["./header.component.scss"],
  animations: [
    trigger("enterAnimation", [
      transition("* => *", [
        style({transform: "translateX(0%)"}),
        animate(".18s", style({transform: "translateX(100%)"})),
        style({transform: "translateX(-100%)"}),
        animate(".18s", style({transform: "translateX(0%)"}))
      ])
    ])
  ]
})
export class HeaderComponent implements OnInit {
  public $title: Observable<string>
  public $user: Observable<User | undefined>

  public tempTitle: string
  public triggerTitleAnimation: boolean

  constructor(private service: HeaderService, private userService: UserService) {
  }

  ngOnInit(): void {
    this.$title = this.service.getTitle().pipe(
      tap((title) => {
        this.tempTitle = title
        this.triggerTitleAnimation = !this.triggerTitleAnimation
      }),
      delay(180)
    )

    this.$user = this.userService.getUser();
  }
}
