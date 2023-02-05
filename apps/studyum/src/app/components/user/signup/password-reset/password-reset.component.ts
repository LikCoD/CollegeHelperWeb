import {AfterViewInit, Component, ViewChild} from "@angular/core"
import {FormControl, FormGroup, Validators} from "@angular/forms"
import {sameAs} from "../../../../utils"
import {SymbolInputComponent} from "../../../../../../../../libs/ui-elements/src/lib/components/symbol-input/symbol-input.component"
import {UserService} from "../../../../services/shared/user.service"
import {ToastService} from "../../../../services/ui/toast.service"
import {ActivatedRoute, Router} from "@angular/router"

@Component({
  selector: "app-password-reset",
  templateUrl: "./password-reset.component.html",
  styleUrls: [
    "../../../../../assets/scss/form.scss",
    "./password-reset.component.scss",
  ],
})
export class PasswordResetComponent implements AfterViewInit {
  form = new FormGroup({
    code: new FormControl("", Validators.required),
    password: new FormControl("", [
      Validators.required,
      Validators.minLength(8),
    ]),
    passwordConfirm: new FormControl("", sameAs("password")),
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
    this.service.resetPassword(this.form.value).subscribe({
      next: () =>
        this.service.user$.subscribe({
          next: () => this.router.navigate(["auth/login"]),
        }),
    })
  }
}
