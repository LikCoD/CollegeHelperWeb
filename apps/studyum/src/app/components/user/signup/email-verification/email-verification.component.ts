import {Component} from "@angular/core"
import {FormControl, FormGroup} from "@angular/forms"
import {UserService} from "../../../../services/shared/user.service"
import {Router} from "@angular/router"
import {ToastService} from "../../../../services/ui/toast.service"

@Component({
  selector: "app-email-verification",
  templateUrl: "./email-verification.component.html",
  styleUrls: [
    "../../../../../assets/scss/form.scss",
    "./email-verification.component.scss",
  ],
})
export class EmailVerificationComponent {
  form = new FormGroup({
    code: new FormControl(""),
  })

  constructor(
    private service: UserService,
    private toastService: ToastService,
    private router: Router
  ) {}

  submit(): void {
    this.service.confirmEmail(this.form.value).subscribe({
      next: (_) =>
        this.service.user$.subscribe({
          next: (user) =>
            this.router.navigate([!user?.type ? "auth/signup/stage1" : "/"]),
        }),
    })
  }

  resendCode(): void {
    this.service.resendEmailCode().subscribe({
      next: (_) => this.toastService.showInfo("Email send successfully"),
    })
  }
}
