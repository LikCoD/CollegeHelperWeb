import {Component, ElementRef} from "@angular/core"

@Component({
  selector: "ui-google-button",
  template: `<img src="assets/google-logo.svg" alt="google" />`,
  styles: [
    `
      :host {
        display: flex !important;
        padding: 0 !important;
      }

      img {
        width: 34px;
        height: 34px;
      }
    `,
  ],
})
export class GoogleButtonComponent {
  constructor(elRef: ElementRef<HTMLButtonElement>) {
    elRef.nativeElement.type = "button"
    elRef.nativeElement.classList.add("btn", "btn-light")
  }
}
