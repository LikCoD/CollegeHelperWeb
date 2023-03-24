import {NgModule} from "@angular/core"
import {CommonModule} from "@angular/common"
import {JournalRoutingModule} from "./journal-routing.module"
import {CellExpandComponent} from "../../shared/components/popups/cell-expand/cell-expand.component"
import {JournalViewComponent} from "./components/view/view.component"
import {JournalCellComponent} from "./components/view/base-journal/base-journal-cell/journal-cell.component"
import {JournalComponent} from "./components/journal.component"
import {BaseJournalComponent} from "./components/view/base-journal/base-journal.component"
import {GenerateMarksReportComponent} from "./components/generate/generate-marks-report/generate-marks-report.component"
import {GenerateAbsencesReportComponent} from "./components/generate/generate-absences-report/generate-absences-report.component"
import {AbsenceControlComponent} from "../../shared/components/popups/select-mark/enteries/absence-control.component"
import {SelectMarkComponent} from "../../shared/components/popups/select-mark/select-mark.component"
import {LessonAdditionDataComponent} from "../../shared/components/popups/lesson-addition-data/lesson-addition-data.component"
import {JournalBottomBarComponent} from "./components/view/journal-bottom-bar/journal-bottom-bar.component"
import {BaseJournalDateItemComponent} from "./components/view/base-journal/base-journal-date-item/base-journal-date-item.component"
import {JournalTopBarComponent} from "./components/view/journal-top-bar/journal-top-bar.component"
import {LessonInfoComponent} from "../../shared/components/popups/lesson-info/lesson-info.component"
import {BaseJournalDatesComponent} from "./components/view/base-journal/base-journal-dates/base-journal-dates.component"
import {BaseJournalRowComponent} from "./components/view/base-journal/base-journal-row/base-journal-row.component"
import {BaseJournalDateCollapseComponent} from "./components/view/base-journal/base-journal-dates/base-journal-date/base-journal-date-collapse/base-journal-date-collapse.component"
import {BaseJournalDateComponent} from "./components/view/base-journal/base-journal-dates/base-journal-date/base-journal-date.component"
import {BaseJournalColumnCellComponent} from "./components/view/base-journal/base-journal-row/base-journal-column-cell/base-journal-column-cell.component"
import {BaseJournalCollapserComponent} from "./components/view/base-journal/base-journal-collapser/base-journal-collapser.component"
import {TranslateModule} from "@ngx-translate/core"
import {FormsModule, ReactiveFormsModule} from "@angular/forms"
import {SharedModule} from "../../shared/shared.module"
import {ModalsModule} from "@common/modals"
import {NgxPopperjsModule} from "ngx-popperjs"
import {TextDirective} from "../../../../../../libs/common/auto-color/src/lib/text.directive"
import {ErrorInfoComponent} from "../../../../../../libs/common/ui-elements/src/lib/elements/error-info/error-info.component"
import {MatButtonModule} from "@angular/material/button"
import {MatButtonToggleModule} from "@angular/material/button-toggle"
import {JournalCardModule} from "journal/card"

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
    TranslateModule.forChild(),
    FormsModule,
    ReactiveFormsModule,
    SharedModule,
    ModalsModule,
    NgxPopperjsModule,
    TextDirective,
    ModalsModule,
    ErrorInfoComponent,
    JournalRoutingModule,
    MatButtonModule,
    MatButtonToggleModule,
    JournalCardModule,
  ],
})
export class JournalModule {}
