import {Directive, ElementRef, Input, OnInit} from "@angular/core"

@Directive({
  selector: "[uiToggleDarkButton]",
})
export class ToggleDarkButtonDirective implements OnInit {
  @Input() set uiToggleDarkButton(selected: boolean) {
    this.selected = selected
  }

  @Input() set selected(selected: boolean) {
    if (selected) {
      if (!!this.selectedText) this.elRef.nativeElement.innerText = this.selectedText

      this.elRef.nativeElement.classList.add("btn-dark")
      this.elRef.nativeElement.classList.remove("btn-outline-dark")
    } else {
      if (!!this.text) this.elRef.nativeElement.innerText = this.text

      this.elRef.nativeElement.classList.add("btn-outline-dark")
      this.elRef.nativeElement.classList.remove("btn-dark")
    }
  }

  @Input() text: string = ""
  @Input() selectedText: string = this.text

  constructor(private elRef: ElementRef<HTMLButtonElement>) {
    this.elRef.nativeElement.classList.add("btn", "btn-outline-dark")
  }

  ngOnInit(): void {
    if (!!this.text) this.elRef.nativeElement.innerText = this.text
  }
}
