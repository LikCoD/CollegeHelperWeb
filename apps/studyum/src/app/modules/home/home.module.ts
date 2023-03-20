import {NgModule} from "@angular/core"
import {CommonModule} from "@angular/common"
import {HomeComponent} from "../../components/home/home.component"
import {HomeCardComponent} from "../../components/home/home-card/home-card.component"
import {SharedModule} from "../shared.module"
import {TranslateModule} from "@ngx-translate/core"
import {RouterModule} from "@angular/router"
import {LetModule} from "@ngrx/component"

@NgModule({
  declarations: [HomeComponent, HomeCardComponent],
  imports: [CommonModule, SharedModule, TranslateModule.forChild(), RouterModule, LetModule],
  exports: [HomeComponent],
})
export class HomeModule {}
