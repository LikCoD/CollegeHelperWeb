import {Component, OnInit} from "@angular/core"
import {UserService} from "../../../services/shared/user.service"
import {User} from "../../../models/user"
import {Observable} from "rxjs"

@Component({
  selector: "app-profile",
  templateUrl: "./profile.component.html",
  styleUrls: ["./profile.component.scss"]
})
export class ProfileComponent implements OnInit {

  user$: Observable<User | undefined>

  constructor(private userService: UserService) {
  }

  ngOnInit(): void {
    this.user$ = this.userService.getUser()
  }

  revoke() {
    this.userService.revokeToken()
  }

  signOut() {
    this.userService.signOut()
  }

  hasPermission = (user: User, permission: string) => !!user?.permissions?.find(p => p === permission)
}
