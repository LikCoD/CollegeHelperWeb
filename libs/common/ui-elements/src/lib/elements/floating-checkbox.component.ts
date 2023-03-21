import {Component, Input, OnInit} from "@angular/core"
import {FormControl, FormGroupDirective} from "@angular/forms"

@Component({
  selector: "ui-floating-checkbox",
  template: `
    <input [id]="id" type="checkbox" uiCheckbox [formControl]="control" placeholder=" ">
    <label *ngIf="!!label" [for]="controlName" [innerText]="label! | translate"></label>`,
  styles: [
    `
      :host {
        display: flex;
        flex-flow: row;
        align-items: center;
        gap: 8px;
      }
    `
  ]
})
export class FloatingCheckboxComponent implements OnInit {
  @Input() label: string | null = null
  @Input() controlName: string | null

  @Input() id: string = ""

  control: FormControl

  constructor(private formGroup: FormGroupDirective) {
  }

  ngOnInit(): void {
    if (!!this.controlName) {
      this.id ||= this.controlName
    }

    this.control = this.formGroup.form.get(this.controlName!) as FormControl
  }
}
