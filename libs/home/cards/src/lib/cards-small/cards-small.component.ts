import {ChangeDetectionStrategy, Component} from "@angular/core"
import {CardsBaseComponent} from "../cards-base.component"

@Component({
  selector: "home-cards-small",
  templateUrl: "./cards-small.component.html",
  styleUrls: ["./cards-small.component.scss"],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CardsSmallComponent extends CardsBaseComponent {}
