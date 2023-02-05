import {Component} from "@angular/core"
import {UserService} from "../../../../services/shared/user.service"
import {ToastService} from "../../../../services/ui/toast.service"
import {Router} from "@angular/router"
import {FormControl, FormGroup, Validators} from "@angular/forms"

@Component({
  selector: "app-password-reset-email-request",
  templateUrl: "./password-reset-email-request.component.html",
  styleUrls: [
    "../../../../../assets/scss/form.scss",
    "./password-reset-email-request.component.scss",
  ],
})
export class PasswordResetEmailRequestComponent {
  form = new FormGroup({
    email: new FormControl("", [Validators.required, Validators.email]),
  })

  constructor(
    private service: UserService,
    private toastService: ToastService,
    private router: Router
  ) {}

  submit(): void {
    this.service.resendResetPasswordCode(this.form.value).subscribe({
      next: (_) => {
        this.toastService.showInfo("Email send successfully")
        this.router.navigate(["/profile/password/reset"]).then()
      },
    })
  }
}
