import { Component, OnInit } from '@angular/core';
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {sameAs} from "../../../../utils";
import {UserService} from "../../../../services/shared/user.service";

@Component({
  selector: 'app-sign-up-with-token',
  templateUrl: './sign-up-with-token.component.html',
  styleUrls: ['./sign-up-with-token.component.scss']
})
export class SignUpWithTokenComponent {

  private readonly codeLength = 32

  form = new FormGroup({
    code: new FormControl("", [Validators.required, Validators.minLength(this.codeLength), Validators.maxLength(this.codeLength)]),
    email: new FormControl("", [Validators.required, Validators.email]),
    login: new FormControl("", Validators.required),
    password: new FormControl("", [Validators.required, Validators.minLength(8)]),
    passwordConfirm: new FormControl("", sameAs("password")),
  })

  constructor(private userService: UserService) { }

  submit() {
    this.userService.signUpWithCode(this.form.value)
  }
}
