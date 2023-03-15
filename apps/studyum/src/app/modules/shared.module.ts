import {NgModule} from "@angular/core"
import {CommonModule} from "@angular/common"
import {DialogFrameComponent} from "../components/general/dialog-frame/dialog-frame.component"
import {MoreIndicatorComponent} from "../components/standalones/more-indicator.component"
import {MomentPipe} from "../pipes/moment.pipe"
import {SelectButtonsComponent} from "../components/standalones/buttons/select-buttons.component"
import {UiElementsModule} from "ui-elements"
import {MatButtonToggleModule} from "@angular/material/button-toggle"

@NgModule({
  declarations: [DialogFrameComponent, MoreIndicatorComponent, MomentPipe, SelectButtonsComponent],
  exports: [
    DialogFrameComponent,
    MoreIndicatorComponent,

    MomentPipe,

    SelectButtonsComponent,

    UiElementsModule,
  ],
  imports: [CommonModule, UiElementsModule, MatButtonToggleModule],
})
export class SharedModule {}
