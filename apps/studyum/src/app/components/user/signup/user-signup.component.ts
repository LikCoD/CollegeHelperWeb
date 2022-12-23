import {Component} from "@angular/core"
import {FormControl, FormGroup, Validators} from "@angular/forms"
import {continueViaGoogle, sameAs} from "../../../utils"
import {UserService} from "../../../services/shared/user.service"

@Component({
  selector: 'app-signup',
  templateUrl: './user-signup.component.html',
  styleUrls: ['./user-signup.component.scss']
})
export class UserSignupComponent {

  form = new FormGroup({
    email: new FormControl("", [Validators.required, Validators.email]),
    password: new FormControl("", [Validators.required, Validators.minLength(8)]),
    passwordConfirm: new FormControl("", sameAs("password")),
    login: new FormControl("", Validators.required),
    name: new FormControl("", Validators.required),
  })

  constructor(private userService: UserService) {
  }

  submit() {
    this.userService.signUp(this.form.value)
  }

  continueViaGoogle = () => continueViaGoogle()
}
