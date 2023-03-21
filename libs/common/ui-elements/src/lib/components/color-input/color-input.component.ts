import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  ElementRef,
  EventEmitter,
  forwardRef,
  Input,
  Output,
  ViewChild,
} from "@angular/core"
import {ControlValueAccessor, NG_VALUE_ACCESSOR} from "@angular/forms"

@Component({
  selector: "app-color-input",
  templateUrl: "./color-input.component.html",
  styleUrls: ["./color-input.component.scss"],
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      multi: true,
      useExisting: forwardRef(() => ColorInputComponent),
    },
  ],
})
export class ColorInputComponent implements ControlValueAccessor {
  @Input() clearable: boolean = false
  @Input() value: string = "#000000"

  @Output() color = new EventEmitter<string>()

  @ViewChild("clearBtnEl") clearBtn: ElementRef<HTMLButtonElement>

  private _onChange: (value: string) => void
  private _onTouched: () => void

  constructor(private ref: ElementRef<HTMLElement>, private cdr: ChangeDetectorRef) {
    ref.nativeElement.classList.add("btn-group")
  }

  input(e: Event): void {
    const el = e.target! as HTMLInputElement

    this.value = el.value
    this._onChange(this.value)
    this.color.emit(this.value)
  }

  toggleTransition(show: boolean) {
    this._onTouched()
    if (!this.clearBtn?.nativeElement) return

    const btn = this.clearBtn.nativeElement
    show ? btn.classList.remove("transition-disable") : btn.classList.add("transition-disable")
  }

  clear(): void {
    this.value = "transparent"
    this._onChange(this.value)
    this.color.emit("transparent")
  }

  registerOnChange = (fn: any): void => (this._onChange = fn)
  registerOnTouched = (fn: any): void => (this._onTouched = fn)

  writeValue(obj: any): void {
    if (typeof obj !== "string") return

    this.value = obj
    this.cdr.detectChanges()
  }
}
