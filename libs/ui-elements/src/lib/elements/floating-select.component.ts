import {Component, EventEmitter, Input, OnInit, Output} from "@angular/core"
import {FormControl, FormGroupDirective} from "@angular/forms"
import {FloatingContainerDirective} from "./floating-container.directive"
import {Data} from "../models/selectData"

@Component({
  selector: "ui-floating-select",
  template: `
    <select uiSelect [id]="id" [formControl]="control" (change)="select.emit($event)">
      <option *ngFor="let option of _data" [label]="option.label" [value]="option.value"></option>
    </select>

    <label *ngIf="!!label" [for]="controlName" [innerText]="label! | translate"></label>

    <app-error-info *ngIf="showErrorMessage && control" [property]="control" />`,
  styles: [
    `
      :host {
        display: block;
      }

      select {
        text-transform: capitalize;
      }
    `
  ],
  hostDirectives: [{directive: FloatingContainerDirective}]
})
export class FloatingSelectComponent<T, D> implements OnInit {
  @Input() label: string | null = null
  @Input() controlName: string | null
  @Input() showErrorMessage: boolean = true

  @Input() id: string = ""

  @Input() set data(data: Data<T, D>[] | T[] | Map<string, T>) {
    this._data = Data.from(data)
  }

  @Output() select = new EventEmitter<Event>()
  _data: Data<T, D>[] = []

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
