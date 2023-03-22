import {NgModule} from "@angular/core"
import {CommonModule} from "@angular/common"
import {CellComponent} from "./cell.component"
import {ScheduleLessonModule} from "schedule/lesson"
import {UiElementsModule} from "@common/ui-elements"
import {CellDirective} from "./cell.directive"

@NgModule({
  imports: [CommonModule, ScheduleLessonModule, UiElementsModule],
  declarations: [CellComponent, CellDirective],
  exports: [CellComponent, CellDirective],
})
export class ScheduleCellModule {}
