import {NgModule} from "@angular/core"
import {CommonModule} from "@angular/common"
import {ScheduleRoutingModule} from "./schedule-routing.module"
import {CellComponent} from "../../components/schedule/view/cell/cell.component"
import {ScheduleSubjectComponent} from "../../components/schedule/view/schedule-subject/schedule-subject.component"
import {AddSubjectDialogComponent} from "../../components/schedule/view/edit/add-subject-dialog/add-subject-dialog.component"
import {SubjectSelectionComponent} from "../../components/schedule/view/subject-selection/subject-selection.component"
import {SelectSubjectDialogComponent} from "../../components/schedule/view/cell/select-subject-dialog/select-subject-dialog.component"
import {ScheduleCellDirective} from "../../components/schedule/view/cell/cell-directive/schedule-cell.directive"
import {EditScheduleComponent} from "../../components/schedule/view/edit/edit-scdedule/edit-schedule.component"
import {ScheduleTopBarComponent} from "../../components/schedule/view/schedule-top-bar/schedule-top-bar.component"
import {ViewComponent} from "../../components/schedule/view/view.component"
import {TranslateModule} from "@ngx-translate/core"
import {FormsModule, ReactiveFormsModule} from "@angular/forms"
import {SharedModule} from "../shared.module"
import {ModalsModule} from "modals"
import {LetModule} from "@ngrx/component"
import {ErrorInfoComponent} from "../../../../../../libs/ui-elements/src/lib/elements/error-info/error-info.component"
import {MatButtonModule} from "@angular/material/button"

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
  ],
})
export class ScheduleModule {}
