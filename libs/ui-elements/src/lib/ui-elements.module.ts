import {NgModule} from "@angular/core"
import {CommonModule} from "@angular/common"
import {SymbolInputComponent} from "./components/symbol-input/symbol-input.component"
import {ColorInputComponent} from "./components/color-input/color-input.component"
import {ButtonDirective} from "./buttons/button.directive"
import {GoogleButtonComponent} from "./buttons/oauth/google-button/google-button.component"
import {ButtonSuccessDirective} from "./buttons/button-success.directive"
import {ButtonDangerDirective} from "./buttons/button-danger.directive"
import {ButtonSmallDirective} from "./buttons/button-small.directive"
import {ButtonWarningDirective} from "./buttons/button-warning.directive"
import {InputDirective} from "./elements/input.directive"
import {GroupContainerDirective} from "./elements/group-container.directive"
import {FloatingInputComponent} from "./elements/floating-input.component"
import {FormsModule, ReactiveFormsModule} from "@angular/forms"
import {TranslateModule} from "@ngx-translate/core"
import {ErrorInfoComponent} from "./elements/error-info/error-info.component"
import {FloatingSelectComponent} from "./elements/floating-select.component"
import {SelectDirective} from "./elements/select.directive"
import {SelectSmallDirective} from "./elements/select-small.directive"
import {FloatingCheckboxComponent} from "./elements/floating-checkbox.component"
import {CheckboxDirective} from "./elements/checkbox.directive"
import {ToggleButtonDirective} from "./buttons/toggle-button.directive"
import {GroupContainerSmallDirective} from "./elements/group-container-small.directive"
import {FloatingFileChooserComponent} from "./elements/floating-file-chooser.component"
import {FloatingTextareaComponent} from "./elements/floating-textarea.component"
import {ToggleDarkButtonDirective} from "./buttons/toggle-dark-button.directive"

@NgModule({
  declarations: [
    SymbolInputComponent,
    ColorInputComponent,
    ButtonDirective,
    GoogleButtonComponent,
    ButtonSuccessDirective,
    ButtonDangerDirective,
    ButtonSmallDirective,
    ButtonWarningDirective,
    InputDirective,
    GroupContainerDirective,
    FloatingInputComponent,
    FloatingSelectComponent,
    FloatingTextareaComponent,
    SelectDirective,
    SelectSmallDirective,
    FloatingCheckboxComponent,
    CheckboxDirective,
    ToggleButtonDirective,
    GroupContainerSmallDirective,
    FloatingFileChooserComponent,
    ToggleDarkButtonDirective,
  ],
  exports: [
    SymbolInputComponent,
    ColorInputComponent,
    ButtonDirective,
    GoogleButtonComponent,
    ButtonSuccessDirective,
    ButtonDangerDirective,
    ButtonSmallDirective,
    ButtonWarningDirective,
    InputDirective,
    SelectDirective,
    GroupContainerDirective,
    FloatingInputComponent,
    FloatingSelectComponent,
    SelectSmallDirective,
    FloatingCheckboxComponent,
    ToggleButtonDirective,
    GroupContainerSmallDirective,
    FloatingFileChooserComponent,
    FloatingTextareaComponent,
    ToggleDarkButtonDirective,
  ],
  imports: [CommonModule, FormsModule, ReactiveFormsModule, TranslateModule, ErrorInfoComponent],
})
export class UiElementsModule {}
