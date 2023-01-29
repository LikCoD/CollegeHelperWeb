import {Component} from "@angular/core"
import {FormControl, FormGroup, Validators} from "@angular/forms"
import {UserService} from "../../../../services/shared/user.service"

@Component({
  selector: "app-sign-up-with-token",
  templateUrl: "./sign-up-with-code.component.html",
  styleUrls: [
    "./sign-up-with-code.component.scss",
    "../../../../../assets/scss/form.scss",
  ],
})
export class SignUpWithCodeComponent {
  form = new FormGroup({
    code: new FormControl("", Validators.required),
  })

  constructor(private userService: UserService) {}

  submit() {
    this.userService.signUpWithCode(this.form.value)
  }
}
