import {Component} from "@angular/core"
import {FormControl, FormGroup, Validators} from "@angular/forms"
import {UserService} from "../../../../../shared/services/core/user.service"
import {Router} from "@angular/router"

@Component({
  selector: "app-sign-up-with-token",
  templateUrl: "./sign-up-with-code.component.html",
  styleUrls: ["./sign-up-with-code.component.scss"],
})
export class SignUpWithCodeComponent {
  form = new FormGroup({
    code: new FormControl("", Validators.required),
  })

  constructor(private userService: UserService, private router: Router) {}

  submit() {
    this.userService.signUpWithCode(this.form.value).subscribe({
      next: (_) => this.router.navigate([""]).then(),
    })
  }
}
