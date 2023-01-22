import {NgModule} from "@angular/core"
import {CommonModule} from "@angular/common"
import {ErrorInfoComponent} from "../components/general/error-info/error-info.component"
import {FormPropertyComponent} from "../components/general/form-property/form-property.component"
import {DialogFrameComponent} from "../components/general/dialog-frame/dialog-frame.component"
import {MoreIndicatorComponent} from "../components/standalones/more-indicator.component"
import {MomentPipe} from "../pipes/moment.pipe"
import {SelectButtonsComponent} from "../components/standalones/buttons/select-buttons.component"
import {ActionButtonsComponent} from "../components/standalones/buttons/action-buttons.component"
import {MiniSelectBtnDirective} from "../components/standalones/buttons/directives/mini-select-btn.directive"
import {SecondaryBtnDirective} from "../components/standalones/buttons/directives/secondary-btn.directive"
import {ActionSelectBtnDirective} from "../components/standalones/buttons/directives/action-select-btn.directive"

@NgModule({
  declarations: [
    ErrorInfoComponent,
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
    ErrorInfoComponent,
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
  imports: [CommonModule]
})
export class SharedModule {
}
