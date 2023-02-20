import {Component, OnInit} from "@angular/core"
import {Observable} from "rxjs"
import {TitleService} from "../../../services/ui/title.service"
import {UserService} from "../../../services/shared/user.service"
import {User} from "../../../models/user"

@Component({
  selector: "app-header",
  templateUrl: "./header.component.html",
  styleUrls: ["./header.component.scss"],
})
export class HeaderComponent implements OnInit {
  public $user: Observable<User | undefined>

  constructor(private service: TitleService, private userService: UserService) {}

  ngOnInit(): void {
    this.$user = this.userService.getUser()
  }
}
