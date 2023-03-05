import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Input,
  OnInit,
  Output,
  TrackByFunction,
} from "@angular/core"
import {FormControl, FormGroupDirective} from "@angular/forms"
import {FloatingContainerDirective} from "./floating-container.directive"
import {Data} from "../models/selectData"

@Component({
  selector: "ui-floating-select",
  template: ` <select uiSelect [id]="id" [formControl]="control">
      <option
        *ngFor="let option of _data; trackBy: track"
        [label]="option.label"
        [value]="option.value"
      ></option>
    </select>

    <label *ngIf="!!label" [for]="id" [innerText]="label! | translate"></label>

    <app-error-info *ngIf="showErrorMessage && control" [property]="control" />`,
  styles: [
    `
      :host {
        display: block;
      }

      select {
        text-transform: capitalize;
      }
    `,
  ],
  hostDirectives: [{directive: FloatingContainerDirective}],
  changeDetection: ChangeDetectionStrategy.OnPush,
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

  track: TrackByFunction<any> = (i: number, v: Data<T, D>) => v.value

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
