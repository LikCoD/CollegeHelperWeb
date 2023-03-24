import {NgModule} from "@angular/core"
import {CommonModule} from "@angular/common"
import {HomeComponent} from "./components/home/home.component"
import {SharedModule} from "../../shared/shared.module"
import {TranslateModule} from "@ngx-translate/core"
import {RouterModule} from "@angular/router"
import {LetModule} from "@ngrx/component"
import {HomeScheduleModule} from "home/schedule"
import {HomeCardsModule} from "home/cards"
import {ProfileCardModule} from "profile/card"

@NgModule({
  declarations: [HomeComponent],
  imports: [
    CommonModule,
    SharedModule,
    TranslateModule.forChild(),
    RouterModule,
    LetModule,
    HomeScheduleModule,
    HomeCardsModule,
    ProfileCardModule,
  ],
  exports: [HomeComponent],
})
export class HomeModule {}
