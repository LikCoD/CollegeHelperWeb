import {Directive, ElementRef, Input, OnInit} from "@angular/core"

@Directive({
  selector: "[uiToggleButton]",
})
export class ToggleButtonDirective implements OnInit {
  @Input() set uiToggleButton(selected: boolean) {
    this.selected = selected
  }

  @Input() set selected(selected: boolean) {
    if (selected) {
      if (!!this.selectedText) this.elRef.nativeElement.innerText = this.selectedText

      this.elRef.nativeElement.classList.add("btn-light")
      this.elRef.nativeElement.classList.remove("btn-outline-light")
    } else {
      if (!!this.text) this.elRef.nativeElement.innerText = this.text

      this.elRef.nativeElement.classList.add("btn-outline-light")
      this.elRef.nativeElement.classList.remove("btn-light")
    }
  }

  @Input() text: string = ""
  @Input() selectedText: string = this.text

  constructor(private elRef: ElementRef<HTMLButtonElement>) {
    this.elRef.nativeElement.classList.add("btn", "btn-outline-light")
  }

  ngOnInit(): void {
    if (!!this.text) this.elRef.nativeElement.innerText = this.text
  }
}
