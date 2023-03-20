import {Component, OnInit} from "@angular/core"
import {AcceptUser} from "../../../../shared/models/user"
import {Observable} from "rxjs"
import {UserService} from "../../../../shared/services/core/user.service"

@Component({
  selector: "app-accept-users",
  templateUrl: "./accept-users.component.html",
  styleUrls: ["./accept-users.component.scss"],
})
export class AcceptUsersComponent implements OnInit {
  acceptUsers$: Observable<AcceptUser[]>

  constructor(private userService: UserService) {}

  ngOnInit(): void {
    this.acceptUsers$ = this.userService.getAcceptUsers()
  }

  buildUser(user: AcceptUser) {
    let type = ""
    switch (user.type) {
      case "group":
        type = user.typename
        break
      case "teacher":
        type = "Teacher"
        break
    }

    return `${user.name} ${type}`
  }

  acceptUser(users: AcceptUser[], id: string) {
    this.userService.acceptUser(id).subscribe({
      next: (_) => {
        users.splice(users.findIndex((u) => u.id == id))
      },
    })
  }

  declineUser(users: AcceptUser[], id: string) {
    this.userService.blockUser(id).subscribe({
      next: (_) => {
        users.splice(users.findIndex((u) => u.id == id))
      },
    })
  }
}
