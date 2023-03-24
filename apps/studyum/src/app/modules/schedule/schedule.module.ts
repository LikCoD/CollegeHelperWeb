import {NgModule} from "@angular/core"
import {CommonModule} from "@angular/common"
import {ScheduleRoutingModule} from "./schedule-routing.module"
import {AddSubjectDialogComponent} from "./components/edit/add-subject-dialog/add-subject-dialog.component"
import {SubjectSelectionComponent} from "./components/subject-selection/subject-selection.component"
import {SelectSubjectDialogComponent} from "./components/select-subject-dialog/select-subject-dialog.component"
import {EditScheduleComponent} from "./components/edit/edit-scdedule/edit-schedule.component"
import {ViewComponent} from "./components/view.component"
import {TranslateModule} from "@ngx-translate/core"
import {FormsModule, ReactiveFormsModule} from "@angular/forms"
import {SharedModule} from "../../shared/shared.module"
import {ModalsModule} from "@common/modals"
import {LetModule} from "@ngrx/component"
import {ErrorInfoComponent} from "../../../../../../libs/common/ui-elements/src/lib/elements/error-info/error-info.component"
import {MatButtonModule} from "@angular/material/button"
import {MatButtonToggleModule} from "@angular/material/button-toggle"
import {BaseScheduleComponent} from "./components/base-schedule/base-schedule.component"
import {ScheduleActionBarModule} from "@schedule/action-bar"
import {ScheduleCellModule} from "schedule/cell"
import {ScheduleLessonModule} from "schedule/lesson"

@NgModule({
  declarations: [
    AddSubjectDialogComponent,
    SubjectSelectionComponent,
    SelectSubjectDialogComponent,
    EditScheduleComponent,
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
    ScheduleActionBarModule,
    ScheduleCellModule,
    ScheduleLessonModule,
  ],
})
export class ScheduleModule {}
