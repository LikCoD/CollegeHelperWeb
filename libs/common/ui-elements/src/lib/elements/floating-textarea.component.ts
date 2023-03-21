import {Component, Input, OnInit} from "@angular/core"
import {FloatingContainerDirective} from "./floating-container.directive"
import {FormControl, FormGroupDirective} from "@angular/forms"

@Component({
  selector: "ui-floating-textarea",
  template: ` <textarea
      uiInput
      [id]="controlName"
      [attr.list]="controlName + '_list'"
      [formControl]="control"
      [placeholder]="!!label ? (label | translate) : null"
    ></textarea>
    <label *ngIf="!!label" [for]="controlName" [innerText]="label! | translate"></label>

    <app-error-info *ngIf="showErrorMessage && control" [property]="control" />`,
  styles: [
    `
      :host {
        display: block;
      }
    `,
  ],
  hostDirectives: [{directive: FloatingContainerDirective}],
})
export class FloatingTextareaComponent<T, D> implements OnInit {
  @Input() label: string | null = null
  @Input() controlName: string | null
  @Input() showErrorMessage: boolean = true

  @Input() id: string = ""

  control: FormControl

  constructor(private formGroup: FormGroupDirective) {}

  ngOnInit(): void {
    if (!!this.controlName) {
      this.id ||= this.controlName
    }

    const form = this.formGroup.form
    this.control =
      !!this.controlName && form.contains(this.controlName!)
        ? (form.get(this.controlName!) as FormControl)
        : new FormControl<any>(null)
  }
}
