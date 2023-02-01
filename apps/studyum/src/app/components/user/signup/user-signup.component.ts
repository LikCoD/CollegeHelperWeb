import {Component} from "@angular/core"
import {FormControl, FormGroup, Validators} from "@angular/forms"
import {continueViaGoogle, sameAs} from "../../../utils"
import {UserService} from "../../../services/shared/user.service"
import {Router} from "@angular/router"

@Component({
  selector: "app-signup",
  templateUrl: "./user-signup.component.html",
  styleUrls: [
    "./user-signup.component.scss",
    "../../../../assets/scss/form.scss",
  ],
})
export class UserSignupComponent {
  form = new FormGroup({
    email: new FormControl("", Validators.email),
    password: new FormControl("", Validators.minLength(8)),
    passwordConfirm: new FormControl("", sameAs("password")),
    login: new FormControl("", Validators.required),
    code: new FormControl(""),
  })

  constructor(private userService: UserService, private router: Router) {}

  submit() {
    this.userService.signUp(this.form.value).subscribe({
      next: (_) => this.router.navigate(["auth/email/verification"]).then(),
    })
  }

  continueViaGoogle = () => continueViaGoogle()
}
