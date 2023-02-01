import {NgModule} from "@angular/core"
import {CommonModule} from "@angular/common"
import {SymbolInputComponent} from "./components/symbol-input/symbol-input.component"

@NgModule({
  declarations: [SymbolInputComponent],
  exports: [SymbolInputComponent],
  imports: [CommonModule],
})
export class UiElementsModule {}
