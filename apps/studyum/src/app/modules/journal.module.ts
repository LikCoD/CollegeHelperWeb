import {NgModule} from "@angular/core"
import {RouterModule, Routes} from "@angular/router"
import {JournalComponent} from "../components/journal/journal.component"
import {NotLoginGuard} from "../guards/not-login.guard"
import {JournalViewComponent} from "../components/journal/view/view.component"
import {BaseJournalDateComponent} from "../components/journal/view/base-journal/base-journal-dates/base-journal-date/base-journal-date.component"
import {BaseJournalColumnCellComponent} from "../components/journal/view/base-journal/base-journal-row/base-journal-column-cell/base-journal-column-cell.component"
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
import {JournalBottomBarComponent} from "../components/journal/view/journal-bottom-bar/journal-bottom-bar.component"
import {BaseJournalDateItemComponent} from "../components/journal/view/base-journal/base-journal-date-item/base-journal-date-item.component"
import {JournalTopBarComponent} from "../components/journal/view/journal-top-bar/journal-top-bar.component"
import {LessonInfoComponent} from "../components/standalones/popups/lesson-info/lesson-info.component"
import {TextDirective} from "../../../../../libs/auto-color/src/lib/text.directive"
import {JournalService} from "../services/shared/journal/journal.service"
import {JournalCollapseService} from "../services/shared/journal/journal-collapse.service"
import {JournalCellService} from "../services/shared/journal/journal.cell.service"
import {JournalDisplayModeService} from "../services/shared/journal/journal-display-mode.service"
import {JournalLessonService} from "../services/shared/journal/journal-lesson.service"
import {JournalMarksService} from "../services/shared/journal/journal-marks.service"
import {BaseJournalRowComponent} from "../components/journal/view/base-journal/base-journal-row/base-journal-row.component"
import {BaseJournalDateCollapseComponent} from "../components/journal/view/base-journal/base-journal-dates/base-journal-date/base-journal-date-collapse/base-journal-date-collapse.component"
import {BaseJournalDatesComponent} from "../components/journal/view/base-journal/base-journal-dates/base-journal-dates.component"
import {BaseJournalCollapserComponent} from "../components/journal/view/base-journal/base-journal-collapser/base-journal-collapser.component"

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
    GenerateMarksReportComponent,
    GenerateAbsencesReportComponent,
    AbsenceControlComponent,
    SelectMarkComponent,
    LessonAdditionDataComponent,
    JournalBottomBarComponent,
    BaseJournalDateItemComponent,
    JournalTopBarComponent,
    LessonInfoComponent,

    BaseJournalDatesComponent,
    BaseJournalRowComponent,

    BaseJournalDateCollapseComponent,
    BaseJournalDateComponent,
    BaseJournalColumnCellComponent,

    BaseJournalCollapserComponent,
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
