import {NgModule} from "@angular/core"
import {CommonModule} from "@angular/common"
import {SymbolInputComponent} from "./components/symbol-input/symbol-input.component"
import {ColorInputComponent} from "./components/color-input/color-input.component"

@NgModule({
  declarations: [SymbolInputComponent, ColorInputComponent],
  exports: [SymbolInputComponent, ColorInputComponent],
  imports: [CommonModule],
})
export class UiElementsModule {}
