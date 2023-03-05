import {Component, EventEmitter, Input, Output} from "@angular/core"
import {FormControl, FormGroupDirective} from "@angular/forms"

@Component({
  selector: "ui-floating-file-chooser",
  template: ` <input
      #imageFile
      [formControl]="control"
      type="file"
      [accept]="accept"
      (input)="input.emit($event)"
    />
    <button
      uiButtonSuccess
      uiButtonSmall
      (click)="imageFile.click()"
      [innerText]="label | translate"
    ></button>
    <app-error-info *ngIf="showErrorMessage && control" [property]="control" />`,
  styles: [
    `
      :host {
        display: block;
        overflow: hidden;
      }

      input {
        display: none;
      }

      button {
        width: 100%;
        border-radius: 0;
      }
    `,
  ],
})
export class FloatingFileChooserComponent {
  @Input() label: string
  @Input() controlName: string | null = null
  @Input() showErrorMessage: boolean = true
  @Input() accept: string = ""

  @Input() id: string = ""

  @Output() input = new EventEmitter<Event>()

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
