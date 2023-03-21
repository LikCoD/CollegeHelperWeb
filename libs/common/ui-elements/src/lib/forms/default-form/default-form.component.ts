import {Component, EventEmitter, Input, Output} from "@angular/core"
import {FormGroup} from "@angular/forms"
import {continueViaGoogle} from "../../../../../../../apps/studyum/src/app/utils"

@Component({
  selector: "ui-default-form",
  templateUrl: "./default-form.component.html",
  styleUrls: ["./default-form.component.scss"],
})
export class DefaultFormComponent {
  @Input() title: string
  @Input() formGroup: FormGroup
  @Input() submitText: string = "user.login.continue"

  @Input() set showSocial(show: boolean | string) {
    this._showSocial = typeof show === "string" || show
  }

  get showSocial(): boolean {
    return this._showSocial
  }

  @Output() submit: EventEmitter<void> = new EventEmitter<void>()

  continueViaGoogle = continueViaGoogle

  private _showSocial: boolean = false
}
