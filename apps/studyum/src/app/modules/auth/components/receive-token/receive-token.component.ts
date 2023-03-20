import {Component, HostBinding, OnInit} from "@angular/core"
import {UserService} from "../../../../shared/services/core/user.service"
import {Router} from "@angular/router"

@Component({
  selector: "app-receive-token",
  template: 'Successful, you can return to <a routerLink="/">main page</a>',
})
export class ReceiveTokenComponent implements OnInit {
  constructor(private userService: UserService, private router: Router) {}

  @HostBinding("style.color") color = "white"

  ngOnInit(): void {
    let token = this.router.parseUrl(this.router.url).queryParams["token"]
    this.userService.putToken(token).subscribe({
      next: (_) => this.router.navigate([""]).then(),
    })
  }
}
