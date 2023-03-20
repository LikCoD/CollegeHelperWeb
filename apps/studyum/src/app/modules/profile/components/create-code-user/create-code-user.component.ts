import {Component} from "@angular/core"
import {FormControl, FormGroup, Validators} from "@angular/forms"
import {UserService} from "../../../../shared/services/core/user.service"

@Component({
  selector: "app-create-code-user",
  templateUrl: "./create-code-user.component.html",
  styleUrls: ["./create-code-user.component.scss"],
})
export class CreateCodeUserComponent {
  form = new FormGroup({
    code: new FormControl("", Validators.required),
    name: new FormControl("", Validators.required),
    type: new FormControl("group", Validators.required),
    typeName: new FormControl("", Validators.required),
  })

  constructor(private userService: UserService) {}

  submit() {
    this.userService.createCode(this.form.value).subscribe({
      next: (_) => {
        let type = this.form.get("type")?.value
        let typeName = this.form.get("typeName")?.value

        this.form.reset()

        this.form.get("type")?.setValue(type ?? "")
        this.form.get("typeName")?.setValue(typeName ?? "")
      },
    })
  }
}
