import {Component, EventEmitter, Input, OnInit, Output} from "@angular/core"
import {FloatingContainerDirective} from "./floating-container.directive"
import {FormControl, FormGroupDirective} from "@angular/forms"
import {Data} from "../models/selectData"

@Component({
  selector: "ui-floating-input",
  template: `
    <mat-form-field
      appearance="outline"
      color="accent"
      [hintLabel]="errorKey | translate : errorParams"
    >
      <mat-label>{{ label! | translate }}</mat-label>
      <input
        matInput
        [formControl]="control"
        [id]="id"
        [type]="type"
        [attr.list]="controlName + '_list'"
        (change)="change($event)"
      />
    </mat-form-field>

    <datalist *ngIf="!!_data" [id]="controlName + '_list'">
      <option *ngFor="let value of _data" [value]="value.label"></option>
    </datalist>
  `,
  styles: [
    `
      :host {
        display: block;
      }

      mat-form-field {
        width: 100%;
        color: red;
      }

      datalist {
        text-transform: capitalize;
      }

      input {
        height: 24px !important;
      }

      ::ng-deep .mat-mdc-form-field-infix {
        display: flex !important;
      }
    `,
  ],
  hostDirectives: [{directive: FloatingContainerDirective}],
})
export class FloatingInputComponent<T, D> implements OnInit {
  @Input() label: string | null = null
  @Input() type: string = ""
  @Input() controlName: string | null
  @Input() showErrorMessage: boolean = true

  @Input() id: string = ""
  @Input() datalistID: string = ""

  @Input() set data(data: Data<T, D>[] | T[] | Map<string, T>) {
    this._data = Data.from(data)
  }

  @Output() dataSelect = new EventEmitter<Data<T, D>>()

  _data: Data<T, D>[] = []

  control: FormControl

  constructor(private formGroup: FormGroupDirective) {}

  ngOnInit(): void {
    if (!!this.controlName) {
      this.id ||= this.controlName
      this.datalistID ||= this.controlName + "_list"
    }

    const form = this.formGroup.form
    this.control =
      !!this.controlName && form.contains(this.controlName!) && this._data.length == 0
        ? (form.get(this.controlName!) as FormControl)
        : new FormControl<any>(null)
  }

  change(event: Event) {
    if (!this._data) return

    const target = event.target as HTMLInputElement
    const value = target.value

    const data = this._data.find((v) => v.label === value)
    const formValue = !!data ? data.value : value

    this.formGroup.form.get(this.controlName!)!.setValue(formValue)
    this.dataSelect.emit(data)
  }

  get errors(): any {
    return this.control.errors
  }

  get errorKey(): string {
    return !this.errors || !this.control.touched ? "" : "errors." + Object.keys(this.errors)[0]
  }

  get errorParams(): any {
    return this.errors === null ? {} : this.errors[Object.keys(this.errors)[0]]
  }
}
