import {Component, OnInit} from "@angular/core"
import {AcceptUser} from "../../../../shared/models/user"
import {Observable} from "rxjs"
import {UserService} from "../../../../shared/services/core/user.service"

@Component({
  selector: "app-accept-users",
  templateUrl: "./accept-users.component.html",
  styleUrls: ["./accept-users.component.scss"]
})
export class AcceptUsersComponent implements OnInit {
  acceptUsers$: Observable<AcceptUser[]>

  constructor(private userService: UserService) {
  }

  ngOnInit(): void {
    this.acceptUsers$ = this.userService.getAcceptUsers()
  }

  buildUser(user: AcceptUser) {
    let role = ""
    switch (user.role) {
      case "group":
        role = user.roleName
        break
      case "teacher":
        role = "Teacher"
        break
    }

    return `${user.name} ${role}`
  }

  acceptUser(users: AcceptUser[], id: string) {
    this.userService.acceptUser(id).subscribe({
      next: (_) => {
        users.splice(users.findIndex((u) => u.id == id))
      }
    })
  }

  declineUser(users: AcceptUser[], id: string) {
    this.userService.blockUser(id).subscribe({
      next: (_) => {
        users.splice(users.findIndex((u) => u.id == id))
      }
    })
  }
}
