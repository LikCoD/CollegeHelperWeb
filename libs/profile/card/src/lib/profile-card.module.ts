import {NgModule} from "@angular/core"
import {CommonModule} from "@angular/common"
import {CardComponent} from "./card.component"
import {MatButtonModule} from "@angular/material/button"
import {TranslateModule} from "@ngx-translate/core"
import {RouterLink} from "@angular/router"

@NgModule({
  imports: [CommonModule, MatButtonModule, TranslateModule, RouterLink],
  declarations: [CardComponent],
  exports: [CardComponent],
})
export class ProfileCardModule {}
