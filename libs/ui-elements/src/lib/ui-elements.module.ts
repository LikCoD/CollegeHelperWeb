import {NgModule} from "@angular/core"
import {CommonModule} from "@angular/common"
import {SymbolInputComponent} from "./components/symbol-input/symbol-input.component"
import {ColorInputComponent} from "./components/color-input/color-input.component"
import {GoogleButtonComponent} from "./buttons/oauth/google-button/google-button.component"
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
import {GroupContainerSmallDirective} from "./elements/group-container-small.directive"
import {FloatingFileChooserComponent} from "./elements/floating-file-chooser.component"
import {FloatingTextareaComponent} from "./elements/floating-textarea.component"
import {ToggleDarkButtonDirective} from "./buttons/toggle-dark-button.directive"
import {MatButtonModule} from "@angular/material/button"
import {MatInputModule} from "@angular/material/input"

@NgModule({
  declarations: [
    SymbolInputComponent,
    ColorInputComponent,
    GoogleButtonComponent,
    InputDirective,
    GroupContainerDirective,
    FloatingInputComponent,
    FloatingSelectComponent,
    FloatingTextareaComponent,
    SelectDirective,
    SelectSmallDirective,
    FloatingCheckboxComponent,
    CheckboxDirective,
    GroupContainerSmallDirective,
    FloatingFileChooserComponent,
    ToggleDarkButtonDirective,
  ],
  exports: [
    SymbolInputComponent,
    ColorInputComponent,
    GoogleButtonComponent,
    InputDirective,
    SelectDirective,
    GroupContainerDirective,
    FloatingInputComponent,
    FloatingSelectComponent,
    SelectSmallDirective,
    FloatingCheckboxComponent,
    GroupContainerSmallDirective,
    FloatingFileChooserComponent,
    FloatingTextareaComponent,
    ToggleDarkButtonDirective,
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    TranslateModule,
    ErrorInfoComponent,
    MatButtonModule,
    MatInputModule,
  ],
})
export class UiElementsModule {}
