import {NgModule} from "@angular/core"
import {RouterModule, Routes} from "@angular/router"
import {JournalComponent} from "../components/journal/journal.component"
import {NotLoginGuard} from "../guards/not-login.guard"
import {JournalViewComponent} from "../components/journal/view/view.component"
import {JournalMonthComponent} from "../components/journal/view/base-journal/dates/journal-month/journal-month.component"
import {JournalDayComponent} from "../components/journal/view/base-journal/dates/journal-day/journal-day.component"
import {JournalColumnComponent} from "../components/journal/view/base-journal/dates/journal-column/journal-column.component"
import {JournalCollapseColumnComponent} from "../components/journal/view/base-journal/dates/journal-collapse-column/journal-collapse-column.component"
import {JournalColumnCellComponent} from "../components/journal/view/base-journal/dates/journal-column/journal-column-cell/journal-column-cell.component"
import {GenerateMarksReportComponent} from "../components/journal/generate/generate-marks-report/generate-marks-report.component"
import {GenerateAbsencesReportComponent} from "../components/journal/generate/generate-absences-report/generate-absences-report.component"
import {CellExpandComponent} from "../components/standalones/popups/cell-expand/cell-expand.component"
import {JournalCellComponent} from "../components/journal/view/base-journal/base-journal-cell/journal-cell.component"
import {BaseJournalComponent} from "../components/journal/view/base-journal/base-journal.component"
import {TranslateModule} from "@ngx-translate/core"
import {SharedModule} from "./shared.module"
import {FormsModule, ReactiveFormsModule} from "@angular/forms"
import {CommonModule} from "@angular/common"
import {ModalsModule} from "modals"
import {NgxPopperjsModule} from "ngx-popperjs"
import {AbsenceControlComponent} from "../components/standalones/popups/select-mark/enteries/absence-control.component"
import {SelectMarkComponent} from "../components/standalones/popups/select-mark/select-mark.component"
import {LessonAdditionDataComponent} from "../components/standalones/popups/lesson-addition-data/lesson-addition-data.component"
import {JournalBottomActionBarComponent} from "../components/journal/view/journal-bottom-action-bar/journal-bottom-action-bar.component"
import {BaseJournalDateItemComponent} from "../components/journal/view/base-journal/base-journal-date-item/base-journal-date-item.component"
import {BaseJournalTopActionBarComponent} from "../components/journal/view/base-journal/base-journal-top-action-bar/base-journal-top-action-bar.component"
import {LessonInfoComponent} from "../components/standalones/popups/lesson-info/lesson-info.component"
import {TextDirective} from "../../../../../libs/auto-color/src/lib/text.directive"
import {JournalService} from "../services/shared/journal/journal.service"
import {JournalCollapseService} from "../services/shared/journal/journal-collapse.service"
import {JournalCellService} from "../services/shared/journal/journal.cell.service"
import {JournalDisplayModeService} from "../services/shared/journal/journal-display-mode.service"
import {JournalLessonService} from "../services/shared/journal/journal-lesson.service"
import {JournalMarksService} from "../services/shared/journal/journal-marks.service"
import {BaseJournalMarkupComponent} from "../components/journal/view/base-journal/base-journal-markup/base-journal-markup.component"

const routes: Routes = [
  {
    title: "header.sliders.journal",
    path: "",
    component: JournalComponent,
    canActivate: [NotLoginGuard],
  },
  {
    title: "header.sliders.journal",
    path: "view",
    component: JournalViewComponent,
    canActivate: [NotLoginGuard],
  },
]

@NgModule({
  declarations: [
    CellExpandComponent,
    JournalViewComponent,
    JournalCellComponent,
    JournalComponent,
    BaseJournalComponent,
    BaseJournalMarkupComponent,
    JournalMonthComponent,
    JournalDayComponent,
    JournalColumnComponent,
    JournalCollapseColumnComponent,
    JournalColumnCellComponent,
    GenerateMarksReportComponent,
    GenerateAbsencesReportComponent,
    AbsenceControlComponent,
    SelectMarkComponent,
    LessonAdditionDataComponent,
    JournalBottomActionBarComponent,
    BaseJournalDateItemComponent,
    BaseJournalTopActionBarComponent,
    LessonInfoComponent,
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    TranslateModule.forChild(),
    FormsModule,
    ReactiveFormsModule,
    SharedModule,
    ModalsModule,
    NgxPopperjsModule,
    TextDirective,
    ModalsModule,
  ],
  providers: [
    JournalService,
    JournalCellService,
    JournalCollapseService,
    JournalDisplayModeService,
    JournalLessonService,
    JournalMarksService,
  ],
  exports: [RouterModule],
})
export class JournalModule {}
