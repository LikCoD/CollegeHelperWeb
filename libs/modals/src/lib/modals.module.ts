import {NgModule} from "@angular/core"
import {CommonModule} from "@angular/common"
import {PopupTestComponent} from "./test/popup-test/popup-test.component"
import {NgxPopperjsModule} from "ngx-popperjs"
import {PopupDirective} from "./popup/popup.directive"

@NgModule({
  imports: [CommonModule, NgxPopperjsModule],
  declarations: [PopupTestComponent, PopupDirective],
  exports: [
    PopupTestComponent,
    PopupDirective
  ]
})
export class ModalsModule {}
