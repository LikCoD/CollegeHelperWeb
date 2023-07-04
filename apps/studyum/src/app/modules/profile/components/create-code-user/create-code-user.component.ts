import {Component} from "@angular/core"
import {FormControl, FormGroup, Validators} from "@angular/forms"
import {UserService} from "../../../../shared/services/core/user.service"

@Component({
  selector: "app-create-code-user",
  templateUrl: "./create-code-user.component.html",
  styleUrls: ["./create-code-user.component.scss"]
})
export class CreateCodeUserComponent {
  form = new FormGroup({
    code: new FormControl("", Validators.required),
    name: new FormControl("", Validators.required),
    role: new FormControl("group", Validators.required),
    roleName: new FormControl("", Validators.required),
    password: new FormControl("", Validators.minLength(8))
  })

  constructor(private userService: UserService) {
  }

  submit() {
    this.userService.createCode(this.form.value).subscribe({
      next: (_) => {
        let role = this.form.get("role")?.value
        let roleName = this.form.get("roleName")?.value

        this.form.reset()

        this.form.get("role")?.setValue(role ?? "")
        this.form.get("roleName")?.setValue(roleName ?? "")
      }
    })
  }
}
