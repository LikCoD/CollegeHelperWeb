import {Component} from '@angular/core';
import {UserService} from "../../../services/shared/user.service";
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {continueViaGoogle} from "../../../utils";

@Component({
  selector: 'app-user-login',
  templateUrl: './user-login.component.html',
  styleUrls: ['./user-login.component.scss']
})
export class UserLoginComponent {
  form = new FormGroup({
    email: new FormControl("", [Validators.required, Validators.email]),
    password: new FormControl("", Validators.required),
  })

  constructor(private userService: UserService) {
  }

  submit() {
    this.userService.login(this.form.value)
  }

  continueViaGoogle = () => continueViaGoogle()
}
