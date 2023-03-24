import {NgModule} from "@angular/core"
import {CommonModule} from "@angular/common"
import {CardComponent} from "./card.component"
import {RouterLink} from "@angular/router"
import {MatIconModule} from "@angular/material/icon"

@NgModule({
  imports: [CommonModule, RouterLink, MatIconModule],
  declarations: [CardComponent],
  exports: [CardComponent],
})
export class JournalCardModule {}
