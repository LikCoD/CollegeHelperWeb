import {NgModule} from "@angular/core"
import {CommonModule} from "@angular/common"
import {ScheduleRoutingModule} from "./schedule-routing.module"
import {CellComponent} from "./components/cell/cell.component"
import {ScheduleSubjectComponent} from "./components/schedule-subject/schedule-subject.component"
import {AddSubjectDialogComponent} from "./components/edit/add-subject-dialog/add-subject-dialog.component"
import {SubjectSelectionComponent} from "./components/subject-selection/subject-selection.component"
import {SelectSubjectDialogComponent} from "./components/cell/select-subject-dialog/select-subject-dialog.component"
import {ScheduleCellDirective} from "./components/cell/cell-directive/schedule-cell.directive"
import {EditScheduleComponent} from "./components/edit/edit-scdedule/edit-schedule.component"
import {ScheduleTopBarComponent} from "./components/schedule-top-bar/schedule-top-bar.component"
import {ViewComponent} from "./components/view.component"
import {TranslateModule} from "@ngx-translate/core"
import {FormsModule, ReactiveFormsModule} from "@angular/forms"
import {SharedModule} from "../../shared/shared.module"
import {ModalsModule} from "modals"
import {LetModule} from "@ngrx/component"
import {ErrorInfoComponent} from "../../../../../../libs/common/ui-elements/src/lib/elements/error-info/error-info.component"
import {MatButtonModule} from "@angular/material/button"
import {MatButtonToggleModule} from "@angular/material/button-toggle"
import {BaseScheduleComponent} from "./components/base-schedule/base-schedule.component"

@NgModule({
  declarations: [
    CellComponent,
    ScheduleSubjectComponent,
    AddSubjectDialogComponent,
    SubjectSelectionComponent,
    SelectSubjectDialogComponent,
    ScheduleCellDirective,
    EditScheduleComponent,
    ScheduleTopBarComponent,
    ViewComponent,
    BaseScheduleComponent,
  ],
  imports: [
    CommonModule,
    TranslateModule.forChild(),
    FormsModule,
    ReactiveFormsModule,
    SharedModule,
    ModalsModule,
    LetModule,
    ScheduleRoutingModule,
    ErrorInfoComponent,
    MatButtonModule,
    MatButtonToggleModule,
  ],
  exports: [CellComponent, ScheduleCellDirective],
})
export class ScheduleModule {}
