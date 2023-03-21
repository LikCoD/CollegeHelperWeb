import {Component, Input} from "@angular/core"
import {AbstractControl} from "@angular/forms"
import {NgIf} from "@angular/common"

@Component({
  selector: "app-error-info",
  templateUrl: "./error-info.component.html",
  styleUrls: ["./error-info.component.scss"],
  standalone: true,
  imports: [NgIf],
})
export class ErrorInfoComponent {
  @Input() property: AbstractControl
  @Input() pattern: string | null
}
