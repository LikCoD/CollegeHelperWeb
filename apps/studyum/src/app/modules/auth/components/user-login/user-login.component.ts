import {Component} from "@angular/core"
import {UserService} from "../../../../shared/services/core/user.service"
import {FormControl, FormGroup, Validators} from "@angular/forms"
import {Router} from "@angular/router"

@Component({
  selector: "app-user-login",
  templateUrl: "./user-login.component.html",
  styleUrls: ["./user-login.component.scss"],
})
export class UserLoginComponent {
  form = new FormGroup({
    login: new FormControl("", Validators.required),
    password: new FormControl("", Validators.required),
  })

  constructor(private userService: UserService, private router: Router) {}

  submit(): void {
    this.userService.login(this.form.value).subscribe({
      next: (_) => this.router.navigate([""]).then(),
    })
  }
}
