import {Component, ElementRef} from "@angular/core"

@Component({
  selector: "ui-google-button",
  template: `<img src="assets/google-logo.svg" alt="google" />`,
  styles: [
    `
      :host {
        padding: 0;
      }

      img {
        width: 38px;
        height: 38px;
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
