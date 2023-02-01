import {Component, OnInit} from "@angular/core"
import {UserService} from "../../../services/shared/user.service"
import {User} from "../../../models/user"
import {Observable} from "rxjs"
import {Router} from "@angular/router"

@Component({
  selector: "app-profile",
  templateUrl: "./profile.component.html",
  styleUrls: ["./profile.component.scss"],
})
export class ProfileComponent implements OnInit {
  user$: Observable<User | undefined>

  constructor(private userService: UserService, private router: Router) {}

  ngOnInit(): void {
    this.user$ = this.userService.getUser()
  }

  revoke() {
    this.userService.terminateAllSessions().subscribe({
      next: (_) => this.router.navigate([""]).then(),
    })
  }

  signOut() {
    this.userService.signOut().subscribe({
      next: (_) => this.router.navigate([""]).then(),
    })
  }

  hasPermission = (user: User, permission: string) =>
    !!user?.permissions?.find((p) => p === permission)
}
