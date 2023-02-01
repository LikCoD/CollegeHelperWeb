import {Component} from "@angular/core"
import {UserService} from "../../../services/shared/user.service"
import {FormControl, FormGroup, Validators} from "@angular/forms"
import {continueViaGoogle} from "../../../utils"
import {Router} from "@angular/router"

@Component({
  selector: "app-user-login",
  templateUrl: "./user-login.component.html",
  styleUrls: [
    "./user-login.component.scss",
    "../../../../assets/scss/form.scss",
  ],
})
export class UserLoginComponent {
  form = new FormGroup({
    login: new FormControl("", Validators.required),
    password: new FormControl("", Validators.required),
  })

  constructor(private userService: UserService, private router: Router) {}

  submit() {
    this.userService.login(this.form.value).subscribe({
      next: (_) => this.router.navigate([""]).then(),
    })
  }

  continueViaGoogle = () => continueViaGoogle()
}
