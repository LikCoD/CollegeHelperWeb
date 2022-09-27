import { Component, OnInit } from '@angular/core';
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {sameAs} from "../../../../utils";
import {UserService} from "../../../../services/shared/user.service";

@Component({
  selector: 'app-edit-user',
  templateUrl: './edit-user.component.html',
  styleUrls: ['./edit-user.component.scss']
})
export class EditUserComponent implements OnInit {

  form = new FormGroup({
    email: new FormControl("", [Validators.required, Validators.email]),
    password: new FormControl("", [Validators.minLength(8)]),
    passwordConfirm: new FormControl("", sameAs("password")),
    login: new FormControl("", Validators.required),
  })

  constructor(public userService: UserService) { }

  ngOnInit(): void {
    this.userService.user$.subscribe({
      next: user => {
        this.form.get("email")?.setValue(user?.email)
        this.form.get("login")?.setValue(user?.login)
      }
    })
  }

  submit() {
    this.userService.update(this.form.value)
  }

}
