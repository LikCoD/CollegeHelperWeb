import {ChangeDetectionStrategy, Component} from "@angular/core"
import {CardsBaseComponent} from "../cards-base.component"

@Component({
  selector: "home-cards",
  templateUrl: "./cards-default.component.html",
  styleUrls: ["./cards-default.component.scss"],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CardsDefaultComponent extends CardsBaseComponent {}
