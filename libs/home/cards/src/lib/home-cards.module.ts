import {NgModule} from "@angular/core"
import {CommonModule} from "@angular/common"
import {CardComponent} from "./cards-default/card/card.component"
import {RouterLink} from "@angular/router"
import {TranslateModule} from "@ngx-translate/core"
import {CardsDefaultComponent} from "./cards-default/cards-default.component"
import {CardsSmallComponent} from "./cards-small/cards-small.component"
import {CardsBaseComponent} from "./cards-base.component"

@NgModule({
  imports: [CommonModule, RouterLink, TranslateModule],
  declarations: [CardComponent, CardsDefaultComponent, CardsSmallComponent, CardsBaseComponent],
  exports: [CardComponent, CardsDefaultComponent, CardsSmallComponent],
})
export class HomeCardsModule {}
