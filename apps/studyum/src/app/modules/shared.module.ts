import {NgModule} from "@angular/core"
import {CommonModule} from "@angular/common"
import {FormPropertyComponent} from "../components/general/form-property/form-property.component"
import {DialogFrameComponent} from "../components/general/dialog-frame/dialog-frame.component"
import {MoreIndicatorComponent} from "../components/standalones/more-indicator.component"
import {MomentPipe} from "../pipes/moment.pipe"
import {SelectButtonsComponent} from "../components/standalones/buttons/select-buttons.component"
import {ActionButtonsComponent} from "../components/standalones/buttons/action-buttons.component"
import {UiElementsModule} from "ui-elements"

@NgModule({
  declarations: [
    FormPropertyComponent,
    DialogFrameComponent,
    MoreIndicatorComponent,

    MomentPipe,

    SelectButtonsComponent,
    ActionButtonsComponent,
  ],
  exports: [
    FormPropertyComponent,
    DialogFrameComponent,
    MoreIndicatorComponent,

    MomentPipe,

    SelectButtonsComponent,
    ActionButtonsComponent,

    UiElementsModule,
  ],
  imports: [CommonModule, UiElementsModule],
})
export class SharedModule {}
