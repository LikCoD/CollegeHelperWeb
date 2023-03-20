import {AfterViewInit, Component, ViewChild} from "@angular/core"
import {FormControl, FormGroup} from "@angular/forms"
import {UserService} from "../../../../services/shared/user.service"
import {ActivatedRoute, Router} from "@angular/router"
import {ToastService} from "../../../../services/ui/toast.service"
import {SymbolInputComponent} from "ui-elements"

@Component({
  selector: "app-email-verification",
  templateUrl: "./email-verification.component.html",
  styleUrls: ["./email-verification.component.scss"],
})
export class EmailVerificationComponent implements AfterViewInit {
  form = new FormGroup({
    code: new FormControl(""),
  })

  @ViewChild("code") codeRef: SymbolInputComponent

  constructor(
    private service: UserService,
    private toastService: ToastService,
    private router: Router,
    private activeRoute: ActivatedRoute
  ) {}

  ngAfterViewInit(): void {
    this.activeRoute.queryParams.subscribe({
      next: (params) => (this.codeRef.value = params["code"] ?? ""),
    })
  }

  submit(): void {
    this.service.confirmEmail(this.form.value).subscribe({
      next: (_) =>
        this.service.user$.subscribe({
          next: (user) => this.router.navigate([!user?.type ? "auth/signup/stage1" : "/"]),
        }),
    })
  }

  resendCode(): void {
    this.service.resendEmailCode().subscribe({
      next: (_) => this.toastService.showInfo("Email send successfully"),
    })
  }
}
