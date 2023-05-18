import {NgModule} from "@angular/core"
import {CommonModule} from "@angular/common"
import {TopBarComponent} from "./top-bar.component"
import {FormsModule, ReactiveFormsModule} from "@angular/forms"
import {LetModule} from "@ngrx/component"
import {MatButtonModule} from "@angular/material/button"
import {MatButtonToggleModule} from "@angular/material/button-toggle"
import {TranslateModule} from "@ngx-translate/core"
import {UiElementsModule} from "@common/ui-elements"
import {MatDatepickerModule} from "@angular/material/datepicker"
import {MatNativeDateModule} from "@angular/material/core"
import {MatInputModule} from "@angular/material/input"

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    LetModule,
    MatButtonModule,
    MatButtonToggleModule,
    ReactiveFormsModule,
    TranslateModule,
    UiElementsModule,
    MatNativeDateModule,
    MatDatepickerModule,
    MatInputModule
  ],
  declarations: [TopBarComponent],
  exports: [TopBarComponent]
})
export class ScheduleActionBarModule {
}
