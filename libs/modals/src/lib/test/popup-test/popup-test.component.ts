import {Component} from "@angular/core"
import {NgxPopperjsPlacements} from "ngx-popperjs"

@Component({
  selector: "app-popup-test",
  templateUrl: "./popup-test.component.html",
  styleUrls: ["./popup-test.component.scss"],
})
export class PopupTestComponent {
  placement: NgxPopperjsPlacements = NgxPopperjsPlacements.BOTTOMSTART
}
