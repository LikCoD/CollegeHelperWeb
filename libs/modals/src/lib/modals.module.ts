import {NgModule} from "@angular/core"
import {CommonModule} from "@angular/common"
import {PopupTestComponent} from "./test/popup-test/popup-test.component"
import {NgxPopperjsModule} from "ngx-popperjs"
import {PopupDirective} from "./popup/popup.directive"
import {GlassmorphismFrameComponent} from "./components/glassmorphism-frame.component"

@NgModule({
  imports: [CommonModule, NgxPopperjsModule],
  declarations: [
    PopupTestComponent,
    PopupDirective,
    GlassmorphismFrameComponent,
  ],
  exports: [PopupTestComponent, PopupDirective, GlassmorphismFrameComponent],
})
export class ModalsModule {}
