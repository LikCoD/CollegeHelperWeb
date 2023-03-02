import {NgModule} from "@angular/core"
import {CommonModule} from "@angular/common"
import {FormPropertyComponent} from "../components/general/form-property/form-property.component"
import {DialogFrameComponent} from "../components/general/dialog-frame/dialog-frame.component"
import {MoreIndicatorComponent} from "../components/standalones/more-indicator.component"
import {MomentPipe} from "../pipes/moment.pipe"
import {SelectButtonsComponent} from "../components/standalones/buttons/select-buttons.component"
import {ActionButtonsComponent} from "../components/standalones/buttons/action-buttons.component"
import {MiniSelectBtnDirective} from "../components/standalones/buttons/directives/mini-select-btn.directive"
import {SecondaryBtnDirective} from "../components/standalones/buttons/directives/secondary-btn.directive"
import {ActionSelectBtnDirective} from "../components/standalones/buttons/directives/action-select-btn.directive"
import {UiElementsModule} from "../../../../../libs/ui-elements/src"

@NgModule({
  declarations: [
    FormPropertyComponent,
    DialogFrameComponent,
    MoreIndicatorComponent,

    MomentPipe,

    SelectButtonsComponent,
    ActionButtonsComponent,

    MiniSelectBtnDirective,
    SecondaryBtnDirective,

    ActionSelectBtnDirective,
  ],
  exports: [
    FormPropertyComponent,
    DialogFrameComponent,
    MoreIndicatorComponent,

    MomentPipe,

    SelectButtonsComponent,
    ActionButtonsComponent,

    MiniSelectBtnDirective,
    SecondaryBtnDirective,

    ActionSelectBtnDirective,

    UiElementsModule,
  ],
  imports: [CommonModule, UiElementsModule],
})
export class SharedModule {}
