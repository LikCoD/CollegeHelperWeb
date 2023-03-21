import {ChangeDetectionStrategy, Component, ElementRef, forwardRef, Input} from "@angular/core"
import {
  AbstractControl,
  ControlValueAccessor,
  NG_VALIDATORS,
  NG_VALUE_ACCESSOR,
  ValidationErrors,
  Validator,
} from "@angular/forms"

@Component({
  selector: "app-symbol-input",
  templateUrl: "./symbol-input.component.html",
  styleUrls: ["./symbol-input.component.scss"],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => SymbolInputComponent),
      multi: true,
    },
    {
      provide: NG_VALIDATORS,
      useExisting: forwardRef(() => SymbolInputComponent),
      multi: true,
    },
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SymbolInputComponent implements Validator, ControlValueAccessor {
  onChange: any

  validate(control: AbstractControl): ValidationErrors | null {
    return this.value.length === this._amount.length ? null : {required: ""}
  }

  registerOnChange(fn: any): void {
    this.onChange = fn
  }

  registerOnTouched(fn: any): void {
    fn()
  }

  writeValue(obj: any): void {
    if (obj == undefined || typeof obj !== "string") return
  }

  @Input() set amount(a: number | string) {
    if (typeof a === "string") a = Number.parseInt(a)

    this.symbols = new Array(a).fill("")
    this._amount = new Array(a).fill(0).map((_, i) => i)
  }

  _amount: number[]
  symbols: string[]

  get value(): string {
    return this.symbols.join("")
  }

  set value(v: string) {
    this.setValue(v)
  }

  constructor(private elRef: ElementRef<HTMLElement>) {}

  setSymbol(e: Event, i: number): void {
    let event = e as InputEvent
    let input = event.target as HTMLInputElement
    let next = input.parentNode?.children[i + 1] as HTMLInputElement
    next?.focus()

    this.symbols[i] = input.value

    this.onChange(this.value)
  }

  setValue(data: string, from: number = 0) {
    const parent = this.elRef.nativeElement as HTMLElement
    for (let i = from; i < parent.children.length; i++) {
      let el = parent.children[i] as HTMLInputElement
      el.value = data[i - from] ?? el.value
      this.symbols[i] = data[i - from] ?? el.value
    }

    let el = parent.children[data.length - 1] as HTMLInputElement
    el ??= parent.children[parent.children.length - 1] as HTMLInputElement
    el.focus()

    this.onChange(this.value)
  }

  paste(e: Event, from: number): void {
    const event = e as ClipboardEvent
    this.setValue(event.clipboardData?.getData("text") ?? "", from)
  }
}
